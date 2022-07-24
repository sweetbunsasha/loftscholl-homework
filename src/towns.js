/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {

  return new Promise((resolve, reject) => {

    const towns = new XMLHttpRequest();

    towns.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
    towns.responseType = 'json'; // заранее указываем, что гет обращается к джисон, чтобы не парсить ответ 
    towns.send();
    towns.addEventListener('load', () => {
      const townsResp = towns.response;

      resolve(townsResp.sort((a, b) => a.name > b.name ? 1 : -1));
    })
    towns.addEventListener('error', () => {
      reject();
    })

  })
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'oscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false -1
 */
function isMatching(full, chunk) {

  return full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1;

  // -1 если chunk нет в фулл
  // если есть - номер. с которого начинается подстрока
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
const button = document.createElement('button');

filterBlock.appendChild(button);
button.innerText = 'Повторить';

button.addEventListener('click', loadTowns)

let list;

loadTowns()
  .then((listOfCities) => { // здесь то, что мы передали в резолв, то есть список городов
    console.log(listOfCities, 'listOfCities')

    list = listOfCities;
    loadingBlock.style.display = 'none';
    filterInput.style.display = 'inline-block';
    button.style.display = 'none'
  })
  .catch(() => {
    loadingBlock.style.display = 'none';
    filterInput.style.display = 'none';
    filterResult.innerText = 'не удалось загрузить';
    button.style.display = 'inline-block';
  })

filterInput.addEventListener('keyup', function (e) {

  filterResult.innerHTML = '';


  console.log(filterInput.value) // то, что вводим в инпут

  if (filterInput.value) {
    const newList = list.filter((item) => isMatching(item.name, filterInput.value));

    console.log(newList, 'newList');

    newList.forEach((item) => {

      const p = document.createElement('p');
      p.innerText = item.name;
      filterResult.appendChild(p);

    })


  }

});

export {
  loadTowns,
  isMatching
};
