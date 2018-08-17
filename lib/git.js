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

  /**
   * commitMessage
   *
   * @method faker.git.commitMessage
   */
  self.commitMessage = function () {

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