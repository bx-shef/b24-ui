---
title: SidebarLayout
description: 'Боковое меню для слайдера и вкладки сущности CRM. Выглядит стильно, современно и молодо.'
category: deprecated
keywords:
  - боковое меню слайдера
  - вкладка сущности CRM
  - раскладка с боковым меню
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/SidebarLayout.vue
---

::warning
Компонент устарел (`deprecated`) и будет удалён в версии `3.0.0`.
::

Вместо него собирайте раскладки из компонентов [DashboardSidebar](/docs/components/dashboard-sidebar/), [DashboardPanel](/docs/components/dashboard-panel/) и [DashboardGroup](/docs/components/dashboard-group/). Для отдельного сворачиваемого бокового меню без оболочки дашборда используйте [Sidebar](/docs/components/sidebar/).

## Устаревшие подкомпоненты {#deprecated-sub-components}

У `SidebarLayout` есть набор строительных блоков. Все они по-прежнему экспортируются и работают, и все будут удалены в `3.0.0` вместе с ним. Отдельных страниц документации у них нет, поэтому раздел нужен, чтобы код с ними вёл к замене.

| Устарело | Замена |
| ---------- | ----------- |
| `B24Navbar` | [DashboardNavbar](/docs/components/dashboard-navbar/) |
| `B24NavbarSection` | слоты [DashboardNavbar](/docs/components/dashboard-navbar/) (`#left`, `#right`, `#trailing`) |
| `B24NavbarDivider` | [Separator](/docs/components/separator/) |
| `B24NavbarSpacer` | собственная flex-распорка или слоты DashboardNavbar |
| `B24SidebarHeader` | слот `#header` у [DashboardSidebar](/docs/components/dashboard-sidebar/) |
| `B24SidebarBody` | слот `#default` у [DashboardSidebar](/docs/components/dashboard-sidebar/) |
| `B24SidebarFooter` | слот `#footer` у [DashboardSidebar](/docs/components/dashboard-sidebar/) |
| `B24SidebarSection` | [NavigationMenu](/docs/components/navigation-menu/) с `orientation="vertical"` |
| `B24SidebarHeading` | подписи элементов [NavigationMenu](/docs/components/navigation-menu/) |
| `B24SidebarSpacer` | собственная flex-распорка |

::note
До `3.0.0` ничего не меняется: это предупреждение, а не поломка. Если вы начинаете что-то новое, берите компоненты Dashboard.
::
