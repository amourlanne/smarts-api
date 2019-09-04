import {MigrationInterface, QueryRunner} from "typeorm";

export class addProjectName1567618946312 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `projects` ADD `name` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `projects` DROP COLUMN `name`");
    }

}
