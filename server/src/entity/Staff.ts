import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

// TODO: fill in
type StaffType = "ACCOUNTANT";

@Entity()
export class Staff {
    @PrimaryColumn()
    staffNumber: number;

    @Column({
      type: "enum",
      // TODO: change to match StaffType
      enum: ["ACCOUNTANT"]
    })
    staffType: StaffType;

    @Column()
    hourlyRatePence: number;
    
    @Column()
    firstName: string;
    
    @Column({
      nullable: true
    })
    middleNames: string | null;

    @Column()
    surname: string;
}