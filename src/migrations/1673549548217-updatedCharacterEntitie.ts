import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedCharacterEntitie1673549548217 implements MigrationInterface {
    name = 'updatedCharacterEntitie1673549548217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "UQ_7c1bf02092d401b55ecc243ef1f" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_7c1bf02092d401b55ecc243ef1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_7c1bf02092d401b55ecc243ef1f"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "UQ_7c1bf02092d401b55ecc243ef1f"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP COLUMN "userId"`);
    }

}
