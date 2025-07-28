import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuotesTable1753423826278 implements MigrationInterface {
    name = 'CreateQuotesTable1753423826278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quote" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quote" varchar NOT NULL, "author" varchar(100) NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "quote"`);
    }

}
