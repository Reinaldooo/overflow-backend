import {MigrationInterface, QueryRunner} from "typeorm";

export class EventsRelationWithCalendar1610111513389 implements MigrationInterface {
    name = 'EventsRelationWithCalendar1610111513389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "calendarId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_d34b052f17ba7e1af21ba110bb2" FOREIGN KEY ("calendarId") REFERENCES "calendars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_d34b052f17ba7e1af21ba110bb2"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "calendarId"`);
    }

}
