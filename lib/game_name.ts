/**
 *
 * @namespace faker.game_name
 */
class GameName {
    constructor(private faker: any) { }

    /**
     * noun
     *
     * @method faker.game_name.noun
     */
    noun() {
      return this.faker.random.arrayElement(this.faker.definitions.game_name.noun);
    }

    /**
     * location
     *
     * @method faker.game_name.location
     */
    location() {
        return this.faker.random.arrayElement(this.faker.definitions.game_name.location);
    }

    /**
     * dev_name
     *
     * @method faker.game_name.dev_name
     */
    dev_name() {
        return this.faker.random.arrayElement(this.faker.definitions.game_name.dev_name);
    }

    /**
     * ingverb
     *
     * @method faker.game_name.ingverb
     */
    ingverb() {
        return this.faker.random.arrayElement(this.faker.definitions.game_name.ingverb);
    }

    /**
     * adjective
     *
     * @method faker.game_name.adjective
     */
    adjective() {
        return this.faker.random.arrayElement(this.faker.definitions.game_name.adjective);
    };

    /**
     * phrase
     *
     * @method faker.game_name.phrase
     */
    phrase() {
        if(!this.faker.definitions.game_name 
            || !this.faker.definitions.game_name.noun 
            || !this.faker.definitions.game_name.game_title
            || !this.faker.definitions.game_name.ingverb
            || !this.faker.definitions.game_name.adjective
            || !this.faker.definitions.game_name.location) {
                return this.faker.random.randomWords(3);
        } else {
            var data = {
                adjective: this.adjective.bind(this),
                noun: this.noun.bind(this),
                ingverb: this.ingverb.bind(this),
                location: this.location.bind(this),
                dev_name: this.dev_name.bind(this)
            };
        
            var phrase = this.faker.random.arrayElement(this.faker.definitions.game_name.game_title);
            return this.faker.helpers.mustache(phrase, data);
        }
    }
}

export = GameName;
