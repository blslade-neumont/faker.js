/**
 *
 * @namespace faker.date
 */
class _Date {
  constructor(private faker: any) { }

  /**
   * past
   *
   * @method faker.date.past
   * @param {number} years
   * @param {date} refDate
   */
  past(years: number = 1, refDate?: string) {
      var date = (refDate) ? new Date(Date.parse(refDate)) : new Date();
      var range = {
        min: 1000,
        max: years * 365 * 24 * 3600 * 1000
      };

      var past = date.getTime();
      past -= this.faker.random.number(range); // some time from now to N years ago, in milliseconds
      date.setTime(past);

      return date;
  }

  /**
   * future
   *
   * @method faker.date.future
   * @param {number} years
   * @param {date} refDate
   */
  future(years: number = 1, refDate?: string) {
      var date = (refDate) ? new Date(Date.parse(refDate)) : new Date();
      var range = {
        min: 1000,
        max: years * 365 * 24 * 3600 * 1000
      };

      var future = date.getTime();
      future += this.faker.random.number(range); // some time from now to N years later, in milliseconds
      date.setTime(future);

      return date;
  }

  /**
   * between
   *
   * @method faker.date.between
   * @param {date} from
   * @param {date} to
   */
  between(from: string, to: string) {
      var fromMilli = Date.parse(from);
      var dateOffset = this.faker.random.number(Date.parse(to) - fromMilli);

      var newDate = new Date(fromMilli + dateOffset);

      return newDate;
  }

  /**
   * recent
   *
   * @method faker.date.recent
   * @param {number} days
   */
  recent(days: number = 1) {
      var date = new Date();
      var range = {
        min: 1000,
        max: days * 24 * 3600 * 1000
      };

      var future = date.getTime();
      future -= this.faker.random.number(range); // some time from now to N days ago, in milliseconds
      date.setTime(future);

      return date;
  }

  /**
   * soon
   *
   * @method faker.date.soon
   * @param {number} days
   */
  soon(days: number = 1) {
      var date = new Date();
      var range = {
        min: 1000,
        max: days * 24 * 3600 * 1000
      };

      var future = date.getTime();
      future += this.faker.random.number(range); // some time from now to N days later, in milliseconds
      date.setTime(future);

      return date;
  }

  /**
   * month
   *
   * @method faker.date.month
   * @param {object} options
   */
  month(options: { abbr?: boolean, context?: boolean } = {}) {
      var type = 'wide';
      if (options.abbr) {
          type = 'abbr';
      }
      if (options.context && typeof this.faker.definitions.date.month[type + '_context'] !== 'undefined') {
          type += '_context';
      }

      var source = this.faker.definitions.date.month[type];

      return this.faker.random.arrayElement(source);
  }

  /**
   * weekday
   *
   * @param {object} options
   * @method faker.date.weekday
   */
  weekday(options: { abbr?: boolean, context?: boolean } = {}) {
      var type = 'wide';
      if (options.abbr) {
          type = 'abbr';
      }
      if (options.context && typeof this.faker.definitions.date.weekday[type + '_context'] !== 'undefined') {
          type += '_context';
      }

      var source = this.faker.definitions.date.weekday[type];

      return this.faker.random.arrayElement(source);
  }
}

export = _Date;
