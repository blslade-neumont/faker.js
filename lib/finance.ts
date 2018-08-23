import ibanLib = require("./iban");

/**
 * @namespace faker.finance
 */
class Finance {
  constructor(private faker: any) {
    this.Helpers = this.faker.helpers;
  }

  private readonly Helpers: any;

  /**
   * account
   *
   * @method faker.finance.account
   * @param {number} length
   */
  account(length: number = 8) {
      var template = '';
      for (var i = 0; i < length; i++) {
          template = template + '#';
      }
      return this.Helpers.replaceSymbolWithNumber(template);
  }

  /**
   * accountName
   *
   * @method faker.finance.accountName
   */
  accountName() {
      return [this.Helpers.randomize(this.faker.definitions.finance.account_type), 'Account'].join(' ');
  }

  /**
   * routingNumber
   *
   * @method faker.finance.routingNumber
   */
  routingNumber() {
      var routingNumber = this.Helpers.replaceSymbolWithNumber('########');

      // Modules 10 straight summation.
      var sum = 0;

      for (var i = 0; i < routingNumber.length; i += 3) {
        sum += Number(routingNumber[i]) * 3;
        sum += Number(routingNumber[i + 1]) * 7;
        sum += Number(routingNumber[i + 2]) || 0;
      }

      return routingNumber + (Math.ceil(sum / 10) * 10 - sum);
  }

  /**
   * mask
   *
   * @method faker.finance.mask
   * @param {number} length
   * @param {boolean} parens
   * @param {boolean} ellipsis
   */
  mask(length: number = 4, parens: boolean = true, ellipsis: boolean = true) {
      //set defaults
      length = length || 4;

      //create a template for length
      var template = '';

      for (var i = 0; i < length; i++) {
          template = template + '#';
      }

      //prefix with ellipsis
      template = (ellipsis) ? ['...', template].join('') : template;

      template = (parens) ? ['(', template, ')'].join('') : template;

      //generate random numbers
      template = this.Helpers.replaceSymbolWithNumber(template);

      return template;
  }

  //min and max take in minimum and maximum amounts, dec is the decimal place you want rounded to, symbol is $, €, £, etc
  //NOTE: this returns a string representation of the value, if you want a number use parseFloat and no symbol

  /**
   * amount
   *
   * @method faker.finance.amount
   * @param {number} min
   * @param {number} max
   * @param {number} dec
   * @param {string} symbol
   *
   * @return {string}
   */
  amount(min: number = 0, max: number = 1000, dec: number = 2, symbol: string = '') {
      var randValue = this.faker.random.number({ max: max, min: min, precision: Math.pow(10, -dec) });

      return symbol + randValue.toFixed(dec);
  }

  /**
   * transactionType
   *
   * @method faker.finance.transactionType
   */
  transactionType() {
      return this.Helpers.randomize(this.faker.definitions.finance.transaction_type);
  }

  /**
   * currencyCode
   *
   * @method faker.finance.currencyCode
   */
  currencyCode() {
      return this.faker.random.objectElement(this.faker.definitions.finance.currency)['code'];
  }

  /**
   * currencyName
   *
   * @method faker.finance.currencyName
   */
  currencyName() {
      return this.faker.random.objectElement(this.faker.definitions.finance.currency, 'key');
  }

  /**
   * currencySymbol
   *
   * @method faker.finance.currencySymbol
   */
  currencySymbol() {
      var symbol;

      while (!symbol) {
          symbol = this.faker.random.objectElement(this.faker.definitions.finance.currency)['symbol'];
      }
      return symbol;
  }

  /**
   * bitcoinAddress
   *
   * @method  faker.finance.bitcoinAddress
   */
  bitcoinAddress() {
    var addressLength = this.faker.random.number({ min: 27, max: 34 });

    var address = this.faker.random.arrayElement(['1', '3']);

    for (var i = 0; i < addressLength - 1; i++)
      address += this.faker.random.alphaNumeric().toUpperCase();

    return address;
  }

