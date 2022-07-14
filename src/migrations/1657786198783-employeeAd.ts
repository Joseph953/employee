import {MigrationInterface, QueryRunner} from "typeorm";

export class employeeAd1657786198783 implements MigrationInterface {
    name = 'employeeAd1657786198783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "roll" TO "role"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "role" TO "roll"`);
    }

}
