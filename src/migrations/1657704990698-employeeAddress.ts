import {MigrationInterface, QueryRunner} from "typeorm";

export class employeeAddress1657704990698 implements MigrationInterface {
    name = 'employeeAddress1657704990698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employeeAddress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, CONSTRAINT "PK_ac3d45d4ca345abf2de9a4f6f8c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_75ec3f5b3f68f8613ab0dbed286" UNIQUE ("employee_address_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_75ec3f5b3f68f8613ab0dbed286" FOREIGN KEY ("employee_address_id") REFERENCES "employeeAddress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_75ec3f5b3f68f8613ab0dbed286"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_75ec3f5b3f68f8613ab0dbed286"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "username"`);
        await queryRunner.query(`DROP TABLE "employeeAddress"`);
    }

}
