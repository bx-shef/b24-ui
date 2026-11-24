# Port: feat(Switch): stretch thumb on press

**Upstream:** `37dde7b6cdddae1c32af2690dbd30f6682cc5ae8` (nuxt/ui, #7343)
**Decision:** port

## Перенос

`src/theme/switch.ts`: `base` получает `group/switch`, переход ползунка — `transition-[transform,translate,scale,rotate,width]`, в каждом размере добавлены `group-active/switch:w-*` и смещение для `checked` (и `rtl`). Размеры форка в пикселях и их четыре (xs/sm/md/lg), поэтому значения пересчитаны так же, как у апстрима: ширина растёт на 2 px (xs, sm) или на 4 px (md, lg), смещение в состоянии `checked` уменьшается на ту же величину, чтобы правый край не двигался. Снимки Switch обновлены (58 записей на два файла) — изменились только классы.
