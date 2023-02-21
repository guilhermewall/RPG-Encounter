import { MigrationInterface, QueryRunner } from "typeorm";

export class createEntities1673531872629 implements MigrationInterface {
    name = 'createEntities1673531872629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "friends" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nick" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_65e1b06a9f379ee5255054021e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "characters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "race" character varying(50) NOT NULL, "class" character varying(50) NOT NULL, "background" character varying(120) NOT NULL, "level" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_9d731e05758f26b9315dac5e378" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "nick" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(120) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "profileImg" character varying NOT NULL DEFAULT 'https://play-lh.googleusercontent.com/0RxUnSidXheeQk4fcFCtjysbE_OX_1IwmKXoSA1w3RZQG0so1JNowmyA4mfH9S1Wih0', "characterId" uuid, CONSTRAINT "UQ_7c154ca1d4ac730c755cfce9b7c" UNIQUE ("nick"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_ae2c93f0ed028430552d39b61e" UNIQUE ("characterId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_campaigns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isOwner" boolean NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "userId" uuid, "campaignId" uuid, CONSTRAINT "PK_bda59265b51e25b420c69708361" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "campaigns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(3000) NOT NULL, "rpgGame" character varying(50) NOT NULL, "campaignImg" character varying NOT NULL DEFAULT 'https://kanto.legiaodosherois.com.br/w760-h398-cfill/wp-content/uploads/2020/08/legiao_9b0AChMUGzL4.jpg.webp', "plataform" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "friends" ADD CONSTRAINT "FK_0c4c4b18d8a52c580213a40c084" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ae2c93f0ed028430552d39b61ed" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_campaigns" ADD CONSTRAINT "FK_77dd185d2e768489d8cc4e6d146" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_campaigns" ADD CONSTRAINT "FK_42b7a47e5197e6d01e3d31d253c" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_campaigns" DROP CONSTRAINT "FK_42b7a47e5197e6d01e3d31d253c"`);
        await queryRunner.query(`ALTER TABLE "users_campaigns" DROP CONSTRAINT "FK_77dd185d2e768489d8cc4e6d146"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ae2c93f0ed028430552d39b61ed"`);
        await queryRunner.query(`ALTER TABLE "friends" DROP CONSTRAINT "FK_0c4c4b18d8a52c580213a40c084"`);
        await queryRunner.query(`DROP TABLE "campaigns"`);
        await queryRunner.query(`DROP TABLE "users_campaigns"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "characters"`);
        await queryRunner.query(`DROP TABLE "friends"`);
    }

}
