const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const result = {};
  const revertArray = domains.map((el) => '.' + el.split('.').reverse().join('.'));
  while (revertArray.length > 0) {
    revertArray.forEach((el, ind) => {
      result[el] = (result[el] || 0) + 1;
      const newElem = revertArray[ind].split('.').slice(0, -1).join('.');
      if (newElem) {
        revertArray[ind] = newElem;
      } else {
        revertArray.splice(ind, 1)
      }
    })
  }
  return result;
}

module.exports = {
  getDNSStats
};
