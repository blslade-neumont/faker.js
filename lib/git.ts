/**
 *
 * @namespace faker.git
 */
var Git = function (faker) {
  var self = this;
  
  /**
   * bug
   *
   * @method faker.git.bug
   */
  self.bug = function () {
    return faker.random.arrayElement(faker.definitions.git.bug);
  };

  /**
   * feature
   *
   * @method faker.git.feature
   */
  self.feature = function () {
    return faker.random.arrayElement(faker.definitions.git.feature);
  };

  var getRandomHex = function() {
    return faker.random.number({min: 0, max: 15}).toString(16); 
  }

  /**
   * shaKey
   *
   * @method faker.git.shaKey
   */
  self.shaKey = function (length) {

    length = length || 40;
    var res = "";
    for(var j = 0; j < length; j++){
      res += getRandomHex();
    }
    return res;
  }

  /**
   * shaShort
   *
   * @method faker.git.shaShort
   */
  self.shaShort = function () {
    return faker.git.shaKey(8);
  }

  /**
   * commitMessage
   *
   * @method faker.git.commitMessage
   */
  self.commitMessage = function () {
    if(!faker.definitions.git || !faker.definitions.git.phrase) {
      return faker.random.words(faker.random.number({min: 3, max: 10}));
    }

    var data = {
      bug: self.bug,
      feature: self.feature
    };

    var commitMessage = faker.random.arrayElement(faker.definitions.git.phrase);
    return faker.helpers.mustache(commitMessage, data);
  };
  
  return self;
};

module['exports'] = Git;