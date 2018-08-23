import random_ua = require('../vendor/user-agent');

type MethodSchema = {
  description: string,
  sampleResults: string[],
  properties?: {
    [key: string]: {
      type: string,
      required: boolean,
      description: string
    }
  }
};

/**
 *
 * @namespace faker.internet
 */
class Internet {
  constructor(private faker: any) {
    (<any>this.avatar).schema = <MethodSchema>{
      "description": "Generates a URL for an avatar.",
      "sampleResults": ["https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg"]
    };

    (<any>this.email).schema = <MethodSchema>{
      "description": "Generates a valid email address based on optional input criteria",
      "sampleResults": ["foo.bar@gmail.com"],
      "properties": {
        "firstName": {
          "type": "string",
          "required": false,
          "description": "The first name of the user"
        },
        "lastName": {
          "type": "string",
          "required": false,
          "description": "The last name of the user"
        },
        "provider": {
          "type": "string",
          "required": false,
          "description": "The domain of the user"
        }
      }
    };

    (<any>this.userName).schema = <MethodSchema>{
      "description": "Generates a username based on one of several patterns. The pattern is chosen randomly.",
      "sampleResults": [
        "Kirstin39",
        "Kirstin.Smith",
        "Kirstin.Smith39",
        "KirstinSmith",
        "KirstinSmith39",
      ],
      "properties": {
        "firstName": {
          "type": "string",
          "required": false,
          "description": "The first name of the user"
        },
        "lastName": {
          "type": "string",
          "required": false,
          "description": "The last name of the user"
        }
      }
    };

    (<any>this.protocol).schema = {
      "description": "Randomly generates http or https",
      "sampleResults": ["https", "http"]
    };

    (<any>this.url).schema = {
      "description": "Generates a random URL. The URL could be secure or insecure.",
      "sampleResults": [
        "http://rashawn.name",
        "https://rashawn.name"
      ]
    };

    (<any>this.domainName).schema = {
      "description": "Generates a random domain name.",
      "sampleResults": ["marvin.org"]
    };

    (<any>this.domainSuffix).schema = {
      "description": "Generates a random domain suffix.",
      "sampleResults": ["net"]
    };

    (<any>this.domainWord).schema = {
      "description": "Generates a random domain word.",
      "sampleResults": ["alyce"]
    };

    (<any>this.ip).schema = {
      "description": "Generates a random IP.",
      "sampleResults": ["97.238.241.11"]
    };

    (<any>this.ipv6).schema = {
      "description": "Generates a random IPv6 address.",
      "sampleResults": ["2001:0db8:6276:b1a7:5213:22f1:25df:c8a0"]
    };

    (<any>this.userAgent).schema = {
      "description": "Generates a random user agent.",
      "sampleResults": ["Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_7_5 rv:6.0; SL) AppleWebKit/532.0.1 (KHTML, like Gecko) Version/7.1.6 Safari/532.0.1"]
    };

    (<any>this.color).schema = {
      "description": "Generates a random hexadecimal color.",
      "sampleResults": ["#06267f"],
      "properties": {
        "baseRed255": {
          "type": "number",
          "required": false,
          "description": "The red value. Valid values are 0 - 255."
        },
        "baseGreen255": {
          "type": "number",
          "required": false,
          "description": "The green value. Valid values are 0 - 255."
        },
        "baseBlue255": {
          "type": "number",
          "required": false,
          "description": "The blue value. Valid values are 0 - 255."
        }
      }
    };

    (<any>this.mac).schema = {
      "description": "Generates a random mac address.",
      "sampleResults": ["78:06:cc:ae:b3:81"]
    };

    (<any>this.password).schema = {
      "description": "Generates a random password.",
      "sampleResults": [
        "AM7zl6Mg",
        "susejofe"
      ],
      "properties": {
        "length": {
          "type": "number",
          "required": false,
          "description": "The number of characters in the password."
        },
        "memorable": {
          "type": "boolean",
          "required": false,
          "description": "Whether a password should be easy to remember."
        },
        "pattern": {
          "type": "regex",
          "required": false,
          "description": "A regex to match each character of the password against. This parameter will be negated if the memorable setting is turned on."
        },
        "prefix": {
          "type": "string",
          "required": false,
          "description": "A value to prepend to the generated password. The prefix counts towards the length of the password."
        }
      }
    };
  }

  /**
   * avatar
   *
   * @method faker.internet.avatar
   */
  avatar() {
    return this.faker.random.arrayElement(this.faker.definitions.internet.avatar_uri);
  }

  /**
   * email
   *
   * @method faker.internet.email
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} provider
   */
  email(firstName?: string, lastName?: string, provider?: string) {
    provider = provider || this.faker.random.arrayElement(this.faker.definitions.internet.free_email);
    return  this.faker.helpers.slugify(this.faker.internet.userName(firstName, lastName)) + "@" + provider;
  }

  /**
   * exampleEmail
   *
   * @method faker.internet.exampleEmail
   * @param {string} firstName
   * @param {string} lastName
   */
  exampleEmail(firstName?: string, lastName?: string) {
      var provider = this.faker.random.arrayElement(this.faker.definitions.internet.example_email);
      return this.email(firstName, lastName, provider);
  }

