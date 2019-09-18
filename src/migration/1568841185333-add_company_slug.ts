import {MigrationInterface, QueryRunner} from "typeorm";

export class addCompanySlug1568841185333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `companies` ADD `slug` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `companies` ADD UNIQUE INDEX `IDX_b28b07d25e4324eee577de5496` (`slug`)");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `role`");
        await queryRunner.query("ALTER TABLE `users` ADD `role` enum ('ROLE_ADMIN', 'ROLE_USER') NOT NULL DEFAULT 'ROLE_USER'");
        await queryRunner.query("ALTER TABLE `user_projects` DROP COLUMN `role`");
        await queryRunner.query("ALTER TABLE `user_projects` ADD `role` enum ('PROJECT_ROLE_GUEST', 'PROJECT_ROLE_DEVELOPER') NOT NULL DEFAULT 'PROJECT_ROLE_DEVELOPER'");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_projects` DROP COLUMN `role`");
        await queryRunner.query("ALTER TABLE `user_projects` ADD `role` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `role`");
        await queryRunner.query("ALTER TABLE `users` ADD `role` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `companies` DROP INDEX `IDX_b28b07d25e4324eee577de5496`");
        await queryRunner.query("ALTER TABLE `companies` DROP COLUMN `slug`");
    }

}
