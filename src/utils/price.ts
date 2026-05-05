export function parsePrice(priceText: string): number {
  const numericText = priceText.replace(/[^\d.]/g, '');

  return parseFloat(numericText);
}
