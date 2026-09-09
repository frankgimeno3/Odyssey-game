import { getGodContent } from '../contenido/godContent';
import type { Language } from '../contenido/interfaces';
import type { File } from './page';

export type TimeFilter = { mode: 'exact' | 'range'; from: string[]; to: string[] };
export type Filters = { name: string; god: string; language: Language | ''; date: TimeFilter; hour: TimeFilter };
export const emptyFilters = (): Filters => ({ name: '', god: '', language: '', date: { mode: 'exact', from: ['', '', ''], to: ['', '', ''] }, hour: { mode: 'exact', from: ['', ''], to: ['', ''] } });

function parseParts(parts: string[], date: boolean): number | null {
  if (parts.some(part => part === '')) return null;
  const [a, b, c] = parts.map(Number);
  if (date) {
    const value = new Date(c, b - 1, a);
    return c >= 1000 && value.getFullYear() === c && value.getMonth() === b - 1 && value.getDate() === a ? c * 10000 + b * 100 + a : NaN;
  }
  return a <= 23 && b <= 59 ? a * 60 + b : NaN;
}

export function timeError(filter: TimeFilter, date: boolean) {
  const from = parseParts(filter.from, date);
  const to = filter.mode === 'range' ? parseParts(filter.to, date) : null;
  if (Number.isNaN(from) || Number.isNaN(to)) return `Invalid ${date ? 'date' : 'hour'}`;
  if (from !== null && to !== null && from > to) return 'From must be before To';
  return '';
}

function matchesTime(value: number, filter: TimeFilter, date: boolean) {
  if (timeError(filter, date)) return false;
  const from = parseParts(filter.from, date);
  const to = parseParts(filter.to, date);
  return filter.mode === 'exact' ? from === null || value === from :
    (from === null || value >= from) && (to === null || value <= to);
}

export function matchesFilters(file: File, filters: Filters) {
  const date = new Date(file.updatedAt);
  return file.nombre.toLocaleLowerCase().includes(filters.name.trim().toLocaleLowerCase()) &&
    (!filters.language || file.lang === filters.language) &&
    (!filters.god || getGodContent(file.midios, file.lang)?.id === filters.god) &&
    matchesTime(date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate(), filters.date, true) &&
    matchesTime(date.getHours() * 60 + date.getMinutes(), filters.hour, false);
}
