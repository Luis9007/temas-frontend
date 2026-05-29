/** Orden alfabético en español (insensible a mayúsculas y acentos). */
export function compareLocale(a: string, b: string): number {
  return a.localeCompare(b, 'es', { sensitivity: 'base' });
}

export function matchesQuery(value: string | undefined | null, query: string): boolean {
  return (value ?? '').toLowerCase().includes(query);
}
