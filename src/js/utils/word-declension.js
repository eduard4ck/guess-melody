/*
* Склонение слов в правильную форму, например 1 минута, 2 минуты, 5 минут
* Принимает число, и массив из трех форм ['минута', 'минуты', 'минут']
*/

export default function declension(n, textForms) {
  n = Math.abs(n) % 100; let n1 = n % 10;
  if (n > 10 && n < 20) return textForms[2];
  if (n1 > 1 && n1 < 5) return textForms[1];
  if (n1 === 1) return textForms[0];
  return textForms[2];
}
