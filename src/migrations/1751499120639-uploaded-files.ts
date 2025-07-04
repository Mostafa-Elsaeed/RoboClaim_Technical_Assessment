import { MigrationInterface, QueryRunner } from 'typeorm';

export class UploadedFiles1751499120639 implements MigrationInterface {
  name = 'UploadedFiles1751499120639';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE  "user_management"."uploaded_files" ("createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "originalName" character varying NOT NULL, "storedName" character varying NOT NULL, "path" character varying NOT NULL, "size" integer NOT NULL, "mimetype" character varying NOT NULL, "extractedText" text, CONSTRAINT "PK_2316d5dcd40d286bf10bdd3ebf2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_management"."uploaded_files"`);
  }
}
