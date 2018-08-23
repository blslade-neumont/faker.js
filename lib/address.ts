/**
 *
 * @namespace faker.address
 */
class Address {
  constructor(private faker: any) {
    this.Helpers = this.faker.helpers;

    (<any>this.direction).schema = {
      "description": "Generates a direction. Use optional useAbbr bool to return abbrevation",
      "sampleResults": ["Northwest", "South", "SW", "E"]
    };

    (<any>this.cardinalDirection).schema = {
      "description": "Generates a cardinal direction. Use optional useAbbr boolean to return abbrevation",
      "sampleResults": ["North", "South", "E", "W"]
    };

    (<any>this.ordinalDirection).schema = {
      "description": "Generates an ordinal direction. Use optional useAbbr boolean to return abbrevation",
      "sampleResults": ["Northwest", "Southeast", "SW", "NE"]
    };
  }

  private readonly Helpers: any;

  /**
   * Generates random zipcode from format. If format is not specified, the
   * locale's zip format is used.
   *
   * @method faker.address.zipCode
   * @param {String} format
   */
  zipCode(format?: string) {
    // if zip format is not specified, use the zip format defined for the locale
    if (typeof format === 'undefined') {
      var localeFormat = this.faker.definitions.address.postcode;
      if (typeof localeFormat === 'string') {
        format = localeFormat;
      } else {
        format = this.faker.random.arrayElement(localeFormat);
      }
    }
    return this.Helpers.replaceSymbols(format);
  }

  /**
   * Generates a random localized city name. The format string can contain any
   * method provided by faker wrapped in `{{}}`, e.g. `{{name.firstName}}` in
   * order to build the city name.
   *
   * If no format string is provided one of the following is randomly used:
   *
   * * `{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}`
   * * `{{address.cityPrefix}} {{name.firstName}}`
   * * `{{name.firstName}}{{address.citySuffix}}`
   * * `{{name.lastName}}{{address.citySuffix}}`
   *
   * @method faker.address.city
   * @param {Number} format
   */
  city(format?: number) {
    var formats = [
      '{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}',
      '{{address.cityPrefix}} {{name.firstName}}',
      '{{name.firstName}}{{address.citySuffix}}',
      '{{name.lastName}}{{address.citySuffix}}'
    ];

    if (typeof format !== "number") {
      format = this.faker.random.number(formats.length - 1);
    }

    return this.faker.fake(formats[format!]);
  }

  /**
   * Return a random localized city prefix
   * @method faker.address.cityPrefix
   */
  cityPrefix() {
    return this.faker.random.arrayElement(this.faker.definitions.address.city_prefix);
  }

  /**
   * Return a random localized city suffix
   *
   * @method faker.address.citySuffix
   */
  citySuffix() {
    return this.faker.random.arrayElement(this.faker.definitions.address.city_suffix);
  }

  /**
   * Returns a random localized street name
   *
   * @method faker.address.streetName
   */
  streetName() {
      var result;
      var suffix = this.faker.address.streetSuffix();
      if (suffix !== "") {
          suffix = " " + suffix
      }

      switch (this.faker.random.number(1)) {
      case 0:
          result = this.faker.name.lastName() + suffix;
          break;
      case 1:
          result = this.faker.name.firstName() + suffix;
          break;
      }
      return result;
  }

  //
  // TODO: change all these methods that accept a boolean to instead accept an options hash.
  //
  /**
   * Returns a random localized street address
   *
   * @method faker.address.streetAddress
   * @param {Boolean} useFullAddress
   */
  streetAddress(useFullAddress: boolean = false) {
      var address = "";
      switch (this.faker.random.number(2)) {
      case 0:
          address = this.Helpers.replaceSymbolWithNumber("#####") + " " + this.faker.address.streetName();
          break;
      case 1:
          address = this.Helpers.replaceSymbolWithNumber("####") +  " " + this.faker.address.streetName();
          break;
      case 2:
          address = this.Helpers.replaceSymbolWithNumber("###") + " " + this.faker.address.streetName();
          break;
      }
      return useFullAddress ? (address + " " + this.faker.address.secondaryAddress()) : address;
  }

  /**
   * streetSuffix
   *
   * @method faker.address.streetSuffix
   */
  streetSuffix() {
      return this.faker.random.arrayElement(this.faker.definitions.address.street_suffix);
  }

  /**
   * streetPrefix
   *
   * @method faker.address.streetPrefix
   */
  streetPrefix() {
      return this.faker.random.arrayElement(this.faker.definitions.address.street_prefix);
  }

  /**
   * secondaryAddress
   *
   * @method faker.address.secondaryAddress
   */
  secondaryAddress() {
      return this.Helpers.replaceSymbolWithNumber(this.faker.random.arrayElement(
          [
              'Apt. ###',
              'Suite ###'
          ]
      ));
  }

  /**
   * county
   *
   * @method faker.address.county
   */
  county() {
    return this.faker.random.arrayElement(this.faker.definitions.address.county);
  }

  /**
   * country
   *
   * @method faker.address.country
   */
  country() {
    return this.faker.random.arrayElement(this.faker.definitions.address.country);
  }

  /**
   * countryCode
   *
   * @method faker.address.countryCode
   */
  countryCode() {
    return this.faker.random.arrayElement(this.faker.definitions.address.country_code);
  }

  /**
   * state
   *
   * @method faker.address.state
   */
  state() {
      return this.faker.random.arrayElement(this.faker.definitions.address.state);
  }

  /**
   * stateAbbr
   *
   * @method faker.address.stateAbbr
   */
  stateAbbr() {
      return this.faker.random.arrayElement(this.faker.definitions.address.state_abbr);
  }

  /**
   * latitude
   *
   * @method faker.address.latitude
   * @param {Double} max default is 90
   * @param {Double} min default is -90
   */
  latitude(max: number = 90, min: number = -90) {
      return this.faker.random.number({max: max, min:min, precision:0.0001}).toFixed(4);
  }

  /**
   * longitude
   *
   * @method faker.address.longitude
   * @param {Double} max default is 180
   * @param {Double} min default is -180
   */
  longitude(max: number = 180, min: number = -180) {
      return this.faker.random.number({max: max, min:min, precision:0.0001}).toFixed(4);
  }

  /**
   *  direction
   *
   * @method faker.address.direction
   * @param {Boolean} useAbbr return direction abbreviation. defaults to false
   */
  direction(useAbbr: boolean = false) {
    if (!useAbbr) {
      return this.faker.random.arrayElement(this.faker.definitions.address.direction);
    }
    return this.faker.random.arrayElement(this.faker.definitions.address.direction_abbr);
  }

  /**
   * cardinal direction
   *
   * @method faker.address.cardinalDirection
   * @param {Boolean} useAbbr return direction abbreviation. defaults to false
   */
  cardinalDirection(useAbbr: boolean = false) {
    if (!useAbbr) {
      return (
        this.faker.random.arrayElement(this.faker.definitions.address.direction.slice(0, 4))
      );
    }
    return (
      this.faker.random.arrayElement(this.faker.definitions.address.direction_abbr.slice(0, 4))
    );
  }

  /**
   * ordinal direction
   *
   * @method faker.address.ordinalDirection
   * @param {Boolean} useAbbr return direction abbreviation. defaults to false
   */
  ordinalDirection(useAbbr: boolean = false) {
    if (!useAbbr) {
      return (
        this.faker.random.arrayElement(this.faker.definitions.address.direction.slice(4, 8))
      );
    }
    return (
      this.faker.random.arrayElement(this.faker.definitions.address.direction_abbr.slice(4, 8))
    );
  }
}

export = Address;
