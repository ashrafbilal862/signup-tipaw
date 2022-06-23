export const classNames = (...classList: string[]) => {
  return classList.filter(Boolean).join(' ')
}
