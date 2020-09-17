import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEvent1600359117467 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // `uuid_generate_v4()` extension must be activated on db.
    // CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
    await queryRunner.createTable(
      new Table({
        name: "events",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "user",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "date",
            type: "timestamp with time zone",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("events");
  }
}
