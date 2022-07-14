import {MigrationInterface, QueryRunner} from "typeorm";

export class employeeAddr1657716052456 implements MigrationInterface {
    name = 'employeeAddr1657716052456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "roll" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "roll"`);
    }

}
