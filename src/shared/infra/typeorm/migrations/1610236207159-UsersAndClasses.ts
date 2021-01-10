import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersAndClasses1610236207159 implements MigrationInterface {
    name = 'UsersAndClasses1610236207159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "passwd" character varying NOT NULL, "avatar" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tutorId" uuid NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "passRecoveryTokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b4ce50e399ef6130ccf5dcf0437" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classes_and_students" ("usersId" uuid NOT NULL, "classesId" uuid NOT NULL, CONSTRAINT "PK_b9d7afaa7710886fc284f6b218a" PRIMARY KEY ("usersId", "classesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f2eb757331dfb8d7e41d234d1e" ON "classes_and_students" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_677dc2e94291baef670f212311" ON "classes_and_students" ("classesId") `);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_7b209cea031b91a6ebb2b5c941d" FOREIGN KEY ("tutorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes_and_students" ADD CONSTRAINT "FK_f2eb757331dfb8d7e41d234d1e9" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes_and_students" ADD CONSTRAINT "FK_677dc2e94291baef670f2123118" FOREIGN KEY ("classesId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes_and_students" DROP CONSTRAINT "FK_677dc2e94291baef670f2123118"`);
        await queryRunner.query(`ALTER TABLE "classes_and_students" DROP CONSTRAINT "FK_f2eb757331dfb8d7e41d234d1e9"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_7b209cea031b91a6ebb2b5c941d"`);
        await queryRunner.query(`DROP INDEX "IDX_677dc2e94291baef670f212311"`);
        await queryRunner.query(`DROP INDEX "IDX_f2eb757331dfb8d7e41d234d1e"`);
        await queryRunner.query(`DROP TABLE "classes_and_students"`);
        await queryRunner.query(`DROP TABLE "passRecoveryTokens"`);
        await queryRunner.query(`DROP TABLE "classes"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
