import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAdminOption1610289391025 implements MigrationInterface {
    name = 'UserAdminOption1610289391025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "admin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "admin"`);
    }

}
