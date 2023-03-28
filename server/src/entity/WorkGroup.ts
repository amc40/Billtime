import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./Invoice";
import { WorkPerformed } from "./WorkPerformed";
import { WorkType } from "./WorkType";

@Entity()
export class WorkGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amountChargedPence: number;

  // Is 255 chars enough?
  @Column()
  description: string;

  // TODO: possible ensure that all work performed is of work types
  @OneToMany(() => WorkPerformed, (workPerformed) => workPerformed.workGroup)
  workPerformed: WorkPerformed[];

  @ManyToOne(() => WorkType)
  workType: WorkType

  @ManyToOne(() => Invoice)
  invoice: Invoice | null;

  // TODO: this may be an artefact of old implentation
  @Column()
  saved: boolean;

  // TODO: is this just duplicate information of whether in an invoice?
  @Column()
  credited: boolean;
  

}