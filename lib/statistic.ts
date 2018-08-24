/**
 *
 * @namespace faker.statistic
 */
class Statistic {
    constructor(private faker: any) { }

    /**
     * noun
     *
     * @method faker.statistic.noun
     */
    noun() {
      return this.faker.random.arrayElement(this.faker.definitions.statistic.noun);
    }

    /**
     * reaction
     *
     * @method faker.statistic.reaction
     */
    reaction() {
        return this.faker.random.arrayElement(this.faker.definitions.statistic.reaction);
    }

    /**
     * subject
     *
     * @method faker.statistic.subject
     */
    subject() {
        return this.faker.random.arrayElement(this.faker.definitions.statistic.subject);
    }

    /**
     * whole number
     *
     * @method faker.statistic.wholeNumber
     */
    wholeNumber() {
      return Math.floor(this.faker.random.number({min: 0, max: 30}));
    }

    /**
     * percentage
     *
     * @method faker.statistic.percentage
     */
    percentage() {
        return this.faker.random.number({min: 0.0, max: 100.0});
    };

    /**
     * phrase
     *
     * @method faker.statistic.phrase
     */
    phrase() {
        if(!this.faker.definitions.statistic 
            || !this.faker.definitions.statistic.subject 
            || !this.faker.definitions.statistic.noun 
            || !this.faker.definitions.statistic.phrase
            || !this.faker.definitions.statistic.reaction) {
                return this.faker.random.randomWords(3);
        } else {
            var data = {
                wholeNumber: this.wholeNumber.bind(this),
                percentage: this.percentage.bind(this),
                reaction: this.reaction.bind(this),
                subject: this.subject.bind(this),
                noun: this.noun.bind(this)
            };
        
            var phrase = this.faker.random.arrayElement(this.faker.definitions.statistic.phrase);
            return this.faker.helpers.mustache(phrase, data);
        }
    }
}

export = Statistic;
