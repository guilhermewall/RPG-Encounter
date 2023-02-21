import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedEntities1673549434893 implements MigrationInterface {
    name = 'updatedEntities1673549434893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" DROP COLUMN "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
