import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { Client } from "./Client";
import { ContactInformation } from "./ContactInformation";
import { flattenModel } from "./utils/flatten-model";

export type CompanyType = "LTD_BY_SHARES" | "LTD_BY_GUARANTEE";

// TODO: add foreign key enforcing that client and client type are in client table

@Entity()
export class CompanyClient {

    @PrimaryColumn()
    referenceNumber: number
    
    @OneToOne(() => Client)
    @JoinColumn()
    client: Client

    @Column({
        type: 'enum',
        enum: ['COMPANY']
    })
    clientType = "COMPANY"

    @Column()
    name: string

    @Column()
    companyRegistration: string;

    @Column()
    companyAuthenticationCodeEncypted: string;

    @Column({
        type: "enum",
        enum: ["LTD_BY_SHARES", "LTD_BY_GUARANTEE"]
    })
    companyType: CompanyType;

    @Column({
        nullable: true
    })
    uniqueTaxReference: string | null;

    @ManyToOne(type => ContactInformation) @JoinColumn() 
    contactInformation: ContactInformation;

    @Column({ type: 'timestamptz' })
    incorporationDate: Date

    @Column({ type: 'timestamptz' })
    annualReturnDate: Date

    @Column()
    inTaxCalc: boolean;

    @Column()
    hasTradingSage: boolean

    @Column()
    inHmrcTax: boolean;

    @Column()
    archived: boolean = false;
    
}

export const flattenCompanyClient = (companyClient: CompanyClient) => flattenModel(companyClient, ["client", "contactInformation"]);