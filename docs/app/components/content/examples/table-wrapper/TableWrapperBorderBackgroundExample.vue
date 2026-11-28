<template>
  <B24Card
    variant="outline-copilot"
    class="w-full"
    :b24ui="{ body: 'p-0 sm:px-0 sm:py-0' }"
  >
    <B24TableWrapper
      class="overflow-x-auto w-full"
      rounded
      :b24ui="{
        base: '[&>table>thead>tr]:border-(--ui-color-design-filled-copilot-stroke) [&>table>tbody>tr]:border-(--ui-color-design-tinted-a1-bg) [&>table>tfoot]:border-(--ui-color-design-filled-copilot-stroke)'
      }"
    >
      <table>
        <!-- шапка -->
        <thead>
          <tr>
            <th>#</th>
            <th>Компания</th>
            <th>Стадия сделки</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          <!-- строка 1 -->
          <tr>
            <th>1</th>
            <td>Tech Innovators Inc.</td>
            <td>Предложение отправлено</td>
            <td>50,000</td>
          </tr>
          <!-- строка 2 -->
          <tr>
            <th>2</th>
            <td>Global Solutions Ltd.</td>
            <td>Переговоры</td>
            <td>120,000</td>
          </tr>
          <!-- строка 3 -->
          <tr>
            <th>3</th>
            <td>Future Enterprises</td>
            <td>Договор подписан</td>
            <td>200,000</td>
          </tr>
          <!-- строка 4 -->
          <tr>
            <th>4</th>
            <td>Bright Ideas Co.</td>
            <td>Первичный контакт</td>
            <td>15,000</td>
          </tr>
          <!-- строка 5 -->
          <tr>
            <th>5</th>
            <td>NextGen Technologies</td>
            <td>Закрытие</td>
            <td>300,000</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="3" class="text-end">
              Total:
            </th>
            <td>
              685,00
            </td>
          </tr>
        </tfoot>
      </table>
    </B24TableWrapper>
  </B24Card>
</template>
