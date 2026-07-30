const STORAGE_KEY = "chefedebar:favoritos";

export function getFavoriteIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isFavorite(id) {
  return getFavoriteIds().includes(id);
}

export function toggleFavorite(id) {
  const current = getFavoriteIds();
  const next = current.includes(id)
    ? current.filter((favId) => favId !== id)
    : [...current, id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}