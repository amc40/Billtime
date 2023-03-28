import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Disbursement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  costPennies: number;

}