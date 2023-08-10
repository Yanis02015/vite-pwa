"use client";

import { createCompany, verifyEmailCompany } from "@/api/company";
import { cn } from "@/lib/utils";
import { CompanyState } from "@/types/state";
import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { useState } from "react";
import { Button } from "../ui/button";
import { Combobox } from "../ui/combobox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import { Icons } from "./Icons";
import { countries } from "@/utils/countries";
import { Link } from "react-router-dom";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [step, setStep] = useState(0);
  const [company, setCompany] = useState({} as CompanyState);
  const { toast } = useToast();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step == 0) return mutationVerifyEmail.mutate(company.Email);
    mutationSignup.mutate(company);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCompany((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const mutationVerifyEmail = useMutation({
    mutationFn: verifyEmailCompany,
    onSuccess: () => {
      setStep(1);
    },
    onError: (error: HTTPError) => {
      if (error.message.includes("Email already in use")) {
        error.message = "Email déjà utilisé, choisissez-en un autre ?";
      }
      toast({
        variant: "destructive",
        title: "Oh oh ! Quelque chose s'est mal passé.",
        description: error.message,
      });
    },
  });

  const mutationSignup = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      setStep(2);
    },
    onError: (error: HTTPError) => {
      if (error.message.includes("Email already in use")) {
        error.message = "Email déjà utilisé, choisissez-en un autre ?";
      }
      toast({
        variant: "destructive",
        title: "Oh oh ! Quelque chose s'est mal passé.",
        description: error.message,
      });
    },
  });

  return (
    <>
      {step < 2 ? (
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Créer un compte
          </h1>
          <p className="text-sm text-muted-foreground">
            Entrez vos informations pour créer votre compte
          </p>
        </div>
      ) : (
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Compte créer avec succès!
          </h1>
          <p className="text-sm text-muted-foreground">
            Un e-mail de réinitialisation de mot de passe a été envoyé à{" "}
            <strong>{company.Email}</strong>.{" "}
            <Link
              className="text-blue-600 hover:text-blue-700 hover:underline"
              to={"/auth/reset-password?rid=emailpassword"}
            >
              Renvoyer&nbsp;l'email
            </Link>
          </p>
          <div className="w-full pt-10 pb-3">
            <Icons.check className="m-auto w-[100px] h-[100px] text-green-600 rounded-full border-green-600 border-4 p-3" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Consulter votre adresse email pour activer votre compte
          </h1>
        </div>
      )}
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            {step === 0 ? (
              <div className="grid gap-1 pb-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  required
                  id="email"
                  placeholder="nom@exemple.com"
                  type="email"
                  name="Email"
                  autoCapitalize="none"
                  onChange={handleChange}
                  value={company.Email || ""}
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={mutationVerifyEmail.isLoading}
                />
              </div>
            ) : step === 1 ? (
              <>
                <div className="grid gap-1 pb-1">
                  <Label htmlFor="name">Nom de votre entreprise</Label>
                  <Input
                    required
                    id="name"
                    name="Name"
                    type="text"
                    placeholder="Nom de l'entreprise"
                    autoCapitalize="yes"
                    onChange={handleChange}
                    value={company.Name || ""}
                    autoCorrect="off"
                    disabled={mutationSignup.isLoading}
                  />
                </div>
                <div className="grid gap-1 pb-1">
                  <Label htmlFor="country">Pays</Label>
                  <Combobox
                    disabled={mutationSignup.isLoading}
                    data={countries}
                    placeholder="Selectionner un pays"
                    selected={company.Country}
                    setSelected={(Country) =>
                      setCompany((company) => ({ ...company, Country }))
                    }
                  />
                </div>
                <div className="grid gap-1 pb-1">
                  <Label htmlFor="firstname">Votre nom</Label>
                  <Input
                    required
                    id="firstname"
                    name="Firstname"
                    type="text"
                    placeholder="Nom"
                    onChange={handleChange}
                    value={company.Firstname || ""}
                    autoCorrect="off"
                    disabled={mutationSignup.isLoading}
                  />
                </div>
                <div className="grid gap-1 pb-1">
                  <Label htmlFor="lastname">Votre prénom</Label>
                  <Input
                    required
                    id="lastname"
                    name="Lastname"
                    type="text"
                    placeholder="Prénom"
                    onChange={handleChange}
                    value={company.Lastname || ""}
                    autoCorrect="off"
                    disabled={mutationSignup.isLoading}
                  />
                </div>
              </>
            ) : null}
            {step < 2 ? (
              <div className="grid grid-flow-col-dense gap-4 grid-cols-12">
                {step === 1 && (
                  <Button
                    className="col-span-2 border-solid border-2 hover:bg-gray-200"
                    size="icon"
                    onClick={() => setStep(0)}
                    variant="ghost"
                    disabled={mutationSignup.isLoading}
                  >
                    {mutationSignup.isLoading ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Icons.arrowBack className="h-4 w-4" />
                    )}
                  </Button>
                )}
                <Button
                  type="submit"
                  className="col-span-12"
                  disabled={
                    mutationVerifyEmail.isLoading || mutationSignup.isLoading
                  }
                >
                  {mutationVerifyEmail.isLoading ||
                    (mutationSignup.isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ))}
                  S'inscrire gratuitement
                </Button>
              </div>
            ) : (
              <Link className="col-span-12" to="/auth">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={mutationVerifyEmail.isLoading}
                >
                  Se connecter
                </Button>
              </Link>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
