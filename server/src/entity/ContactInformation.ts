import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class ContactInformation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    contactAddressLine1: string;
    
    @Column({
        nullable: true
    })
    contactAddressLine2: string | null;
    
    @Column({
        nullable: true
    })
    contactAddressCountryOrCounty: string | null;

    @Column()
    contactAddressPostcode: string;

    @Column({
        nullable: true
    })
    mobilePhoneNumber: string | null;

    @Column({
        nullable: true
    })
    homePhoneNumber: string | null;
    
    @Column({
        nullable: true
    })
    workPhoneNumber: string | null;

    @Column({
        nullable: true
    })
    personalEmailAddress: string | null;

    @Column({
        nullable: true
    })
    workEmailAddress: string | null;
    
}