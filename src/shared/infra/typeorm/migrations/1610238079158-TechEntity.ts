import {MigrationInterface, QueryRunner} from "typeorm";

export class TechEntity1610238079158 implements MigrationInterface {
    name = 'TechEntity1610238079158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "techs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8ab2729ee26c5893090fb7b1b2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classes_and_techs" ("techsId" uuid NOT NULL, "classesId" uuid NOT NULL, CONSTRAINT "PK_62192fa01c75f6677c54507f5f0" PRIMARY KEY ("techsId", "classesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_37937096c57ac5ca8733a27935" ON "classes_and_techs" ("techsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_acd3368b3718c0f4d5b8478da0" ON "classes_and_techs" ("classesId") `);
        await queryRunner.query(`ALTER TABLE "classes_and_techs" ADD CONSTRAINT "FK_37937096c57ac5ca8733a279353" FOREIGN KEY ("techsId") REFERENCES "techs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes_and_techs" ADD CONSTRAINT "FK_acd3368b3718c0f4d5b8478da04" FOREIGN KEY ("classesId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes_and_techs" DROP CONSTRAINT "FK_acd3368b3718c0f4d5b8478da04"`);
        await queryRunner.query(`ALTER TABLE "classes_and_techs" DROP CONSTRAINT "FK_37937096c57ac5ca8733a279353"`);
        await queryRunner.query(`DROP INDEX "IDX_acd3368b3718c0f4d5b8478da0"`);
        await queryRunner.query(`DROP INDEX "IDX_37937096c57ac5ca8733a27935"`);
        await queryRunner.query(`DROP TABLE "classes_and_techs"`);
        await queryRunner.query(`DROP TABLE "techs"`);
    }

}
