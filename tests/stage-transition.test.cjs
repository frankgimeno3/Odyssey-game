const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const React = require('react');
const { act, create } = require('react-test-renderer');
const ts = require('typescript');

function mount(t) {
  let now = 0;
  let id = 0;
  const timers = new Map();
  const window = {
    setTimeout(fn, delay) { timers.set(++id, { fn, at: now + delay }); return id; },
    clearTimeout(id) { timers.delete(id); },
  };
  const source = fs.readFileSync('src/app/landing/useStageTransition.ts', 'utf8');
  const exports = {};
  vm.runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, { require, exports, window });
  let current;
  function Harness() { current = exports.default('resultado'); return null; }
  let root;
  act(() => { root = create(React.createElement(Harness)); });
  t.after(() => act(() => root.unmount()));
  return {
    get current() { return current; },
    timers,
    unmount() { act(() => root.unmount()); },
    advance(ms) {
      const end = now + ms;
      while (true) {
        const next = [...timers].sort((a, b) => a[1].at - b[1].at)[0];
        if (!next || next[1].at > end) break;
        now = next[1].at;
        timers.delete(next[0]);
        act(() => next[1].fn());
      }
      now = end;
    },
  };
}

for (const saveDelay of [0, 2000]) {
  test(`confirmation advances when save takes ${saveDelay}ms after clicking during entry`, async (t) => {
    const app = mount(t);
    act(() => app.current.setStageWithTransition('enviar'));
    app.advance(1250);
    assert.equal(app.current.phase, 'in');
    const capturedTransition = app.current.setStageWithTransition;
    let resolveSave;
    const save = new Promise(resolve => { resolveSave = resolve; });
    const confirm = async () => { await save; capturedTransition('yapuedes'); };
    const pending = confirm();
    app.advance(saveDelay);
    await act(async () => { resolveSave(); await pending; });
    app.advance(1250);
    assert.equal(app.current.stage, 'yapuedes');
    assert.equal(app.current.phase, 'in');
    app.advance(1200);
    assert.equal(app.current.phase, 'idle');
  });
}

test('repeated clicks cannot replace an outgoing transition', (t) => {
  const app = mount(t);
  act(() => {
    app.current.setStageWithTransition('enviar');
    app.current.setStageWithTransition('yapuedes');
  });
  app.advance(450);
  act(() => app.current.setStageWithTransition('yapuedes'));
  app.advance(2000);
  assert.equal(app.current.stage, 'enviar');
  assert.equal(app.current.phase, 'idle');
});

test('unmount cancels pending transition timers', (t) => {
  const app = mount(t);
  act(() => app.current.setStageWithTransition('enviar'));
  app.unmount();
  assert.equal(app.timers.size, 0);
});
