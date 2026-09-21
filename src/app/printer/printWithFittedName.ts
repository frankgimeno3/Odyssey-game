/** Fit in the loaded print iframe: the source component is display:none. */
export async function printWithFittedName(iframe: HTMLIFrameElement): Promise<void> {
  const printWindow = iframe.contentWindow;
  const document = iframe.contentDocument;
  const sheet = document?.querySelector<HTMLElement>('.print-sheet');
  const name = document?.querySelector<HTMLElement>('.print-heading h1');
  if (!printWindow || !document || !sheet || !name) {
    throw new Error('The print document is not ready.');
  }

  name.style.removeProperty('font-size');
  const style = printWindow.getComputedStyle(name);
  await document.fonts.load(
    `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`,
    (name.textContent ?? '').toLocaleUpperCase(),
  );
  await document.fonts.ready;

  const sheetWidth = sheet.getBoundingClientRect().width;
  const nameBox = name.getBoundingClientRect();
  const availableWidth = nameBox.width * 0.98;
  const availableBottom = nameBox.top + nameBox.height * 0.98;
  if (sheetWidth <= 0 || availableWidth <= 0) {
    throw new Error('The print document has no measurable space for the name.');
  }

  // Keep container-relative units so the fit survives the switch to A4 print CSS.
  let upper = parseFloat(printWindow.getComputedStyle(name).fontSize) / sheetWidth * 100;
  let lower = 0;
  const range = document.createRange();
  range.selectNodeContents(name);
  const fits = () => {
    const textBox = range.getBoundingClientRect();
    return textBox.width <= availableWidth && textBox.bottom <= availableBottom;
  };
  if (!fits()) {
    // Measure actual rendered glyphs, including uppercase and font kerning.
    // Reserve 2% for glyph overhang and print layout rounding.
    for (let step = 0; step < 16; step++) {
      const candidate = (lower + upper) / 2;
      name.style.fontSize = `${candidate}cqw`;
      if (fits()) {
        lower = candidate;
      } else {
        upper = candidate;
      }
    }
    name.style.fontSize = `${lower}cqw`;
  }

  printWindow.focus();
  printWindow.print();
}
