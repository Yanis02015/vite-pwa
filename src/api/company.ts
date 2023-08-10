import { CompanyState } from "@/types/state";
import { MakeRequest } from "./config";

export const createCompany = async (company: CompanyState) => {
  if (
    !company.Email ||
    !company.Firstname ||
    !company.Lastname ||
    !company.Name
  )
    throw new Error("Tous les champs doivent être saisi");
  if (!company.Country) throw new Error("Aucun pays selectionner");
  return MakeRequest.post("company", {
    json: company,
  }).json();
};

export const verifyEmailCompany = async (email: string) => {
  if (!email) throw new Error("L'email ne peut pas être vide");
  return MakeRequest.post("company/verify-email", {
    json: { email },
  }).json();
};
