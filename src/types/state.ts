import { Company } from "./models";

export type CompanyState = Omit<
  Company,
  "ID" | "Roles" | "CreatedAt" | "UpdatedAt"
>;
