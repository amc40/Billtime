export interface ContactInformation {
  id: number;
  contactAddressLine1: string;
  contactAddressLine2: string | null;
  contactAddressCountryOrCounty: string | null;
  contactAddressPostcode: string;
  mobilePhoneNumber: string | null;
  homePhoneNumber: string | null;
  workPhoneNumber: string | null;
  personalEmailAddress: string | null;
  workEmailAddress: string | null;
}
