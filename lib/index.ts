import Fake = require('./fake');
import Unique = require('./unique');
import Random = require('./random');
import Helpers = require('./helpers');
import Name = require('./name');
import Address = require('./address');
import Company = require('./company');
import Finance = require('./finance');
import Image = require('./image');
import Lorem = require('./lorem');
import Hacker = require('./hacker');
import Internet = require('./internet');
import Database = require('./database');
import Phone = require('./phone_number');
import _Date = require('./date');
import Commerce = require('./commerce');
import System = require('./system');
import Git = require('./git');
import Insult = require('./insult');
import Statistic = require('./statistic');
import GameName = require('./game_name');

function bindAll(obj: any) {
    Object.keys(obj).forEach(function(meth) {
        if (typeof obj[meth] === 'function') {
            obj[meth] = obj[meth].bind(obj);
        }
    });
    return obj;
}

/*

   this index.js file is used for including the faker library as a CommonJS module, instead of a bundle

   you can include the faker library into your existing node.js application by requiring the entire /faker directory

    var faker = require(./faker);
    var randomName = faker.name.findName();

   you can also simply include the "faker.js" file which is the auto-generated bundled version of the faker library

    var faker = require(./customAppPath/faker);
    var randomName = faker.name.findName();


  if you plan on modifying the faker library you should be performing your changes in the /lib/ directory

*/

/**
 *
 * @namespace faker
 */
class Faker {
  constructor(opts: any = {}) {
    this.locales = this.locales || opts.locales || {};
    this.locale = this.locale || opts.locale || "en";
    this.localeFallback = this.localeFallback || opts.localeFallback || "en";

    this.fake = new Fake(this).fake;
    this.unique = bindAll(new Unique(this).unique);
    this.random = bindAll(new Random(this));
    this.helpers = new Helpers(this);
    this.name = bindAll(new Name(this));
    this.address = bindAll(new Address(this));
    this.company = bindAll(new Company(this));
    this.finance = bindAll(new Finance(this));
    this.image = bindAll(new Image(this));
    this.lorem = bindAll(new Lorem(this));
    this.hacker = bindAll(new Hacker(this));
    this.internet = bindAll(new Internet(this));
    this.database = bindAll(new Database(this));
    this.phone = bindAll(new Phone(this));
    this.date = bindAll(new _Date(this));
    this.commerce = bindAll(new Commerce(this));
    this.system = bindAll(new System(this));
    this.git = bindAll(new Git(this));
    this.insult = bindAll(new Insult(this));
    this.statistic = bindAll(new Statistic(this));
    this.game_name = bindAll(new GameName(this));

    var _definitions: { [key: string]: string | string[] } = {
      "name": ["first_name", "middle_name", "last_name", "prefix", "suffix", "gender", "title", "male_first_name", "female_first_name", "male_middle_name", "female_middle_name", "male_last_name", "female_last_name"],
      "address": ["city_prefix", "city_suffix", "street_suffix", "county", "country", "country_code", "state", "state_abbr", "street_prefix", "postcode", "direction", "direction_abbr"],
      "company": ["adjective", "noun", "descriptor", "bs_adjective", "bs_noun", "bs_verb", "suffix"],
      "lorem": ["words"],
      "hacker": ["abbreviation", "adjective", "noun", "verb", "ingverb", "phrase"],
      "phone_number": ["formats"],
      "finance": ["account_type", "transaction_type", "currency", "iban", "credit_card"],
      "internet": ["avatar_uri", "domain_suffix", "free_email", "example_email", "password"],
      "commerce": ["color", "department", "product_name", "price", "categories"],
      "database": ["collation", "column", "engine", "type"],
      "system": ["mimeTypes"],
      "date": ["month", "weekday"],
      "insult": ["ingverb", "noun", "adjective", "phrase"],
      "git": ["bug","feature","phrase"],
      "statistic": ["noun", "phrase", "reaction", "subject"],
      "game_name": ["adjective", "dev_name", "game_title", "ingverb", "location", "noun"],
      "title": "",
      "separator": ""
    };

    // Create a Getter for all definitions.foo.bar properties
    Object.keys(_definitions).forEach(d => {
      if (typeof this.definitions[d] === "undefined") {
        this.definitions[d] = {};
      }

      if (typeof _definitions[d] === "string") {
        this.definitions[d] = _definitions[d];
        return;
      }

      (<string[]>_definitions[d]).forEach(p => {
        Object.defineProperty(this.definitions[d], p, {
          get: () => {
            if (typeof this.locales[this.locale][d] === "undefined" || typeof this.locales[this.locale][d][p] === "undefined") {
              // certain localization sets contain less data then others.
              // in the case of a missing definition, use the default localeFallback to substitute the missing set data
              // throw new Error('unknown property ' + d + p)
              return this.locales[this.localeFallback][d][p];
            } else {
              // return localized data
              return this.locales[this.locale][d][p];
            }
          }
        });
      });
    });
  }

  locales: any;
  locale: string;
  localeFallback: string;

  readonly definitions: any = {};

  seedValue: any;

  fake: any;
  unique: any;
  random: Random;
  helpers: Helpers;
  name: Name;
  address: Address;
  company: Company;
  finance: Finance;
  image: Image;
  lorem: Lorem;
  hacker: Hacker;
  internet: Internet;
  database: Database;
  phone: Phone;
  date: _Date;
  commerce: Commerce;
  system: System;
  git: Git;
  insult: Insult;
  statistic: Statistic;
  game_name: GameName;

  setLocale(locale: string) {
    this.locale = locale;
  }

  seed(value: any) {
    this.seedValue = value;
    this.random = new Random(this, this.seedValue);
  }
}

export = Faker;
