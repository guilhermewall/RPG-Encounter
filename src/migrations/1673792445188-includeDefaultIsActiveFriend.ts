import { MigrationInterface, QueryRunner } from "typeorm";

export class includeDefaultIsActiveFriend1673792445188 implements MigrationInterface {
    name = 'includeDefaultIsActiveFriend1673792445188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friends" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friends" DROP COLUMN "isActive"`);
    }

}
