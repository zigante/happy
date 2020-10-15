import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createOrphanages1602687532601 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orphanage',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'nvarchar',
          },
          {
            name: 'latitude',
            type: 'decimal',
            scale: 10,
            precision: 2,
          },
          {
            name: 'longitude',
            type: 'decimal',
            scale: 10,
            precision: 2,
          },
          {
            name: 'about',
            type: 'text',
          },
          {
            name: 'contact',
            type: 'varchar',
          },
          {
            name: 'instructions',
            type: 'text',
          },
          {
            name: 'openOnWeekends',
            type: 'boolean',
            default: false,
          },
          {
            name: 'openingHours',
            type: 'nvarchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanage');
  }
}
