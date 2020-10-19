import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class IncludeRelationUserEvent1600376988114
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("events", "user");

    await queryRunner.addColumn(
      "events",
      new TableColumn({
        name: "userId",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "events",
      new TableForeignKey({
        name: "event-user",
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("events", "event-user");
    await queryRunner.dropColumn("events", "userId");
    await queryRunner.addColumn(
      "events",
      new TableColumn({
        name: "user",
        type: "varchar",
      })
    );
  }
}
