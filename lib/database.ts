/**
 *
 * @namespace faker.database
 */
class Database {
  constructor(private faker: any) {
    (<any>this.column).schema = {
      "description": "Generates a column name.",
      "sampleResults": ["id", "title", "createdAt"]
    };

    (<any>this.type).schema = {
      "description": "Generates a column type.",
      "sampleResults": ["byte", "int", "varchar", "timestamp"]
    };

    (<any>this.collation).schema = {
      "description": "Generates a collation.",
      "sampleResults": ["utf8_unicode_ci", "utf8_bin"]
    };

    (<any>this.engine).schema = {
      "description": "Generates a storage engine.",
      "sampleResults": ["MyISAM", "InnoDB"]
    };
  }

  /**
   * column
   *
   * @method faker.database.column
   */
  column() {
      return this.faker.random.arrayElement(this.faker.definitions.database.column);
  }

  /**
   * type
   *
   * @method faker.database.type
   */
  type() {
      return this.faker.random.arrayElement(this.faker.definitions.database.type);
  }

  /**
   * collation
   *
   * @method faker.database.collation
   */
  collation() {
      return this.faker.random.arrayElement(this.faker.definitions.database.collation);
  }

  /**
   * engine
   *
   * @method faker.database.engine
   */
  engine() {
      return this.faker.random.arrayElement(this.faker.definitions.database.engine);
  }
}

export = Database;
