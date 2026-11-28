<template>
  <B24TableWrapper
    class="overflow-x-auto w-full h-[400px]"
    size="xs"
    pin-cols
    pin-rows
    row-hover
  >
    <table>
      <colgroup>
        <col>
        <col style="min-width: 200px">
        <col>
        <col>
        <col>
        <col>
        <col>
        <col>
        <col>
      </colgroup>
      <thead>
        <tr>
          <th />
          <td>Название сделки</td>
          <td>Компания</td>
          <td>Стадия сделки</td>
          <td>Сумма</td>
          <td>Ответственный</td>
          <td>Дата начала</td>
          <td>Заметки</td>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>
          <td>Обновление технологий</td>
          <td>Tech Innovators Inc.</td>
          <td>Предложение отправлено</td>
          <td>150,000</td>
          <td>John Doe</td>
          <td>15.01.2023</td>
          <td>Ожидаем обратную связь</td>
          <th>1</th>
        </tr>
        <tr>
          <th>2</th>
          <td>План глобального расширения</td>
          <td>Global Solutions Ltd.</td>
          <td>Переговоры</td>
          <td>500,000</td>
          <td>Jane Smith</td>
          <td>10.02.2023</td>
          <td>Ключевое лицо, принимающее решение</td>
          <th>2</th>
        </tr>
        <tr>
          <th>3</th>
          <td>Запуск нового продукта</td>
          <td>Future Enterprises</td>
          <td>Договор подписан</td>
          <td>300,000</td>
          <td>Michael Brown</td>
          <td>05.03.2023</td>
          <td>Идёт поставка</td>
          <th>3</th>
        </tr>
        <tr>
          <th>4</th>
          <td>Маркетинговая кампания</td>
          <td>Bright Ideas Co.</td>
          <td>Первичный контакт</td>
          <td>75,000</td>
          <td>Emily Davis</td>
          <td>20.04.2023</td>
          <td>Бюджет утверждён</td>
          <th>4</th>
        </tr>
        <tr>
          <th>5</th>
          <td>Сделка по IT-инфраструктуре</td>
          <td>NextGen Technologies</td>
          <td>Закрытие</td>
          <td>1,000,000</td>
          <td>David Wilson</td>
          <td>12.05.2023</td>
          <td>Уточняем детали</td>
          <th>5</th>
        </tr>
        <tr>
          <th>6</th>
          <td>Внедрение HR-системы</td>
          <td>People First Inc.</td>
          <td>Предложение отправлено</td>
          <td>200,000</td>
          <td>Sophi Biles</td>
          <td>01.06.2023</td>
          <td>Ожидает согласования</td>
          <th>6</th>
        </tr>
        <tr>
          <th>7</th>
          <td>Оптимизация логистики</td>
          <td>Logistics Pro</td>
          <td>Переговоры</td>
          <td>450,000</td>
          <td>Reid Semiras</td>
          <td>18.07.2023</td>
          <td>Обсуждаем условия</td>
          <th>7</th>
        </tr>
        <tr>
          <th>8</th>
          <td>Программа обучения продажам</td>
          <td>Global Sales Ltd.</td>
          <td>Договор подписан</td>
          <td>120,000</td>
          <td>Alec Lethby</td>
          <td>22.08.2023</td>
          <td>Обучение назначено</td>
          <th>8</th>
        </tr>
        <tr>
          <th>9</th>
          <td>Редизайн продукта</td>
          <td>Innovate Corp.</td>
          <td>Первичный контакт</td>
          <td>90,000</td>
          <td>Florida Garces</td>
          <td>05.09.2023</td>
          <td>Первые переговоры</td>
          <th>9</th>
        </tr>
        <tr>
          <th>10</th>
          <td>Миграция в облако</td>
          <td>Tech Solutions Inc.</td>
          <td>Закрытие</td>
          <td>600,000</td>
          <td>Maribeth Popping</td>
          <td>10.10.2023</td>
          <td>Финальная проверка</td>
          <th>10</th>
        </tr>
        <tr>
          <th>11</th>
          <td>Улучшение клиентской поддержки</td>
          <td>Zemlak, Daniel and Leannon</td>
          <td>Предложение отправлено</td>
          <td>85,000</td>
          <td>Hart Hagerty</td>
          <td>15.11.2023</td>
          <td>Ожидает утверждения</td>
          <th>11</th>
        </tr>
        <tr>
          <th>12</th>
          <td>Финансовый аудит</td>
          <td>Carroll Group</td>
          <td>Переговоры</td>
          <td>250,000</td>
          <td>Brice Swyre</td>
          <td>01.12.2023</td>
          <td>Объём работ согласован</td>
          <th>12</th>
        </tr>
        <tr>
          <th>13</th>
          <td>Ремонт офиса</td>
          <td>Rowe-Schoen</td>
          <td>Договор подписан</td>
          <td>180,000</td>
          <td>Marjy Ferencz</td>
          <td>10.01.2024</td>
          <td>Работа идёт</td>
          <th>13</th>
        </tr>
        <tr>
          <th>14</th>
          <td>Усиление кибербезопасности</td>
          <td>Wyman-Ledner</td>
          <td>Первичный контакт</td>
          <td>300,000</td>
          <td>Yancy Tear</td>
          <td>05.02.2024</td>
          <td>Первичная оценка</td>
          <th>14</th>
        </tr>
        <tr>
          <th>15</th>
          <td>Программа заботы о сотрудниках</td>
          <td>Schuster-Schimmel</td>
          <td>Закрытие</td>
          <td>95,000</td>
          <td>Meghann Durtnal</td>
          <td>12.03.2024</td>
          <td>Уточняем детали</td>
          <th>15</th>
        </tr>
        <tr>
          <th>16</th>
          <td>Проект по аналитике данных</td>
          <td>Wiza, Bins and Emard</td>
          <td>Предложение отправлено</td>
          <td>220,000</td>
          <td>Irma Vasilik</td>
          <td>18.04.2024</td>
          <td>Ожидаем отзыв</td>
          <th>16</th>
        </tr>
        <tr>
          <th>17</th>
          <td>Платформа электронной коммерции</td>
          <td>O'Hara, Welch and Keebler</td>
          <td>Переговоры</td>
          <td>700,000</td>
          <td>Sammy Seston</td>
          <td>22.05.2024</td>
          <td>Обсуждены ключевые условия</td>
          <th>17</th>
        </tr>
        <tr>
          <th>18</th>
          <td>Интеграция AI</td>
          <td>Turner-Kuhlman</td>
          <td>Договор подписан</td>
          <td>1,200,000</td>
          <td>Lesya Tinham</td>
          <td>30.06.2024</td>
          <td>Внедрение началось</td>
          <th>18</th>
        </tr>
        <tr>
          <th>19</th>
          <td>Оптимизация цепочки поставок</td>
          <td>Kshlerin, Rogahn and Swaniawski</td>
          <td>Первичный контакт</td>
          <td>400,000</td>
          <td>Aland Wilber</td>
          <td>15.07.2024</td>
          <td>Первые переговоры</td>
          <th>19</th>
        </tr>
        <tr>
          <th>20</th>
          <td>Мероприятие по запуску продукта</td>
          <td>Sauer LLC</td>
          <td>Закрытие</td>
          <td>150,000</td>
          <td>Zaneta Tewkesbury</td>
          <td>20.08.2024</td>
          <td>Финальная подготовка</td>
          <th>20</th>
        </tr>
        <tr>
          <th>21</th>
          <td>Разработка мобильного приложения</td>
          <td>Hilpert Group</td>
          <td>Предложение отправлено</td>
          <td>350,000</td>
          <td>Andy Tipple</td>
          <td>25.09.2024</td>
          <td>Ожидает согласования</td>
          <th>21</th>
        </tr>
        <tr>
          <th>22</th>
          <td>Программа лояльности клиентов</td>
          <td>Gutmann Inc</td>
          <td>Переговоры</td>
          <td>120,000</td>
          <td>Sophi Biles</td>
          <td>10.10.2024</td>
          <td>Условия на рассмотрении</td>
          <th>22</th>
        </tr>
        <tr>
          <th>23</th>
          <td>Внедрение ERP-системы</td>
          <td>Gaylord, Pacocha and Baumbach</td>
          <td>Договор подписан</td>
          <td>900,000</td>
          <td>Florida Garces</td>
          <td>15.11.2024</td>
          <td>Старт проекта</td>
          <th>23</th>
        </tr>
        <tr>
          <th>24</th>
          <td>Кампания цифрового маркетинга</td>
          <td>Deckow-Pouros</td>
          <td>Первичный контакт</td>
          <td>200,000</td>
          <td>Maribeth Popping</td>
          <td>20.12.2024</td>
          <td>Первые переговоры</td>
          <th>24</th>
        </tr>
        <tr>
          <th>25</th>
          <td>Автоматизация склада</td>
          <td>Schiller, Cole and Hackett</td>
          <td>Закрытие</td>
          <td>1,500,000</td>
          <td>Moritz Dryburgh</td>
          <td>05.01.2025</td>
          <td>Уточняем детали</td>
          <th>25</th>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th />
          <td>Название сделки</td>
          <td>Компания</td>
          <td>Стадия сделки</td>
          <td>Сумма</td>
          <td>Ответственный</td>
          <td>Дата начала</td>
          <td>Заметки</td>
          <th />
        </tr>
      </tfoot>
    </table>
  </B24TableWrapper>
</template>