  /**
   * Credit card number
   * @method faker.finance.creditCardNumber
   * @param {string} provider | scheme
  */
  creditCardNumber(provider: string = '') {
    var format, formats;
    var localeFormat = this.faker.definitions.finance.credit_card;
    if (provider in localeFormat) {
      formats = localeFormat[provider]; // there chould be multiple formats
      if (typeof formats === "string") {
        format = formats;
      } else {
        format = this.faker.random.arrayElement(formats);
      }
    } else if (provider.match(/#/)) { // The user chose an optional scheme
      format = provider;
    } else { // Choose a random provider
      if (typeof localeFormat === 'string') {
        format = localeFormat;
      } else if( typeof localeFormat === "object") {
        // Credit cards are in a object structure
        formats = this.faker.random.objectElement(localeFormat, "value"); // There chould be multiple formats
        if (typeof formats === "string") {
          format = formats;
        } else {
          format = this.faker.random.arrayElement(formats);
        }
      }
    }
    format = format.replace(/\//g,"")
    return this.Helpers.replaceCreditCardSymbols(format);
  }
  
  /**
   * Credit card CVV
   * @method faker.finance.creditCardNumber
  */
  creditCardCVV() {
    var cvv = "";
    for (var i = 0; i < 3; i++) {
      cvv += this.faker.random.number({max:9}).toString();
    }
    return cvv;
  }

  /**
   * ethereumAddress
   *
   * @method  faker.finance.ethereumAddress
   */
  ethereumAddress() {
    var address = this.faker.random.hexaDecimal(40);

    return address;
  }

  /**
   * iban
   *
   * @method  faker.finance.iban
   */
  iban(formatted: boolean = false) {
      var ibanFormat = this.faker.random.arrayElement(ibanLib.formats);
      var s = "";
      var count = 0;
      for (var b = 0; b < ibanFormat.bban.length; b++) {
          var bban = ibanFormat.bban[b];
          var c = bban.count;
          count += bban.count;
          while (c > 0) {
              if (bban.type == "a") {
                  s += this.faker.random.arrayElement(ibanLib.alpha);
              } else if (bban.type == "c") {
                  if (this.faker.random.number(100) < 80) {
                      s += this.faker.random.number(9);
                  } else {
                      s += this.faker.random.arrayElement(ibanLib.alpha);
                  }
              } else {
                  if (c >= 3 && this.faker.random.number(100) < 30) {
                      if (this.faker.random.boolean()) {
                          s += this.faker.random.arrayElement(ibanLib.pattern100);
                          c -= 2;
                      } else {
                          s += this.faker.random.arrayElement(ibanLib.pattern10);
                          c--;
                      }
                  } else {
                      s += this.faker.random.number(9);
                  }
              }
              c--;
          }
          s = s.substring(0, count);
      }
      var checksum = 98 - ibanLib.mod97(ibanLib.toDigitString(s + ibanFormat.country + "00"));
      if (checksum < 10) {
          checksum = <any>("0" + checksum);
      }
      var iban = ibanFormat.country + checksum + s;
      return formatted ? iban.match(/.{1,4}/g)!.join(" ") : iban;
  }

  /**
   * bic
   *
   * @method  faker.finance.bic
   */
  bic() {
      var vowels = ["A", "E", "I", "O", "U"];
      var prob = this.faker.random.number(100);
      return this.Helpers.replaceSymbols("???") +
          this.faker.random.arrayElement(vowels) +
          this.faker.random.arrayElement(ibanLib.iso3166) +
          this.Helpers.replaceSymbols("?") + "1" +
          (prob < 10 ?
              this.Helpers.replaceSymbols("?" + this.faker.random.arrayElement(vowels) + "?") :
          prob < 40 ?
              this.Helpers.replaceSymbols("###") : "");
  }
}

export = Finance;
