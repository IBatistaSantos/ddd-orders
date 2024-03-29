import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table({
  tableName: 'customers',
  timestamps: false
})
export class CustomerModel extends Model {

  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false})
  declare name: string;

  @Column({ allowNull: false})
  declare street: string;

  @Column({ allowNull: false})
  declare number: number;

  @Column({ allowNull: false})
  declare zipcode: string;

  @Column({ allowNull: false})
  declare city: string;

  @Column({ allowNull: false})
  declare state: string;

  @Column({ allowNull: false})
  declare active: boolean;

  @Column({ allowNull: false, field: 'reward_points', defaultValue: 0 })
  declare rewardPoints: number;
}