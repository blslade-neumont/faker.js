/**
 *
 * @namespace faker.statistic
 */
var Statistic = function (faker) {
    var self = this;
  
    /**
     * noun
     *
     * @method faker.statistic.noun
     */
    self.noun = function () {
      return faker.random.arrayElement(faker.definitions.statistic.noun);
    };
  
    // /**
    //  * adjective
    //  *
    //  * @method faker.statistic.adjective
    //  */
    // self.adjective = function () {
    //     return faker.random.arrayElement(faker.definitions.statistic.adjective);
    // };

    /**
     * reaction
     *
     * @method faker.statistic.reaction
     */
    self.reaction = function () {
        return faker.random.arrayElement(faker.definitions.statistic.reaction);
    };

    /**
     * subject
     *
     * @method faker.statistic.subject
     */
    self.subject = function () {
        return faker.random.arrayElement(faker.definitions.statistic.subject);
    };

    /**
     * whole number
     *
     * @method faker.statistic.wholeNumber
     */
    self.wholeNumber = function () {
      return Math.floor(faker.random.number({min: 0, max: 30}));
    };

    /**
     * percentage
     *
     * @method faker.statistic.percentage
     */
    self.percentage = function () {
        return faker.random.number({min: 0.0, max: 100.0});
      };
    
  
    /**
     * phrase
     *
     * @method faker.statistic.phrase
     */
    self.phrase = function () {
        if(!faker.definitions.statistic 
            || !faker.definitions.statistic.subject 
            || !faker.definitions.statistic.noun 
            || !faker.definitions.statistic.phrase
            || !faker.definitions.statistic.reaction) {
                return faker.random.randomWords(3);
        } else {
            var data = {
                wholeNumber: self.wholeNumber,
                percentage: self.percentage,
                reaction: self.reaction,
                subject: self.subject,
                noun: self.noun,
            };
        
            var phrase = faker.random.arrayElement(faker.definitions.statistic.phrase);
            return faker.helpers.mustache(phrase, data);
        }
    };
    
    return self;
  
}
  
module['exports'] = Statistic;
  