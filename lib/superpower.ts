/**
 *
 * @namespace faker.game_name
 */
class Superpower {
    constructor(private faker: any) { }

    /**
     * noun
     *
     * @method faker.superpower.noun
     */
    noun() {
      return this.faker.random.arrayElement(this.faker.definitions.superpower.noun);
    }

    /**
     * ingverb
     *
     * @method faker.superpower.ingverb
     */
    verb() {
        return this.faker.random.arrayElement(this.faker.definitions.superpower.verb);
    }

    /**
     * phrase
     *
     * @method faker.superpower.phrase
     */
    phrase() {
        if(!this.faker.definitions.superpower
            || !this.faker.definitions.superpower.noun
            || !this.faker.definitions.superpower.verb
            || !this.faker.definitions.superpower.phrase) {
                return this.faker.random.randomWords(3);
        } else {
            var data = {
                noun: this.noun.bind(this),
                verb: this.verb.bind(this)
            };
            
            var phrase = this.faker.random.arrayElement(this.faker.definitions.superpower.phrase);
            return this.faker.helpers.mustache(phrase, data);
        }
    }
}

export = Superpower;
