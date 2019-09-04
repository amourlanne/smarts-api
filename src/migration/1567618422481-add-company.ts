import {MigrationInterface, QueryRunner} from "typeorm";

export class addCompany1567618422481 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` ADD `companyId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `companies` ADD `name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_6f9395c9037632a31107c8a9e58` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_6f9395c9037632a31107c8a9e58`");
        await queryRunner.query("ALTER TABLE `companies` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `companyId`");
    }

}
