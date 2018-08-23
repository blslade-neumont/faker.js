import mersenne = require('../vendor/mersenne');

/**
 *
 * @namespace faker.random
 */
class Random {
  constructor(private faker: any, seed?: any) {
    // Use a user provided seed if it exists
    if (seed) {
      if (Array.isArray(seed) && seed.length) {
        mersenne.seed_array(seed);
      }
      else {
        mersenne.seed(seed);
      }
    }
  }
  /**
   * returns a single random number based on a max number or range
   *
   * @method faker.random.number
   * @param {mixed} options
   */
  number(options?: number | { min?: number, max?: number, precision?: number }) {

    if (typeof options === "number") {
      options = {
        max: options
      };
    }

    options = options || {};

    if (typeof options.min === "undefined") {
      options.min = 0;
    }

    if (typeof options.max === "undefined") {
      options.max = 99999;
    }
    if (typeof options.precision === "undefined") {
      options.precision = 1;
    }

    // Make the range inclusive of the max value
    var max = options.max;
    if (max >= 0) {
      max += options.precision;
    }

    var randomNumber = Math.floor(
      mersenne.rand(max / options.precision, options.min / options.precision));
    // Workaround problem in Float point arithmetics for e.g. 6681493 / 0.01
    randomNumber = randomNumber / (1 / options.precision);

    return randomNumber;

  }

  /**
   * takes an array and returns a random element of the array
   *
   * @method faker.random.arrayElement
   * @param {array} array
   */
  arrayElement<T>(array: T[]): T {
      array = array || ["a", "b", "c"];
      var r = this.faker.random.number({ max: array.length - 1 });
      return array[r];
  }

  /**
   * takes an array and returns a subset with random elements of the array
   *
   * @method faker.random.arrayElements
   * @param {array} array
   * @param {number} count number of elements to pick
   */
  arrayElements<T>(array: T[], count?: number): T[] {
      array = array || ["a", "b", "c"];

      if (typeof count !== 'number') {
        count = this.faker.random.number({ min: 1, max: array.length });
      } else if (count > array.length) {
        count = array.length;
      } else if (count < 0) {
        count = 0;
      }

      var arrayCopy = array.slice();
      var countToRemove = arrayCopy.length - count!;
      for (var i = 0; i < countToRemove; i++) {
        var indexToRemove = this.faker.random.number({ max: arrayCopy.length - 1 });
        arrayCopy.splice(indexToRemove, 1);
      }

      return arrayCopy;
  }

  /**
   * takes an object and returns the randomly key or value
   *
   * @method faker.random.objectElement
   * @param {object} object
   * @param {mixed} field
   */
  objectElement(object: any, field?: 'key' | 'value') {
      object = object || { "foo": "bar", "too": "car" };
      var array = Object.keys(object);
      var key = this.faker.random.arrayElement(array);

      return field === "key" ? key : object[key];
  }

  /**
   * uuid
   *
   * @method faker.random.uuid
   */
  uuid() {
      var RFC4122_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
      var replacePlaceholders = (placeholder: string) => {
          var random = this.number({ min: 0, max: 15 });
          var value = placeholder == 'x' ? random : (random &0x3 | 0x8);
          return value.toString(16);
      };
      return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
  }

  /**
   * boolean
   *
   * @method faker.random.boolean
   */
  boolean() {
      return !!this.faker.random.number(1)
  }

  /**
   * word
   *
   * @method faker.random.word
   */
  word() {
    var wordMethods = [
    'commerce.department',
    'commerce.productName',
    'commerce.productAdjective',
    'commerce.productMaterial',
    'commerce.product',
    'commerce.color',

    'company.catchPhraseAdjective',
    'company.catchPhraseDescriptor',
    'company.catchPhraseNoun',
    'company.bsAdjective',
    'company.bsBuzz',
    'company.bsNoun',
    'address.streetSuffix',
    'address.county',
    'address.country',
    'address.state',

    'finance.accountName',
    'finance.transactionType',
    'finance.currencyName',

    'hacker.noun',
    'hacker.verb',
    'hacker.adjective',
    'hacker.ingverb',
    'hacker.abbreviation',

    'name.jobDescriptor',
    'name.jobArea',
    'name.jobType'];

    // randomly pick from the many faker methods that can generate words
    var randomWordMethod = this.faker.random.arrayElement(wordMethods);
    var result = this.faker.fake('{{' + randomWordMethod + '}}');
    return this.faker.random.arrayElement(result.split(' '));
  }

  /**
   * randomWords
   *
   * @method faker.random.words
   * @param {number} count defaults to a random value between 1 and 3
   */
  words(count?: number) {
    var words = [];
    if (typeof count === "undefined") {
      count = this.faker.random.number({min:1, max: 3});
    }
    for (var i = 0; i < count!; i++) {
      words.push(this.faker.random.word());
    }
    return words.join(' ');
  }

  /**
   * locale
   *
   * @method faker.random.image
   */
  image() {
    return this.faker.image.image();
  }

  /**
   * locale
   *
   * @method faker.random.locale
   */
  locale() {
    return this.faker.random.arrayElement(Object.keys(this.faker.locales));
  };

  /**
   * alphaNumeric
   *
   * @method faker.random.alphaNumeric
   * @param {number} count defaults to 1
   */
  alphaNumeric(count?: number) {
    if (typeof count === "undefined") {
      count = 1;
    }

    var wholeString = "";
    for(var i = 0; i < count; i++) {
      wholeString += this.faker.random.arrayElement(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
    }

    return wholeString;
  };

  /**
   * hexaDecimal
   *
   * @method faker.random.hexaDecimal
   * @param {number} count defaults to 1
   */
  hexaDecimal(count?: number) {
    if (typeof count === "undefined") {
      count = 1;
    }

    var wholeString = "";
    for(var i = 0; i < count; i++) {
      wholeString += this.faker.random.arrayElement(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"]);
    }

    return "0x"+wholeString;
  };
}

export = Random;
