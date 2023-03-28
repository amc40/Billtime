import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";
import { Staff } from "./Staff";
import { WorkGroup } from "./WorkGroup";
import { WorkType } from "./WorkType";

@Entity()
export class WorkPerformed {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Staff)
  staff: Staff;
  
  @ManyToOne(() => Client)
  client: Client;

  @ManyToOne(() => WorkType)
  workType: WorkType;

  @Column()
  durationInMins: number;

  @ManyToOne(() => WorkGroup)
  workGroup: WorkGroup | null;

  // TODO: add in disbursemnts

}