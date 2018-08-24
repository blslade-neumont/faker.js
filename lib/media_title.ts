/**
 *
 * @namespace faker.media_title
 */
class MediaTitle {
    constructor(private faker: any) { }

    /**
     * author
     *
     * @method faker.media_title.author
     */
    author() {
        return this.faker.random.arrayElement(this.faker.definitions.media_title.author);
    }

    /**
     * verb
     *
     * @method faker.media_title.verb
     */
    verb() {
        return this.faker.random.arrayElement(this.faker.definitions.media_title.verb);
    }

    /**
     * adjective
     *
     * @method faker.media_title.adjective
     */
    adjective() {
        return this.faker.random.arrayElement(this.faker.definitions.media_title.adjective);
    };

    /**
     * phrase
     *
     * @method faker.media_title.phrase
     */
    phrase() {
        if(!this.faker.definitions.media_title 
            || !this.faker.definitions.media_title.verb
            || !this.faker.definitions.media_title.adjective
            || !this.faker.definitions.media_title.phrase) {
                return this.faker.random.words(3);
        } else {
            var data = {
                adjective: this.adjective.bind(this),
                verb: this.verb.bind(this),
                author: this.author.bind(this)
            };
        
            var phrase = this.faker.random.arrayElement(this.faker.definitions.media_title.phrase);
            return this.faker.helpers.mustache(phrase, data);
        }
    }
}

export = MediaTitle;
