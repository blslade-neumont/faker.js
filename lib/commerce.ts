/**
 *
 * @namespace faker.commerce
 */
class Commerce {
  constructor(private faker: any) { }

  /**
   * color
   *
   * @method faker.commerce.color
   */
  color() {
      return this.faker.random.arrayElement(this.faker.definitions.commerce.color);
  }

  /**
   * department
   *
   * @method faker.commerce.department
   */
  department() {
      return this.faker.random.arrayElement(this.faker.definitions.commerce.department);
  }

  /**
   * productName
   *
   * @method faker.commerce.productName
   */
  productName() {
      return this.faker.commerce.productAdjective() + " " +
              this.faker.commerce.productMaterial() + " " +
              this.faker.commerce.product();
  }

  /**
   * price
   *
   * @method faker.commerce.price
   * @param {number} min
   * @param {number} max
   * @param {number} dec
   * @param {string} symbol
   *
   * @return {string}
   */
  price(min: number = 1, max: number = 1000, dec: number = 2, symbol: string = '') {
      if (min < 0 || max < 0) {
          return symbol + 0.00;
      }

      var randValue = this.faker.random.number({ max: max, min: min });

      return symbol + (Math.round(randValue * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec);
  }

  /**
   * productAdjective
   *
   * @method faker.commerce.productAdjective
   */
  productAdjective() {
      return this.faker.random.arrayElement(this.faker.definitions.commerce.product_name.adjective);
  }

  /**
   * productMaterial
   *
   * @method faker.commerce.productMaterial
   */
  productMaterial() {
      return this.faker.random.arrayElement(this.faker.definitions.commerce.product_name.material);
  }

  /**
   * product
   *
   * @method faker.commerce.product
   */
  product() {
      return this.faker.random.arrayElement(this.faker.definitions.commerce.product_name.product);
  }
}

export = Commerce;