  /**
   * userName
   *
   * @method faker.internet.userName
   * @param {string} firstName
   * @param {string} lastName
   */
  userName(firstName?: string, lastName?: string) {
    var result;
    firstName = firstName || this.faker.name.firstName();
    lastName = lastName || this.faker.name.lastName();
    switch (this.faker.random.number(2)) {
    case 0:
        result = firstName + this.faker.random.number(99);
        break;
    case 1:
        result = firstName + this.faker.random.arrayElement([".", "_"]) + lastName;
        break;
    case 2:
        result = firstName + this.faker.random.arrayElement([".", "_"]) + lastName + this.faker.random.number(99);
        break;
    }
    result = result.toString().replace(/'/g, "");
    result = result.replace(/ /g, "");
    return result;
  }

  /**
   * protocol
   *
   * @method faker.internet.protocol
   */
  protocol() {
      var protocols = ['http','https'];
      return this.faker.random.arrayElement(protocols);
  }

  /**
   * url
   *
   * @method faker.internet.url
   */
  url() {
      return this.faker.internet.protocol() + '://' + this.faker.internet.domainName();
  }

  /**
   * domainName
   *
   * @method faker.internet.domainName
   */
  domainName() {
      return this.faker.internet.domainWord() + "." + this.faker.internet.domainSuffix();
  }

  /**
   * domainSuffix
   *
   * @method faker.internet.domainSuffix
   */
  domainSuffix() {
      return this.faker.random.arrayElement(this.faker.definitions.internet.domain_suffix);
  }

  /**
   * domainWord
   *
   * @method faker.internet.domainWord
   */
  domainWord() {
      return this.faker.name.firstName().replace(/([\\~#&*{}/:<>?|\"'])/ig, '').toLowerCase();
  }

  /**
   * ip
   *
   * @method faker.internet.ip
   */
  ip() {
      var randNum = () => {
          return (this.faker.random.number(255)).toFixed(0);
      };

      var result = [];
      for (var i = 0; i < 4; i++) {
          result[i] = randNum();
      }

      return result.join(".");
  }

  /**
   * ipv6
   *
   * @method faker.internet.ipv6
   */
  ipv6() {
      var randHash = () => {
          var result = "";
          for (var i = 0; i < 4; i++) {
            result += (this.faker.random.arrayElement(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]));
          }
          return result
      };

      var result = [];
      for (var i = 0; i < 8; i++) {
        result[i] = randHash();
      }
      return result.join(":");
  }

  /**
   * userAgent
   *
   * @method faker.internet.userAgent
   */
  userAgent() {
    return random_ua.generate();
  }

  /**
   * color
   *
   * @method faker.internet.color
   * @param {number} baseRed255
   * @param {number} baseGreen255
   * @param {number} baseBlue255
   */
  color(baseRed255: number = 0, baseGreen255: number = 0, baseBlue255: number = 0) {
      // based on awesome response : http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
      var red = Math.floor((this.faker.random.number(256) + baseRed255) / 2);
      var green = Math.floor((this.faker.random.number(256) + baseGreen255) / 2);
      var blue = Math.floor((this.faker.random.number(256) + baseBlue255) / 2);
      var redStr = red.toString(16);
      var greenStr = green.toString(16);
      var blueStr = blue.toString(16);
      return '#' +
        (redStr.length === 1 ? '0' : '') + redStr +
        (greenStr.length === 1 ? '0' : '') + greenStr +
        (blueStr.length === 1 ? '0': '') + blueStr;
  }

  /**
   * mac
   *
   * @method faker.internet.mac
   * @param {string} sep
   */
  mac(sep: string) {
      var i, 
        mac = "",
        validSep = ':';

      // if the client passed in a different separator than `:`, 
      // we will use it if it is in the list of acceptable separators (dash or no separator)
      if (['-', ''].indexOf(sep) !== -1) {
        validSep = sep;
      } 

      for (i=0; i < 12; i++) {
          mac+= this.faker.random.number(15).toString(16);
          if (i%2==1 && i != 11) {
              mac+=validSep;
          }
      }
      return mac;
  }

  /**
   * password
   *
   * @method faker.internet.password
   * @param {number} len
   * @param {boolean} memorable
   * @param {string} pattern
   * @param {string} prefix
   */
   password(len: number = 15, memorable: boolean = false, pattern: any, prefix: string = '') {
     /*
      * password-generator ( function )
      * Copyright(c) 2011-2013 Bermi Ferrer <bermi@bermilabs.com>
      * MIT Licensed
      */
     var consonant: RegExp, vowel: RegExp;
     vowel = /[aeiouAEIOU]$/;
     consonant = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/;
     var _password = (length: number, memorable: boolean, pattern: any, prefix: string): string => {
       var char, n;
       if (length == null) {
         length = 10;
       }
       if (memorable == null) {
         memorable = true;
       }
       if (pattern == null) {
         pattern = /\w/;
       }
       if (prefix == null) {
         prefix = '';
       }
       if (prefix.length >= length) {
         return prefix;
       }
       if (memorable) {
         if (prefix.match(consonant)) {
           pattern = vowel;
         } else {
           pattern = consonant;
         }
       }
       n = this.faker.random.number(94) + 33;
       char = String.fromCharCode(n);
       if (memorable) {
         char = char.toLowerCase();
       }
       if (!char.match(pattern)) {
         return _password(length, memorable, pattern, prefix);
       }
       return _password(length, memorable, pattern, "" + prefix + char);
     };
     return _password(len, memorable, pattern, prefix);
   }
}

export = Internet;
