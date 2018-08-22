/**
 *
 * @namespace faker.game_name
 */
var GameName = function (faker) {
    var self = this;
  
    /**
     * noun
     *
     * @method faker.game_name.noun
     */
    self.noun = function () {
      return faker.random.arrayElement(faker.definitions.game_name.noun);
    };
  
    /**
     * location
     *
     * @method faker.game_name.location
     */
    self.location = function () {
        return faker.random.arrayElement(faker.definitions.game_name.location);
    };

    /**
     * dev_name
     *
     * @method faker.game_name.dev_name
     */
    self.dev_name = function () {
        return faker.random.arrayElement(faker.definitions.game_name.dev_name);
    };

    /**
     * ingverb
     *
     * @method faker.game_name.ingverb
     */
    self.ingverb = function () {
        return faker.random.arrayElement(faker.definitions.game_name.ingverb);
    };

    /**
     * adjective
     *
     * @method faker.game_name.adjective
     */
    self.adjective = function () {
        return faker.random.arrayElement(faker.definitions.game_name.adjective);
    };
  
    /**
     * phrase
     *
     * @method faker.game_name.phrase
     */
    self.phrase = function () {
        if(!faker.definitions.game_name 
            || !faker.definitions.game_name.noun 
            || !faker.definitions.game_name.game_title
            || !faker.definitions.game_name.ingverb
            || !faker.definitions.game_name.adjective
            || !faker.definitions.game_name.location) {
                return faker.random.randomWords(3);
        } else {
            var data = {
                adjective: self.adjective,
                noun: self.noun,
                ingverb: self.ingverb,
                location: self.location,
                dev_name: self.dev_name,
            };
        
            var phrase = faker.random.arrayElement(faker.definitions.game_name.game_title);
            return faker.helpers.mustache(phrase, data);
        }
    };
    
    return self;
  
}
  
module['exports'] = GameName;
  