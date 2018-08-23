/**
 *
 * @namespace faker.hacker
 */
class Hacker {
  constructor(private faker: any) { }

  /**
   * abbreviation
   *
   * @method faker.hacker.abbreviation
   */
  abbreviation() {
    return this.faker.random.arrayElement(this.faker.definitions.hacker.abbreviation);
  }

  /**
   * adjective
   *
   * @method faker.hacker.adjective
   */
  adjective() {
    return this.faker.random.arrayElement(this.faker.definitions.hacker.adjective);
  }

  /**
   * noun
   *
   * @method faker.hacker.noun
   */
  noun() {
    return this.faker.random.arrayElement(this.faker.definitions.hacker.noun);
  }

  /**
   * verb
   *
   * @method faker.hacker.verb
   */
  verb() {
    return this.faker.random.arrayElement(this.faker.definitions.hacker.verb);
  }

  /**
   * ingverb
   *
   * @method faker.hacker.ingverb
   */
  ingverb() {
    return this.faker.random.arrayElement(this.faker.definitions.hacker.ingverb);
  }

  /**
   * phrase
   *
   * @method faker.hacker.phrase
   */
  phrase() {
    var data = {
      abbreviation: this.abbreviation.bind(this),
      adjective: this.adjective.bind(this),
      ingverb: this.ingverb.bind(this),
      noun: this.noun.bind(this),
      verb: this.verb.bind(this)
    };

    var phrase = this.faker.random.arrayElement(this.faker.definitions.hacker.phrase);
    return this.faker.helpers.mustache(phrase, data);
  }
}

export = Hacker;
