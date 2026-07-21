export async function fileToDataUrl(file: File) {
  if (!file.type.startsWith('image/')) throw new Error('Only image files are supported.');
  if (file.size > 2_000_000) throw new Error('Image must be smaller than 2 MB.');
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Unable to read file.'));
    reader.readAsDataURL(file);
  });
}
