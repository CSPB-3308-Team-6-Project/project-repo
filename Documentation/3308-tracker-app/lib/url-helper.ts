const BASE = process.env.NODE_ENV === 'production' ? (process.env.NEXT_BASE_PATH ?? '') : '';
export const href = (path: string) => `${BASE}${path}`;