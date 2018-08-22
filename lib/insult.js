/**
 *
 * @namespace faker.insult
 */
function Insult (faker) {
    var self = this;
  
    /**
     * adjective
     *
     * @method faker.insult.adjective
     */
    self.adjective = function () {
      return faker.random.arrayElement(faker.definitions.insult.adjective);
    };
  
    /**
     * noun
     *
     * @method faker.insult.noun
     */
    self.noun = function () {
      return faker.random.arrayElement(faker.definitions.insult.noun);
    };
  
    /**
     * ingverb
     *
     * @method faker.insult.ingverb
     */
    self.ingverb = function () {
      return faker.random.arrayElement(faker.definitions.insult.ingverb);
    };
  
    /**
     * phrase
     *
     * @method faker.insult.phrase
     */
    self.phrase = function () {
        if(!faker.definitions.insult 
            || !faker.definitions.insult.phrase 
            || !faker.definitions.insult.noun 
            || !faker.definitions.insult.ingverb 
            || !faker.definitions.insult.adjective) {
                return faker.random.randomWords(3);
        } else {
            var data = {
                adjective: self.adjective,
                ingverb: self.ingverb,
                noun: self.noun,
            };
        
            var phrase = faker.random.arrayElement(faker.definitions.insult.phrase);
            return faker.helpers.mustache(phrase, data);
        }
    };
    
    return self;
  
}
  
  module['exports'] = Insult;
  