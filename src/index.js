/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), seconds * 1000); // значение времени в сетТаймаут должно быть в милсекундах, поэтому умножаем на тыщу
    })
}
  
  /*
   Задание 2:
  
   2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения
  
   Массив городов можно получить отправив асинхронный запрос по адресу
   https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
  
   2.2: Элементы полученного массива должны быть отсортированы по имени города
  
   Пример:
     loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
   */
function loadAndSortTowns() {

    return new Promise((resolve, reject) => {

        const towns = new XMLHttpRequest(); // 
        
        towns.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        towns.responseType = 'json'; // заранее указываем, что гет обращается к джисон, чтобы не парсить ответ 
        towns.send();
        towns.addEventListener('load', () => { // когда ответ загузился

            const resp = towns.response; // получаем данные

            resolve(resp.sort((a, b) => a.name > b.name ? 1 : -1)) // разрешаем отсортированным массивом
        })
    })
}
  
export {
    delayPromise,
    loadAndSortTowns
};