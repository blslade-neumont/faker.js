/**
 *
 * @namespace faker.helpers
 */
class Helpers {
  constructor(private faker: any) { }

  /**
   * backward-compatibility
   *
   * @method faker.helpers.randomize
   * @param {array} array
   */
  randomize<T>(array?: T[]) {
      array = array || <T[]><any>["a", "b", "c"];
      return this.faker.random.arrayElement(array);
  }

  /**
   * slugifies string
   *
   * @method faker.helpers.slugify
   * @param {string} string
   */
  slugify(string: string = '') {
      return string.replace(/ /g, '-').replace(/[^\w\.\-]+/g, '');
  }

  /**
   * parses string for a symbol and replace it with a random number from 1-10
   *
   * @method faker.helpers.replaceSymbolWithNumber
   * @param {string} string
   * @param {string} symbol defaults to `"#"`
   */
  replaceSymbolWithNumber(string: string = '', symbol: string = '#') {
      var str = '';
      for (var i = 0; i < string.length; i++) {
          if (string.charAt(i) == symbol) {
              str += this.faker.random.number(9);
          } else if (string.charAt(i) == "!"){
              str += this.faker.random.number({min: 2, max: 9});
          } else {
              str += string.charAt(i);
          }
      }
      return str;
  }

  /**
   * parses string for symbols (numbers or letters) and replaces them appropriately
   *
   * @method faker.helpers.replaceSymbols
   * @param {string} string
   */
  replaceSymbols(string: string = '') {
      var alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
      var str = '';

      for (var i = 0; i < string.length; i++) {
          if (string.charAt(i) == "#") {
              str += this.faker.random.number(9);
          } else if (string.charAt(i) == "?") {
              str += this.faker.random.arrayElement(alpha);
          } else if (string.charAt(i) == "*") {
            str += this.faker.random.boolean() ? this.faker.random.arrayElement(alpha) : this.faker.random.number(9);
          } else {
              str += string.charAt(i);
          }
      }
      return str;
  }

  /**
   * replace symbols in a credit card schems including Luhn checksum
   *
   * @method faker.helpers.replaceCreditCardSymbols
   * @param {string} str
   * @param {string} symbol
   */

   replaceCreditCardSymbols(str: string = '', symbol: string = '#') {
     // Function calculating the Luhn checksum of a number string
     var getCheckBit = function(number: number[]) {
       number.reverse();
       number = number.map(function(num, index){
         if(index%2 === 0) {
           num *= 2;
           if(num>9) {
             num -= 9;
           }
         }
         return num;
       });
       var sum = number.reduce(function(prev,curr){return prev + curr;});
       return sum % 10;
     };

     str = this.faker.helpers.regexpStyleStringParse(str); // replace [4-9] with a random number in range etc...
     str = this.faker.helpers.replaceSymbolWithNumber(str, symbol); // replace ### with random numbers

     var numberList = str.replace(/\D/g,"").split("").map(function(num){return parseInt(num);});
     var checkNum = <any>getCheckBit(numberList);
     return str.replace("L",checkNum);
   }

   /** string repeat helper, alternative to String.prototype.repeat.... See PR #382
   *
   * @method faker.helpers.repeatString
   * @param {string} str
   * @param {number} num
   */
   repeatString(str: string, num: number = 0) {
     var text = "";
     for(var i = 0; i < num; i++){
       text += str.toString();
     }
     return text;
   }

   /**
    * parse string paterns in a similar way to RegExp
    *
    * e.g. "#{3}test[1-5]" -> "###test4"
    *
    * @method faker.helpers.regexpStyleStringParse
    * @param {string} str
    */
   regexpStyleStringParse(str: string = '') {
     // Deal with range repeat `{min,max}`
     var RANGE_REP_REG = /(.)\{(\d+)\,(\d+)\}/;
     var REP_REG = /(.)\{(\d+)\}/;
     var RANGE_REG = /\[(\d+)\-(\d+)\]/;
     var min, max, tmp, repetitions;
     var token = str.match(RANGE_REP_REG);
     while(token !== null){
       min = parseInt(token[2]);
       max =  parseInt(token[3]);
       // switch min and max
       if(min>max) {
         tmp = max;
         max = min;
         min = tmp;
       }
       repetitions = this.faker.random.number({min:min,max:max});
       str = str.slice(0,token.index) + this.faker.helpers.repeatString(token[1], repetitions) + str.slice(token.index!+token[0].length);
       token = str.match(RANGE_REP_REG);
     }
     // Deal with repeat `{num}`
     token = str.match(REP_REG);
     while(token !== null){
       repetitions = parseInt(token[2]);
       str = str.slice(0,token.index)+ this.faker.helpers.repeatString(token[1], repetitions) + str.slice(token.index!+token[0].length);
       token = str.match(REP_REG);
     }
     // Deal with range `[min-max]` (only works with numbers for now)
     //TODO: implement for letters e.g. [0-9a-zA-Z] etc.

     token = str.match(RANGE_REG);
     while(token !== null){
       min = parseInt(token[1]); // This time we are not capturing the char befor `[]`
       max =  parseInt(token[2]);
       // switch min and max
       if(min>max) {
         tmp = max;
         max = min;
         min = tmp;
       }
        str = str.slice(0,token.index) +
          this.faker.random.number({min:min, max:max}).toString() +
          str.slice(token.index!+token[0].length);
        token = str.match(RANGE_REG);
     }
     return str;
   }

