const { NotImplementedError } = require('../extensions/index.js');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  const newArray = [...names];
  let count = 1;
  for(let i = 0; i < newArray.length; i += 1) {
    for(let j = 0; j < newArray.length; j += 1) {
      if (newArray[i] === newArray[i + j + 1]) {
        newArray[i + j + 1] = `${newArray[i + j + 1]}(${count})`;
        count += 1;
      }
    }
      count = 1;
  }
  return newArray;
}

module.exports = {
  renameFiles
};
