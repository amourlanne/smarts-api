import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserProject1567686486939 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user_projects` (`id` varchar(36) NOT NULL, `role` varchar(255) NOT NULL, `userId` varchar(36) NULL, `projectId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user_projects` ADD CONSTRAINT `FK_8f5f60efe1ef2847c1f36302f1f` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_projects` ADD CONSTRAINT `FK_2320cee7a393cf21d47ce3db753` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_projects` DROP FOREIGN KEY `FK_2320cee7a393cf21d47ce3db753`");
        await queryRunner.query("ALTER TABLE `user_projects` DROP FOREIGN KEY `FK_8f5f60efe1ef2847c1f36302f1f`");
        await queryRunner.query("DROP TABLE `user_projects`");
    }

}
