import uniqueExec = require('../vendor/unique');

/**
 *
 * @namespace faker.unique
 */
class Unique {
  constructor(private faker: any) { }

  /**
   * unique
   *
   * @method unique
   */
   readonly unique = uniqueExec.exec;
}

export = Unique;
