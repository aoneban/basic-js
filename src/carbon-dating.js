const { NotImplementedError } = require('../extensions/index.js');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 * 
 * @param {String} sampleActivity string representation of current activity 
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 * 
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(sampleActivity) {
  if (Number(sampleActivity) > 0 && Number(sampleActivity) < 15) {
    if (isNaN(Number(sampleActivity))) {
      return false;
    } else if (
      sampleActivity === '' ||
      sampleActivity === ' ' ||
      sampleActivity === ' \n\t\r'
    ) {
      return false;
    } else if (
      typeof sampleActivity === 'number' ||
      typeof sampleActivity === 'boolean' ||
      typeof sampleActivity === 'object' ||
      typeof sampleActivity === 'undefined' ||
      typeof sampleActivity === null
    ) {
      return false;
    } else {
      const constYears = 0.693 / 5730;
      const start = 15;
      const log = Math.log(start / sampleActivity);
      return Math.ceil(log / constYears);
    }
  } else {
    return false
  }
}

module.exports = {
  dateSample
};
