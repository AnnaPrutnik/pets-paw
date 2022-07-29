export function srcset(image: string, size: number, index: number) {
  const rows = index === 0 || index === 3 ? 2 : 1;
  const cols = index === 3 ? 2 : 1;
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
