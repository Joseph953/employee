import {MigrationInterface, QueryRunner} from "typeorm";

export class employeeA1657787667916 implements MigrationInterface {
    name = 'employeeA1657787667916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_75ec3f5b3f68f8613ab0dbed286"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "employee_address_id" TO "address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME CONSTRAINT "UQ_75ec3f5b3f68f8613ab0dbed286" TO "UQ_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" FOREIGN KEY ("address_id") REFERENCES "employeeAddress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194" TO "UQ_75ec3f5b3f68f8613ab0dbed286"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "address_id" TO "employee_address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_75ec3f5b3f68f8613ab0dbed286" FOREIGN KEY ("employee_address_id") REFERENCES "employeeAddress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
