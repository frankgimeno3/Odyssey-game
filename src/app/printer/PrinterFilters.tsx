import { useState } from 'react';
import { getGodContent, GOD_IDS } from '../contenido/godContent';
import type { Language } from '../contenido/interfaces';
import { emptyFilters, Filters, TimeFilter, timeError } from './filters';

const inputClass = 'rounded border border-gray-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500';

function TimeFields({ label, value, onChange }: { label: 'Date' | 'Hour'; value: TimeFilter; onChange: (value: TimeFilter) => void }) {
  const date = label === 'Date';
  const parts = date ? ['dd', 'mm', 'yyyy'] : ['HH', 'MM'];
  const error = timeError(value, date);
  const fields = (side: 'from' | 'to') => (
    <div className="flex items-center gap-2">
      {parts.map((part, index) => <span key={part} className="flex items-center gap-2">
        {!date && index === 1 && <span>:</span>}
        <input aria-label={`${label} ${side} ${part}`} placeholder={part} inputMode="numeric" maxLength={part === 'yyyy' ? 4 : 2}
          className={`${inputClass} ${part === 'yyyy' ? 'w-20' : 'w-14'} text-center`} value={value[side][index]}
          onChange={event => onChange({ ...value, [side]: value[side].map((old, i) => i === index ? event.target.value.replace(/\D/g, '') : old) })} />
      </span>)}
    </div>
  );
  return <fieldset className="min-w-0">
    <legend className="mb-3 font-semibold">{label}</legend>
    <div className="mb-4 flex items-center gap-2 whitespace-nowrap">
      <span className={value.mode === 'exact' ? 'font-semibold' : 'text-gray-500'}>Exact {label.toLowerCase()}</span>
      <button type="button" role="switch" aria-label={`${label} range`} aria-checked={value.mode === 'range'}
        onClick={() => onChange({ ...value, mode: value.mode === 'exact' ? 'range' : 'exact' })}
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${value.mode === 'range' ? 'bg-slate-700' : 'bg-gray-300'}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${value.mode === 'range' ? 'left-0.5 translate-x-4' : 'left-0.5'}`} />
      </button>
      <span className={value.mode === 'range' ? 'font-semibold' : 'text-gray-500'}>{label} range</span>
    </div>
    <div className="flex flex-wrap items-center gap-3">
      {value.mode === 'range' && <span>From</span>}{fields('from')}
      {value.mode === 'range' && <><span>– To</span>{fields('to')}</>}
    </div>
    {error && <p role="alert" className="mt-2 text-red-600">{error}</p>}
  </fieldset>;
}

export default function PrinterFilters({ value, onChange, language }: { value: Filters; onChange: (filters: Filters) => void; language: Language }) {
  const [query, setQuery] = useState('');
  const [godOpen, setGodOpen] = useState(false);
  const godLanguage = value.language || language;
  const gods = GOD_IDS.map(id => ({ id, name: getGodContent(id, godLanguage)!.name })).sort((a, b) => a.name.localeCompare(b.name));
  const options = gods.filter(god => god.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  return <details className="mb-4 bg-white p-5 text-xs text-slate-800">
    <summary className="cursor-pointer font-semibold">filter</summary>
    <div className="mt-5 overflow-x-auto border-t border-gray-200 pt-5">
      <div className="grid min-w-[1060px] grid-cols-[1.3fr_1.3fr_1fr_1fr_1fr] items-start gap-6">
          <TimeFields label="Date" value={value.date} onChange={date => onChange({ ...value, date })} />
          <TimeFields label="Hour" value={value.hour} onChange={hour => onChange({ ...value, hour })} />
        <label className="flex min-w-0 flex-col gap-3 font-semibold">Name
          <input className={`${inputClass} w-full font-normal`} value={value.name} onChange={event => onChange({ ...value, name: event.target.value })} placeholder="Name" />
        </label>
        <div className="relative" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) { setGodOpen(false); setQuery(''); } }}>
          <label htmlFor="god-filter" className="mb-3 block font-semibold">God</label>
          <input id="god-filter" role="combobox" aria-expanded={godOpen} aria-controls="god-options" aria-autocomplete="list"
            className={`${inputClass} w-full`} placeholder="All gods"
            value={godOpen ? query : gods.find(god => god.id === value.god)?.name || ''}
            onFocus={() => { setQuery(''); setGodOpen(true); }}
            onChange={event => { setQuery(event.target.value); setGodOpen(true); }}
            onKeyDown={event => {
              if (event.key === 'Escape') { setGodOpen(false); setQuery(''); }
              if (event.key === 'ArrowDown') { event.preventDefault(); setGodOpen(true); requestAnimationFrame(() => document.querySelector<HTMLButtonElement>('#god-options button')?.focus()); }
              if (event.key === 'Enter' && options.length === 1) { onChange({ ...value, god: options[0].id }); setGodOpen(false); }
            }} />
          {godOpen && <div id="god-options" role="listbox" aria-label="God" className="relative z-50 mt-1 max-h-48 w-full overflow-y-auto rounded border border-gray-300 bg-white shadow-lg">
            {[{ id: '', name: 'All gods' }, ...options].map(god => <button type="button" role="option" aria-selected={value.god === god.id} key={god.id}
              className="block w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100"
              onClick={() => { onChange({ ...value, god: god.id }); setGodOpen(false); setQuery(''); }}>{god.name}</button>)}
            {!options.length && <p className="px-3 py-2 text-gray-500">No gods found</p>}
          </div>}
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="language-filter" className="font-semibold">Language</label>
          <select id="language-filter" className={inputClass} value={value.language} onChange={event => { onChange({ ...value, language: event.target.value as Language | '' }); setQuery(''); }}>
            <option value="">All languages</option><option value="en">English</option><option value="es">Español</option><option value="de">Deutsch</option>
          </select>
        </div>
      </div>
      <button type="button" className="mt-5 rounded bg-gray-100 px-4 py-2 shadow hover:bg-gray-200" onClick={() => { onChange(emptyFilters()); setQuery(''); setGodOpen(false); }}>Clear filters</button>
    </div>
  </details>;
}
