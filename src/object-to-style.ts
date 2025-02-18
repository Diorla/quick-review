export default function objectToStyle(
  style: Record<string, string | number>
): string {
  return Object.entries(style)
    .map(([key, value]) => {
      const cssKey = key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
      return `${cssKey}: ${typeof value === 'number' ? value + 'px' : value}`;
    })
    .join('; ');
}
