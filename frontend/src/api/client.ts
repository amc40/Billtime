type ClientType = "INDIVIDUAL" | "COMPANY";

export interface Client {
  referenceNumber: number;
  clientType: ClientType;
}
