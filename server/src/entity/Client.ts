import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToOne } from "typeorm"
import { CompanyClient } from "./CompanyClient";

type ClientType = "INDIVIDUAL" | "COMPANY";

@Entity()
export class Client {

  @PrimaryColumn()
  referenceNumber: number

  @Column({
    type: "enum",
    enum: ["INDIVIDUAL", "COMPANY"]
  })
  clientType: ClientType;

  @OneToOne(() => CompanyClient, (companyClient) => companyClient.client)
  companyClient: CompanyClient | null;

}