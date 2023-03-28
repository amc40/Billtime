import "reflect-metadata"
import { DataSource } from "typeorm"
import { Client } from "./entity/Client"
import { CompanyClient } from "./entity/CompanyClient"
import { ContactInformation } from "./entity/ContactInformation"
import { Disbursement } from "./entity/Disbursement"
import { Invoice } from "./entity/Invoice"
import { Staff } from "./entity/Staff"
import { WorkGroup } from "./entity/WorkGroup"
import { WorkPerformed } from "./entity/WorkPerformed"
import { WorkType } from "./entity/WorkType"
import { getRequiredEnv } from "./env"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: getRequiredEnv("DB_HOST"),
    port: 5432,
    username: getRequiredEnv("DB_USERNAME"),
    password: getRequiredEnv("DB_PASSWORD"),
    database: getRequiredEnv("DB_NAME"),
    synchronize: true,
    logging: false,
    entities: [Client, CompanyClient, ContactInformation, Disbursement, Invoice, Staff, WorkGroup, WorkPerformed, WorkType],
    migrations: [],
    subscribers: [],
})
