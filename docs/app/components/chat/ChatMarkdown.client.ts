import { defineMarkdownComponent } from '@comark/vue'
import { defineComarkPlugin } from '@comark/vue/parse'
import shiki from '@comark/vue/plugins/shiki'
import security from '@comark/vue/plugins/security'

// Ответ модели — недоверенный текст. Атрибут `style` убираем целиком: через него можно наложить на страницу
// произвольное оформление (перекрыть интерфейс, подгрузить внешний ресурс через `url()`).
const stripStyle = defineComarkPlugin(() => ({
  name: 'strip-style',
  post(state) {
    const visit = (node: unknown) => {
      if (!Array.isArray(node)) return
      if (typeof node[0] === 'string' && node[1] && typeof node[1] === 'object') {
        delete (node[1] as Record<string, unknown>).style
      }
      for (const child of node.slice(2)) visit(child)
    }
    for (const node of state.tree.nodes ?? []) visit(node)
  }
}))

export default defineMarkdownComponent({
  name: 'ChatMarkdown',
  plugins: [
    shiki(),
    stripStyle(),
    security({
      blockedTags: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'link', 'meta', 'base'],
      allowedProtocols: ['http', 'https', 'mailto'],
      // Картинки — только со своего сайта (и относительные): внешняя картинка в ответе — канал утечки
      // (адрес с данными беседы в параметрах) и трекинг посетителя.
      allowedImagePrefixes: [typeof location === 'undefined' ? '/' : `${location.origin}/`],
      allowDataImages: false
    })
  ],
  class: '*:first:mt-0 *:last:mb-0'
})
