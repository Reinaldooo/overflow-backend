import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRelationWithCalendar1610111061337 implements MigrationInterface {
    name = 'UserRelationWithCalendar1610111061337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "event-user"`);
        await queryRunner.query(`ALTER TABLE "passRecoveryTokens" DROP CONSTRAINT "PassRecoveryToken"`);
        await queryRunner.query(`CREATE TABLE "calendars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_90dc0330e8ec9028e23c290dee8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "calendars_and_users" ("usersId" uuid NOT NULL, "calendarsId" uuid NOT NULL, CONSTRAINT "PK_e03499dfd0a1a0aadfa44e6b7ce" PRIMARY KEY ("usersId", "calendarsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1cb510bbca0bafc6850393b55c" ON "calendars_and_users" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ad2f5d06118cb1fd7ebc3d4622" ON "calendars_and_users" ("calendarsId") `);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "passRecoveryTokens" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "passRecoveryTokens" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "passRecoveryTokens" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "passRecoveryTokens" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "passRecoveryTokens" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "passRecoveryTokens" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calendars_and_users" ADD CONSTRAINT "FK_1cb510bbca0bafc6850393b55c3" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calendars_and_users" ADD CONSTRAINT "FK_ad2f5d06118cb1fd7ebc3d46227" FOREIGN KEY ("calendarsId") REFERENCES "calendars"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendars_and_users" DROP CONSTRAINT "FK_ad2f5d06118cb1fd7ebc3d46227"`);
        await queryRunner.query(`ALTER TABLE "calendars_and_users" DROP CONSTRAINT "FK_1cb510bbca0bafc6850393b55c3"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_9929fa8516afa13f87b41abb263"`);
        await queryRunner.query(`ALTER TABLE "passRecoveryTokens" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "passRecoveryTokens" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "passRecoveryTokens" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "passRecoveryTokens" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "passRecoveryTokens" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "passRecoveryTokens" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`DROP INDEX "IDX_ad2f5d06118cb1fd7ebc3d4622"`);
        await queryRunner.query(`DROP INDEX "IDX_1cb510bbca0bafc6850393b55c"`);
        await queryRunner.query(`DROP TABLE "calendars_and_users"`);
        await queryRunner.query(`DROP TABLE "calendars"`);
        await queryRunner.query(`ALTER TABLE "passRecoveryTokens" ADD CONSTRAINT "PassRecoveryToken" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "event-user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}
