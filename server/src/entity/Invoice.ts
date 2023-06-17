import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";
import { WorkGroup } from "./WorkGroup";

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  allocationDate: Date;

  @ManyToOne(() => Client)
  client: Client;

  @Column({ type: 'date', nullable: true })
  completedDate: Date | null;

  @OneToMany(() => WorkGroup, (workGroup) => workGroup.invoice)
  workGroups: WorkGroup[];

}