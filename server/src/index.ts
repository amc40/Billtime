import * as dotenv from "dotenv";
console.log(dotenv.config({ path: ".env" }));
import * as express from "express"
import * as cors from "cors";
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { WorkPerformed } from "./entity/WorkPerformed"
import { Staff } from "./entity/Staff"
import { CompanyClient } from "./entity/CompanyClient"
import { ContactInformation } from "./entity/ContactInformation"
import { Client } from "./entity/Client"
import { WorkType } from "./entity/WorkType";

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    const corsOptions = {
        // TODO: configure per environment
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    app.use(cors(corsOptions))

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(3001)

    const alan = await AppDataSource.manager.save(
        AppDataSource.manager.create(Staff, {
            staffNumber: 1,
            firstName: "Alan",
            surname: "Chodyniecki",
            staffType: "ACCOUNTANT",
            hourlyRatePence: 1000
        })
    );

    const contactInformation = await AppDataSource.manager.save(
        AppDataSource.manager.create(ContactInformation, {
            contactAddressLine1: "Flat 4",
            contactAddressLine2: "332 Alexandra Park Road",
            contactAddressPostcode: "N22 7BD",
            mobilePhoneNumber: "07551261631",
            personalEmailAddress: "alan.chody@gmail.com",
        })
    );

    const businessClient = await AppDataSource.manager.save(
        AppDataSource.manager.create(Client, {
            referenceNumber: 1,
            clientType: "COMPANY",
        })
    )

    const businessCompanyClient = await AppDataSource.manager.save(
        AppDataSource.manager.create(CompanyClient, {
            referenceNumber: 1,
            client: businessClient,
            companyType: "LTD_BY_SHARES",
            name: "Business",
            companyRegistration: "blah",
            companyAuthenticationCodeEncypted: "asdjnasdkjnasdkjnasjkdnaskjdnk",
            contactInformation,
            incorporationDate: new Date(),
            annualReturnDate: new Date(),
            inTaxCalc: false,
            hasTradingSage: true,
            inHmrcTax: true,
        })
    )

    const workType = await AppDataSource.manager.save(
        AppDataSource.manager.create(WorkType, {
            workCode: "TR01",
            workName: "Tax Return"
        })
    )

    // insert new users for test
    await AppDataSource.manager.save(
        AppDataSource.manager.create(WorkPerformed, {
            staff: alan,
            client: businessClient,
            durationInMins: 120,
            workType,
        })
    )

    console.log("Express server has started on port 3001.")

}).catch(error => console.log(error))
