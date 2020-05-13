import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTokenVersionAdded1587546381242 implements MigrationInterface {
  name = 'UserTokenVersionAdded1587546381242';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "tokenVersion" integer NOT NULL DEFAULT (0), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "email", "password") SELECT "id", "email", "password" FROM "user"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_user" RENAME TO "user"`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME TO "temporary_user"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "email", "password") SELECT "id", "email", "password" FROM "temporary_user"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`, undefined);
  }
}
