import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedEntitiesUserCharacters1673552830318 implements MigrationInterface {
    name = 'updatedEntitiesUserCharacters1673552830318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ae2c93f0ed028430552d39b61ed"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "REL_ae2c93f0ed028430552d39b61e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "characterId"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_7c1bf02092d401b55ecc243ef1f"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "UQ_7c1bf02092d401b55ecc243ef1f"`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_7c1bf02092d401b55ecc243ef1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_7c1bf02092d401b55ecc243ef1f"`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "UQ_7c1bf02092d401b55ecc243ef1f" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_7c1bf02092d401b55ecc243ef1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD "characterId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "REL_ae2c93f0ed028430552d39b61e" UNIQUE ("characterId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ae2c93f0ed028430552d39b61ed" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
