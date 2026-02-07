export function capitalize(text: string): string {
  if (!text) return ""

  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function capitalizeEach(text: string): string {
  if (!text) return ""

  return text.toLowerCase().replace(/(^|\s|-)\S/g, (match) => match.toUpperCase());
}
