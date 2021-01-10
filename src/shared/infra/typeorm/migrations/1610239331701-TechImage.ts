import {MigrationInterface, QueryRunner} from "typeorm";

export class TechImage1610239331701 implements MigrationInterface {
    name = 'TechImage1610239331701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "techs" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "techs" DROP COLUMN "image"`);
    }

}
