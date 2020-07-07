/*
** Возвращает рандомный элемент
*/

let getRandomItem = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export default getRandomItem;


/*
** Генерирует число от min до max. Можно передать только один аргумент,
** и будет сгенерировано число от нуля до этого аргумента
*/

export let getRandomInt = (min, max) => {
  if (!max) {
    max = min;
    min = 0;
  }
  min = Math.ceil(min);
  max = Math.floor(max + 1);
  return Math.floor(Math.random() * (max - min)) + min;
};
