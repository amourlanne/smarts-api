import {MigrationInterface, QueryRunner} from "typeorm";

export class miseEnPlaceDuSocle1567599071173 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `projects` (`id` varchar(36) NOT NULL, `slug` varchar(255) NOT NULL, `companyId` varchar(36) NULL, UNIQUE INDEX `IDX_96e045ab8b0271e5f5a91eae1e` (`slug`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `companies` (`id` varchar(36) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `application_settings` (`id` int NOT NULL AUTO_INCREMENT, `companyId` varchar(36) NULL, UNIQUE INDEX `REL_14a33c4912ab39a4e6b642526d` (`companyId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `activated` tinyint NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `projects` ADD CONSTRAINT `FK_87fa45e3f4517658b98e5c55b9c` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `application_settings` ADD CONSTRAINT `FK_14a33c4912ab39a4e6b642526dd` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `application_settings` DROP FOREIGN KEY `FK_14a33c4912ab39a4e6b642526dd`");
        await queryRunner.query("ALTER TABLE `projects` DROP FOREIGN KEY `FK_87fa45e3f4517658b98e5c55b9c`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP INDEX `REL_14a33c4912ab39a4e6b642526d` ON `application_settings`");
        await queryRunner.query("DROP TABLE `application_settings`");
        await queryRunner.query("DROP TABLE `companies`");
        await queryRunner.query("DROP INDEX `IDX_96e045ab8b0271e5f5a91eae1e` ON `projects`");
        await queryRunner.query("DROP TABLE `projects`");
    }

}
