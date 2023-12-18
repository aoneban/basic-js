const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 * 
 * @example
 * 
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
  calculateDepth(arr) {
    if (Array.isArray(arr)) {
      let depth = 1;
      for (let element of arr) {
        if (Array.isArray(element)) {
          depth = Math.max(depth, 1 + this.calculateDepth(element));
        }
      }
      return depth;
    } else {
      return 0;
    }
  }
}

module.exports = {
  DepthCalculator
};
