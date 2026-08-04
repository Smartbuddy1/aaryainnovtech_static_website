export function deduplicateImages(images) {
  if (!Array.isArray(images)) return [];
  const seen = new Set();
  return images.filter(image => {
    if (!image) return false;
    const src = typeof image === 'string' ? image : (image.src || image.image);
    if (!src) return true; // keep it if it has no src/image (unlikely)
    if (seen.has(src)) {
      return false;
    }
    seen.add(src);
    return true;
  });
}
