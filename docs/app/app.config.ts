export default defineAppConfig({
  toaster: {
    position: 'top-right' as const,
    duration: 5000,
    max: 5,
    expand: true
  },
  b24ui: {},
  colorMode: true,
  colorModeInitialValue: 'auto' as const, // системная тема; выбор хранится в localStorage
  colorModeTypeLight: 'edge-light' as const // светлая тема сайта: .edge-light с подложкой «Василька»
})
