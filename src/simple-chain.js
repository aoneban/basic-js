const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  string: '',

  getLength() {
    return this.string.split('~~').filter(Boolean).length;
  },
  addLink(value) {
    if (value === undefined) value = '';
    this.string += `( ${value} )~~`;
    return this;
  },
  removeLink(position) {
    const result = this.string.split('~~').filter(Boolean);
    if (
      !Number.isInteger(position) ||
      position < 1 ||
      position > result.length
    ) {
      this.string = '';
      throw new Error("You can't remove incorrect link!");
    }
    result.splice(position - 1, 1);
    this.string = result.join('~~') + '~~';
    return this;
  },
  reverseChain() {
    this.string = this.string.split('~~').filter(Boolean).reverse().join('~~') + '~~';
    return this;
  },
  finishChain() {
    let result = this.string.slice(0, -2);
    this.string = '';
    return result;
  },
};

module.exports = {
  chainMaker,
};
