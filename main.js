// Объект с курсами 3-х валют
let rates = {};

// Элементы для отображения курса валют на странице
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

// Элементы формы: ввод суммы, выбор валюты, поле с результатом
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');


// Функция получения курса валют и отображения их на странице
async function getCurrencies () {
    // await - ждёт пока выполнится текущая или предыдущая часть кода
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    // Заполняем пустой объект валютными данными
    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;

    // Наполняем значениями HTML-контейнеры
    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);

    // Проверка на рост/падение текущего значения валюты (меняется цвет)
    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('bottom');
    } else {
        elementUSD.classList.add('top');
    }

    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('bottom');
    } else {
        elementEUR.classList.add('top');
    }

    if (rates.GBP.Value > rates.GBP.Previous) {
        elementGBP.classList.add('bottom');
    } else {
        elementGBP.classList.add('top');
    }
}

getCurrencies();
setInterval(getCurrencies, 3600000);    // обновление каждый час


// Когда будет вводиться значение в рублях
input.oninput = convertValue;
// Когда будет изменяться значение в рублях
select.oninput = convertValue;
// Функция конвертации
function convertValue() {
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}