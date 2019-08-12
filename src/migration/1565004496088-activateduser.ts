import {MigrationInterface, QueryRunner} from "typeorm";

export class activateduser1565004496088 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `createdAt` `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` CHANGE `updatedAt` `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `updatedAt` `updatedAt` datetime(6) NOT NULL DEFAULT 'current_timestamp(6)'");
        await queryRunner.query("ALTER TABLE `user` CHANGE `createdAt` `createdAt` datetime(6) NOT NULL DEFAULT 'current_timestamp(6)'");
    }

}
