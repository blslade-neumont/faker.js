/**
 *
 * @namespace faker.image
 */
class Image {
  constructor(private faker: any) { }

  /**
   * image
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.image
   */
  image(width?: number, height?: number, randomize?: boolean) {
    var categories = ["abstract", "animals", "business", "cats", "city", "food", "nightlife", "fashion", "people", "nature", "sports", "technics", "transport"];
    return (<any>this)[this.faker.random.arrayElement(categories)](width, height, randomize);
  }
  /**
   * avatar
   *
   * @method faker.image.avatar
   */
  avatar() {
    return this.faker.internet.avatar();
  };
  /**
   * imageUrl
   *
   * @param {number} width
   * @param {number} height
   * @param {string} category
   * @param {boolean} randomize
   * @method faker.image.imageUrl
   */
  imageUrl(width: number = 640, height: number = 480, category?: string, randomize: boolean = false, https: boolean = false) {
      var protocol = 'http://';
      if (https) {
        protocol = 'https://';
      }
      var url = protocol + 'lorempixel.com/' + width + '/' + height;
      if (typeof category !== 'undefined') {
        url += '/' + category;
      }

      if (randomize) {
        url += '?' + this.faker.random.number()
      }

      return url;
  }
  /**
   * abstract
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.abstract
   */
  abstract(width?: number, height?: number, randomize?: boolean) {
    return this.faker.image.imageUrl(width, height, 'abstract', randomize);
  }
  /**
   * animals
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.animals
   */
  animals(width?: number, height?: number, randomize?: boolean) {
    return this.faker.image.imageUrl(width, height, 'animals', randomize);
  }
  /**
   * business
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.business
   */
  business(width?: number, height?: number, randomize?: boolean) {
    return this.faker.image.imageUrl(width, height, 'business', randomize);
  }
  /**
   * cats
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.cats
   */
  cats(width?: number, height?: number, randomize?: boolean) {
    return this.faker.image.imageUrl(width, height, 'cats', randomize);
  }
  /**
   * city
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.city
   */
  city(width?: number, height?: number, randomize?: boolean) {
    return this.faker.image.imageUrl(width, height, 'city', randomize);
  }
  /**
   * food
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.food
   */
  food(width?: number, height?: number, randomize?: boolean) {
    return this.faker.image.imageUrl(width, height, 'food', randomize);
  }
  /**
   * nightlife
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.nightlife
   */
  nightlife(width?: number, height?: number, randomize?: boolean) {
    return this.faker.image.imageUrl(width, height, 'nightlife', randomize);
  }
  /**
   * fashion
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.fashion
   */
  fashion(width?: number, height?: number, randomize?: boolean) {
    return this.faker.image.imageUrl(width, height, 'fashion', randomize);
  }
  /**
   * people
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.people
   */
  people(width?: number, height?: number, randomize?: boolean) {
    return this.faker.image.imageUrl(width, height, 'people', randomize);
  }
  /**
   * nature
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.nature
   */
  nature(width?: number, height?: number, randomize?: boolean) {
    return this.faker.image.imageUrl(width, height, 'nature', randomize);
  }
  /**
   * sports
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.sports
   */
  sports(width?: number, height?: number, randomize?: boolean) {
    return this.faker.image.imageUrl(width, height, 'sports', randomize);
  }
  /**
   * technics
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.technics
   */
  technics(width?: number, height?: number, randomize?: boolean) {
    return this.faker.image.imageUrl(width, height, 'technics', randomize);
  }
  /**
   * transport
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.transport
   */
  transport(width?: number, height?: number, randomize?: boolean) {
    return this.faker.image.imageUrl(width, height, 'transport', randomize);
  }
  /**
   * dataUri
   *
   * @param {number} width
   * @param {number} height
   * @method faker.image.dataurl
   */
  dataUri(width?: number, height?: number) {
    var rawPrefix = 'data:image/svg+xml;charset=UTF-8,';
    var svgString = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="' + width + '" height="' + height + '"> <rect width="100%" height="100%" fill="grey"/>  <text x="0" y="20" font-size="20" text-anchor="start" fill="white">' + width + 'x' + height + '</text> </svg>';
    return rawPrefix + encodeURIComponent(svgString);
  }
}

export = Image;
