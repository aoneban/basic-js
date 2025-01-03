const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {

  constructor(reverse) {
    this.reverse = reverse; 
  }

  encrypt(one, two) {
    if (arguments.length !== 2 || typeof arguments[0] !== 'string' || typeof arguments[1] !== 'string') {
      throw new Error('Incorrect arguments!');
    }
    
    let secondString = '';

    if (/[^\w\s]/.test(one) === true) {
      let endOfLettersIndex = -1;
      for (let i = 0; i < one.length; i++) {
        if (!/[a-zA-Z]/.test(one[i]) && one[i] !== ' ') {
          endOfLettersIndex = i;
          break;
        }
      }
      if (this.reverse === false) {
        secondString = one.slice(endOfLettersIndex).split('').reverse().join('');
      } else {
        secondString = one.slice(endOfLettersIndex)
      } 
    }
    
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$(),./|*-&^%';
    let oneValue = one.toUpperCase().replace(/[:;,.]\s*\d.*$/, '');
    let twoValue = two.toUpperCase();

    const totResult = [];
    const final = [];

    const resultSpaces = function () {
      const arrForSpaces = [];
      const space = ' ';
      let item = -1;
      while ((item = oneValue.indexOf(space, item + 1)) != -1) {
        arrForSpaces.push(item);
      }
      return arrForSpaces;
    };

    const lengthString = function () {
      return oneValue.length;
    };

    const lengthKey = function () {
      return twoValue.length;
    };

    const totalRepeatKey = Math.round(lengthString() / lengthKey());
    const replicaTwoValue = twoValue
      .repeat(totalRepeatKey)
      .slice(0, lengthString() - resultSpaces().length)
      .split('');

    let spaceIndex = 0;

    for (let i = 0; i < oneValue.length; i++) {
      if (resultSpaces().includes(i)) {
        totResult.push(' ');
      } else {
        totResult.push(replicaTwoValue[spaceIndex]);
        spaceIndex++;
      }
    }

    let finishResult = totResult.join('');

    const str2 = str.split('');
    for (let i = 0; i < oneValue.length; i++) {
      let x =
        oneValue.charCodeAt(i) - 65 + ((finishResult.charCodeAt(i) - 65) % 26);
      if (x > 25) {
        x = x - 26;
      }
      final.push(str2[x]);
    }

    let finishItem = [];
    for (let item of final) {
      if (item === undefined) {
        finishItem.push(' ');
      } else {
        finishItem.push(item);
      }
    }

    if (this.reverse === false) {
      return `${secondString}${finishItem.reverse().join('').trim()}`
    } else {
      return `${finishItem.join('').trim()}${secondString}`;
    }
  }

  decrypt(one, two) {

    if (arguments.length !== 2 || typeof arguments[0] !== 'string' || typeof arguments[1] !== 'string') {
      throw new Error('Incorrect arguments!');
    }

    let secondString = '';

    if (/[^\w\s]/.test(one) === true) {
      let endOfLettersIndex = -1;
      for (let i = 0; i < one.length; i++) {
        if (!/[a-zA-Z]/.test(one[i]) && one[i] !== ' ') {
          endOfLettersIndex = i;
          break;
        }
      }
      if (this.reverse === false) {
        secondString = one.slice(endOfLettersIndex).split('').reverse().join('');
      } else {
        secondString = one.slice(endOfLettersIndex)
      } 
    }
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$(),./|*-&^%';
    let oneValue = one.toUpperCase().replace(/[^A-Za-z\s]*$/, '');
    let twoValue = two.toUpperCase();

    const totResult = [];
    const final = [];

    const resultSpaces = function () {
      const arrForSpaces = [];
      const space = ' ';
      let item = -1;
      while ((item = oneValue.indexOf(space, item + 1)) != -1) {
        arrForSpaces.push(item);
      }
      return arrForSpaces;
    };

    const lengthString = function () {
      return oneValue.length;
    };

    const lengthKey = function () {
      return twoValue.length;
    };

    const totalRepeatKey = Math.ceil(lengthString() / lengthKey());
    const replicaTwoValue = twoValue
      .repeat(totalRepeatKey)
      .slice(0, lengthString() - resultSpaces().length)
      .split('');

    let spaceIndex = 0;

    for (let i = 0; i < oneValue.length; i++) {
      if (resultSpaces().includes(i)) {
        totResult.push(' ');
      } else {
        totResult.push(replicaTwoValue[spaceIndex]);
        spaceIndex++;
      }
    }

    let finishResult = totResult.join('');

    const str2 = str.split('');
    for (let i = 0; i < oneValue.length; i++) {
      let y =
        oneValue.charCodeAt(i) - 65 - ((finishResult.charCodeAt(i) - 65) % 26);
      if (y < 0) {
        y = y + 26;
      }
      final.push(str2[y]);
    }

    const arrayResult = [];

    final.map((el, ind) => {
      if (resultSpaces().includes(ind)) {
        arrayResult.push(' ');
      } else {
        arrayResult.push(el);
      }
    });
    if(this.reverse === false){
      return `${secondString}${arrayResult.reverse().join('')}`;
    } else {
      return `${arrayResult.join('')}${secondString}`;
    }
  }
}

module.exports = {
  VigenereCipheringMachine
};
