import { Client } from "./client";
import { ContactInformation } from "./contact-information";

type CompanyType = "LTD_BY_SHARES" | "LTD_BY_GUARANTEE";

export type CompanyClient = Client &
  ContactInformation & {
    referenceNumber: number;
    clientType: "COMPANY";
    name: string;
    companyRegistration: string;
    companyAuthenticationCodeEncypted: string;
    companyType: CompanyType;
    uniqueTaxReference: string | null;
    contactInformation: ContactInformation;
    incorporationDate: Date;
    annualReturnDate: Date;
    inTaxCalc: boolean;
    hasTradingSage: boolean;
    inHmrcTax: boolean;
    archived: boolean;
  };
