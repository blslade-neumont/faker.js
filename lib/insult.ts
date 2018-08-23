/**
 *
 * @namespace faker.insult
 */
class Insult {
    constructor(private faker: any) { }
  
    /**
     * adjective
     *
     * @method faker.insult.adjective
     */
    adjective() {
      return this.faker.random.arrayElement(this.faker.definitions.insult.adjective);
    };
  
    /**
     * noun
     *
     * @method faker.insult.noun
     */
    noun() {
      return this.faker.random.arrayElement(this.faker.definitions.insult.noun);
    };
  
    /**
     * ingverb
     *
     * @method faker.insult.ingverb
     */
    ingverb() {
      return this.faker.random.arrayElement(this.faker.definitions.insult.ingverb);
    };
  
    /**
     * phrase
     *
     * @method faker.insult.phrase
     */
    phrase() {
        if(!this.faker.definitions.insult 
            || !this.faker.definitions.insult.phrase 
            || !this.faker.definitions.insult.noun 
            || !this.faker.definitions.insult.ingverb 
            || !this.faker.definitions.insult.adjective) {
                return this.faker.random.randomWords(3);
        } else {
            var data = {
                adjective: this.adjective.bind(this),
                ingverb: this.ingverb.bind(this),
                noun: this.noun.bind(this),
            };
        
            var phrase = this.faker.random.arrayElement(this.faker.definitions.insult.phrase);
            return this.faker.helpers.mustache(phrase, data);
        }
    }
}

export = Insult;
