import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class WorkType {
  @PrimaryColumn()
  workCode: string;

  @Column()
  workName: string;

  @Column({
    type: 'real'
  })
  workHourlyRateMultiplier = 1;
}