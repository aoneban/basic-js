const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  const result = [];
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
  if (!arr.includes('--double-prev') &&
      !arr.includes('--discard-prev') &&
      !arr.includes('--double-next') &&
      !arr.includes('--discard-next')) {
      return arr
  } else if (Array.isArray(arr)) {
    const newArr = [...arr];
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i] === '--double-next') {
        newArr[i] = newArr[i + 1];
      } else if (newArr[i] === '--double-prev') {
        newArr[i] = newArr[i - 1];
      } else if (newArr[i] === '--discard-prev') {
        result.pop();
        continue;
      } else if (newArr[i] === '--discard-next') {
        i += 2;
      }
      result.push(newArr[i]);
    }
    return result.filter(el => typeof el === "number")
  } 
}

module.exports = {
  transform
};
