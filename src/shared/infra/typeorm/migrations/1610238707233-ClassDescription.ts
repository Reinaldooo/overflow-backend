import {MigrationInterface, QueryRunner} from "typeorm";

export class ClassDescription1610238707233 implements MigrationInterface {
    name = 'ClassDescription1610238707233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes" ADD "description" character varying(200)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "description"`);
    }

}
