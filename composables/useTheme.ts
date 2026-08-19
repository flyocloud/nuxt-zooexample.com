type Theme = 'dark' | 'light'

// Cookie-backed so the server already renders `<html class="dark">` — no
// theme flash on load. Dark is the house default.
export const useTheme = () => {
  const theme = useCookie<Theme>('theme', {
    default: () => 'dark',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  useHead({
    htmlAttrs: {
      class: computed(() => (theme.value === 'light' ? '' : 'dark')),
    },
  })

  const setTheme = (value: Theme) => {
    theme.value = value
  }

  return { theme, setTheme }
}
