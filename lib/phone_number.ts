/**
 *
 * @namespace faker.phone
 */
class Phone {
  constructor(private faker: any) { }

  /**
   * phoneNumber
   *
   * @method faker.phone.phoneNumber
   * @param {string} format
   */
  phoneNumber(format: string) {
      format = format || this.faker.phone.phoneFormats();
      return this.faker.helpers.replaceSymbolWithNumber(format);
  }

  // FIXME: this is strange passing in an array index.
  /**
   * phoneNumberFormat
   *
   * @method faker.phone.phoneFormatsArrayIndex
   * @param phoneFormatsArrayIndex
   */
  phoneNumberFormat(phoneFormatsArrayIndex?: number) {
      phoneFormatsArrayIndex = phoneFormatsArrayIndex || 0;
      return this.faker.helpers.replaceSymbolWithNumber(this.faker.definitions.phone_number.formats[phoneFormatsArrayIndex]);
  }

  /**
   * phoneFormats
   *
   * @method faker.phone.phoneFormats
   */
  phoneFormats() {
    return this.faker.random.arrayElement(this.faker.definitions.phone_number.formats);
  }
}

export = Phone;
