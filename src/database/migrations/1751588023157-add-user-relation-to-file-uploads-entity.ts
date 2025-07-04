import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRelationToFileUploadsEntity1751588023157
  implements MigrationInterface
{
  name = 'AddUserRelationToFileUploadsEntity1751588023157';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_management"."uploaded_files" DROP COLUMN "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_management"."uploaded_files" ADD "userId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_management"."uploaded_files" ADD CONSTRAINT "FK_24877d6b527ce7d9f197135165d" FOREIGN KEY ("userId") REFERENCES "user_management"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_management"."uploaded_files" DROP CONSTRAINT "FK_24877d6b527ce7d9f197135165d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_management"."uploaded_files" DROP COLUMN "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_management"."uploaded_files" ADD "userId" character varying NOT NULL`,
    );
  }
}
// 1751588023157-add-user-relation-to-file-uploads-entity.ts