  /**
   * takes an array and returns it randomized
   *
   * @method faker.helpers.shuffle
   * @param {array} arr
   */
  shuffle<T>(arr?: T[]) {
      if (!arr || arr.length === 0) {
        return [];
      }
      arr = arr || <any>["a", "b", "c"];
      for (var j, x, i = arr.length-1; i; j = this.faker.random.number(i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
      return arr;
  }

  /**
   * mustache
   *
   * @method faker.helpers.mustache
   * @param {string} str
   * @param {object} data
   */
  mustache(str: string = '', data: any) {
    for(var p in data) {
      var re = new RegExp('{{' + p + '}}', 'g')
      str = str.replace(re, data[p]);
    }
    return str;
  }

  /**
   * createCard
   *
   * @method faker.helpers.createCard
   */
  createCard() {
      return {
          "name": this.faker.name.findName(),
          "username": this.faker.internet.userName(),
          "email": this.faker.internet.email(),
          "address": {
              "streetA": this.faker.address.streetName(),
              "streetB": this.faker.address.streetAddress(),
              "streetC": this.faker.address.streetAddress(true),
              "streetD": this.faker.address.secondaryAddress(),
              "city": this.faker.address.city(),
              "state": this.faker.address.state(),
              "country": this.faker.address.country(),
              "zipcode": this.faker.address.zipCode(),
              "geo": {
                  "lat": this.faker.address.latitude(),
                  "lng": this.faker.address.longitude()
              }
          },
          "phone": this.faker.phone.phoneNumber(),
          "website": this.faker.internet.domainName(),
          "company": {
              "name": this.faker.company.companyName(),
              "catchPhrase": this.faker.company.catchPhrase(),
              "bs": this.faker.company.bs()
          },
          "posts": [
              {
                  "words": this.faker.lorem.words(),
                  "sentence": this.faker.lorem.sentence(),
                  "sentences": this.faker.lorem.sentences(),
                  "paragraph": this.faker.lorem.paragraph()
              },
              {
                  "words": this.faker.lorem.words(),
                  "sentence": this.faker.lorem.sentence(),
                  "sentences": this.faker.lorem.sentences(),
                  "paragraph": this.faker.lorem.paragraph()
              },
              {
                  "words": this.faker.lorem.words(),
                  "sentence": this.faker.lorem.sentence(),
                  "sentences": this.faker.lorem.sentences(),
                  "paragraph": this.faker.lorem.paragraph()
              }
          ],
          "accountHistory": [this.faker.helpers.createTransaction(), this.faker.helpers.createTransaction(), this.faker.helpers.createTransaction()]
      };
  }

  /**
   * contextualCard
   *
   * @method faker.helpers.contextualCard
   */
  contextualCard() {
    var name = this.faker.name.firstName(),
        userName = this.faker.internet.userName(name);
    return {
        "name": name,
        "username": userName,
        "avatar": this.faker.internet.avatar(),
        "email": this.faker.internet.email(userName),
        "dob": this.faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)")),
        "phone": this.faker.phone.phoneNumber(),
        "address": {
            "street": this.faker.address.streetName(true),
            "suite": this.faker.address.secondaryAddress(),
            "city": this.faker.address.city(),
            "zipcode": this.faker.address.zipCode(),
            "geo": {
                "lat": this.faker.address.latitude(),
                "lng": this.faker.address.longitude()
            }
        },
        "website": this.faker.internet.domainName(),
        "company": {
            "name": this.faker.company.companyName(),
            "catchPhrase": this.faker.company.catchPhrase(),
            "bs": this.faker.company.bs()
        }
    };
  }


  /**
   * userCard
   *
   * @method faker.helpers.userCard
   */
  userCard() {
      return {
          "name": this.faker.name.findName(),
          "username": this.faker.internet.userName(),
          "email": this.faker.internet.email(),
          "address": {
              "street": this.faker.address.streetName(true),
              "suite": this.faker.address.secondaryAddress(),
              "city": this.faker.address.city(),
              "zipcode": this.faker.address.zipCode(),
              "geo": {
                  "lat": this.faker.address.latitude(),
                  "lng": this.faker.address.longitude()
              }
          },
          "phone": this.faker.phone.phoneNumber(),
          "website": this.faker.internet.domainName(),
          "company": {
              "name": this.faker.company.companyName(),
              "catchPhrase": this.faker.company.catchPhrase(),
              "bs": this.faker.company.bs()
          }
      };
  }

  /**
   * createTransaction
   *
   * @method faker.helpers.createTransaction
   */
  createTransaction() {
    return {
      "amount" : this.faker.finance.amount(),
      "date" : new Date(2012, 1, 2),  //TODO: add a ranged date method
      "business": this.faker.company.companyName(),
      "name": [this.faker.finance.accountName(), this.faker.finance.mask()].join(' '),
      "type" : this.randomize(this.faker.definitions.finance.transaction_type),
      "account" : this.faker.finance.account()
    };
  }
}

export = Helpers;
