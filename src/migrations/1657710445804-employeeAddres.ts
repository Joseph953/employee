import {MigrationInterface, QueryRunner} from "typeorm";

export class employeeAddres1657710445804 implements MigrationInterface {
    name = 'employeeAddres1657710445804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
