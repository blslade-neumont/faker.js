/**
 *
 * @namespace faker.git
 */
class Git {
  constructor(private faker: any) { }

  /**
   * bug
   *
   * @method faker.git.bug
   */
  bug() {
    return this.faker.random.arrayElement(this.faker.definitions.git.bug);
  }

  /**
   * feature
   *
   * @method faker.git.feature
   */
  feature() {
    return this.faker.random.arrayElement(this.faker.definitions.git.feature);
  }

  private getRandomHex() {
    return this.faker.random.number({min: 0, max: 15}).toString(16); 
  }

  /**
   * shaKey
   *
   * @method faker.git.shaKey
   */
  shaKey(length: number = 40) {
    var res = "";
    for(var j = 0; j < length; j++){
      res += this.getRandomHex();
    }
    return res;
  }

  /**
   * shaShort
   *
   * @method faker.git.shaShort
   */
  shaShort() {
    return this.faker.git.shaKey(8);
  }

  /**
   * commitMessage
   *
   * @method faker.git.commitMessage
   */
  commitMessage() {
    if(!this.faker.definitions.git || !this.faker.definitions.git.phrase) {
      return this.faker.random.words(this.faker.random.number({min: 3, max: 10}));
    }

    var data = {
      bug: this.bug.bind(this),
      feature: this.feature.bind(this)
    };

    var commitMessage = this.faker.random.arrayElement(this.faker.definitions.git.phrase);
    return this.faker.helpers.mustache(commitMessage, data);
  }
};

export = Git;
