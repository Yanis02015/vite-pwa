import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/my/UserAuthForm";
import LogoWhite from "@/assets/logo-white.png";

export default function Register() {
  return (
    <>
      <div className="container relative h-[max(100vh,_800px)] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/auth"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Se connecter
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img src={LogoWhite} alt="posyame logo" width={130} />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Cette application a été réalisée par un commerçant pour
                des commerçants, conçue pour vous faire gagner du temps dans
                votre activité et vous concentrer sur l'essentiel..&rdquo;
              </p>
              <footer className="text-sm">Yanis Oulhaci</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              En vous inscrivant, vous acceptez nos{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Conditions d'utilisation
              </Link>{" "}
              et notre{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
