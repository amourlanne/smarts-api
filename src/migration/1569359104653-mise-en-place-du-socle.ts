import {MigrationInterface, QueryRunner} from "typeorm";

export class miseEnPlaceDuSocle1569359104653 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `organizations` (`id` varchar(36) NOT NULL, `slug` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `ownerId` varchar(36) NULL, UNIQUE INDEX `IDX_963693341bd612aa01ddf3a4b6` (`slug`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_organizations` (`id` varchar(36) NOT NULL, `role` enum ('ORGANIZATION_ROLE_ADMIN', 'ORGANIZATION_ROLE_USER') NOT NULL DEFAULT 'ORGANIZATION_ROLE_USER', `userId` varchar(36) NULL, `organizationId` varchar(36) NULL, UNIQUE INDEX `IDX_481a3d21c68396d6b180ab9795` (`userId`, `organizationId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` enum ('ROLE_ADMIN', 'ROLE_USER') NOT NULL DEFAULT 'ROLE_USER', `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `activated` tinyint NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `companyId` varchar(36) NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_projects` (`id` varchar(36) NOT NULL, `role` enum ('PROJECT_ROLE_GUEST', 'PROJECT_ROLE_DEVELOPER') NOT NULL DEFAULT 'PROJECT_ROLE_DEVELOPER', `userId` varchar(36) NULL, `projectId` varchar(36) NULL, UNIQUE INDEX `IDX_ae9ffcf485dae3de74d0ae798c` (`userId`, `projectId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `projects` (`id` varchar(36) NOT NULL, `slug` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `companyId` varchar(36) NULL, `ownerId` varchar(36) NULL, `organizationId` varchar(36) NULL, UNIQUE INDEX `IDX_72f01c3b3eed28a8785bf997ea` (`organizationId`, `slug`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `companies` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `organizationId` varchar(36) NULL, UNIQUE INDEX `IDX_b28b07d25e4324eee577de5496` (`slug`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `organizations` ADD CONSTRAINT `FK_cdf778d13ea7fe8095e013e34f0` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_organizations` ADD CONSTRAINT `FK_11d4cd5202bd8914464f4bec379` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_organizations` ADD CONSTRAINT `FK_71997faba4726730e91d514138e` FOREIGN KEY (`organizationId`) REFERENCES `organizations`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_6f9395c9037632a31107c8a9e58` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_projects` ADD CONSTRAINT `FK_8f5f60efe1ef2847c1f36302f1f` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_projects` ADD CONSTRAINT `FK_2320cee7a393cf21d47ce3db753` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `projects` ADD CONSTRAINT `FK_87fa45e3f4517658b98e5c55b9c` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `projects` ADD CONSTRAINT `FK_a8e7e6c3f9d9528ed35fe5bae33` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `projects` ADD CONSTRAINT `FK_eec93fd979bdcf5a0141da324d6` FOREIGN KEY (`organizationId`) REFERENCES `organizations`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `companies` ADD CONSTRAINT `FK_cfa7d558ce458748965fca390d6` FOREIGN KEY (`organizationId`) REFERENCES `organizations`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `companies` DROP FOREIGN KEY `FK_cfa7d558ce458748965fca390d6`");
        await queryRunner.query("ALTER TABLE `projects` DROP FOREIGN KEY `FK_eec93fd979bdcf5a0141da324d6`");
        await queryRunner.query("ALTER TABLE `projects` DROP FOREIGN KEY `FK_a8e7e6c3f9d9528ed35fe5bae33`");
        await queryRunner.query("ALTER TABLE `projects` DROP FOREIGN KEY `FK_87fa45e3f4517658b98e5c55b9c`");
        await queryRunner.query("ALTER TABLE `user_projects` DROP FOREIGN KEY `FK_2320cee7a393cf21d47ce3db753`");
        await queryRunner.query("ALTER TABLE `user_projects` DROP FOREIGN KEY `FK_8f5f60efe1ef2847c1f36302f1f`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_6f9395c9037632a31107c8a9e58`");
        await queryRunner.query("ALTER TABLE `user_organizations` DROP FOREIGN KEY `FK_71997faba4726730e91d514138e`");
        await queryRunner.query("ALTER TABLE `user_organizations` DROP FOREIGN KEY `FK_11d4cd5202bd8914464f4bec379`");
        await queryRunner.query("ALTER TABLE `organizations` DROP FOREIGN KEY `FK_cdf778d13ea7fe8095e013e34f0`");
        await queryRunner.query("DROP INDEX `IDX_b28b07d25e4324eee577de5496` ON `companies`");
        await queryRunner.query("DROP TABLE `companies`");
        await queryRunner.query("DROP INDEX `IDX_72f01c3b3eed28a8785bf997ea` ON `projects`");
        await queryRunner.query("DROP TABLE `projects`");
        await queryRunner.query("DROP INDEX `IDX_ae9ffcf485dae3de74d0ae798c` ON `user_projects`");
        await queryRunner.query("DROP TABLE `user_projects`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP INDEX `IDX_481a3d21c68396d6b180ab9795` ON `user_organizations`");
        await queryRunner.query("DROP TABLE `user_organizations`");
        await queryRunner.query("DROP INDEX `IDX_963693341bd612aa01ddf3a4b6` ON `organizations`");
        await queryRunner.query("DROP TABLE `organizations`");
    }

}
