/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {

    let newArr = [];

    for (let i = 0; i < array.length; i++) {
        newArr.push(fn(array[i], i, array));
    }

    return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
 function reduce(array, fn, initial) {
      let prevValue = 0,
        i = 0;
      if (!initial) {
        prevValue = array[0];
        i = 1;
      } else {
        prevValue = initial;
      }

      for (; i < array.length; i++) {
        prevValue = fn(prevValue, array[i], i, array);
      }

      return prevValue;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {

    let res = [];

    for (let name in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, name)) {
            res.push(name.toUpperCase());
        }
    }

    return res;

}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to = array.length) {
    let res = [];
  
    if (to < 0) {
        to = array.length + to;
    }
  
    if (from < 0) {
        from = array.length + from;
    } // переделываем индексы на нормальные, не как с конца
  
    for (; from < to; from++) {
        res.push(array[from]);
    }

    return res;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) { // чуть не йобнулась :))

    var handler = {
        get: function (item, propKey) {
            return item[propKey]*item[propKey];
        }
    }
  
    var arrProxy = new Proxy(obj, handler);
  
    return arrProxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};