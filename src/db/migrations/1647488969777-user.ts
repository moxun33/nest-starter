import {MigrationInterface, QueryRunner} from "typeorm";

export class user1647488969777 implements MigrationInterface {
    name = 'user1647488969777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(500) NOT NULL, "nickname" character varying(500), "password" character varying(500) NOT NULL, "mobilePhone" character varying(11), "email" character varying(500) NOT NULL, "isAdmin" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
