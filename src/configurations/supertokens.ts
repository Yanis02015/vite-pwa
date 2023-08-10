import * as reactRouterDom from "react-router-dom";
import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { env } from "./dotenv";
import { defaultTranslation, frTranslation } from "./translation";

export const superTokensRoutes = () => {
  return getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
    EmailPasswordPreBuiltUI,
  ]).map((r) => {
    return r.props;
  });
};

export const superTokensInit = () => {
  SuperTokens.init({
    appInfo: {
      // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
      appName: env.APP_NAME,
      apiDomain: env.API_DOMAINE,
      websiteDomain: env.WEBSITE_DOMAINE,
      apiBasePath: env.apiBasePath,
      websiteBasePath: env.websiteBasePath,
    },
    recipeList: [
      EmailPassword.init({
        getRedirectionURL: async (context) => {
          if (context.action === "SUCCESS") {
            if (context.redirectToPath !== undefined) {
              // we are navigating back to where the user was before they authenticated
              // return '/redirect';
              return context.redirectToPath;
            }
            return "/redirect";
          }
          return undefined;
        },
        signInAndUpFeature: {
          signInForm: {
            style: `
                  [data-supertokens~=headerSubtitle] {
                    display: none;
                  }
                `, // Do not display create new account
          },
        },
        style: `
        [data-supertokens~=container] {
          --palette-primary: 41, 91, 249;
          --palette-primaryBorder: 41, 91, 249;
      }
        `,
      }),
      Session.init(),
    ],
    languageTranslations: {
      translations: {
        fr: {
          ...defaultTranslation,
          ...frTranslation,
        },
      },
      defaultLanguage: "fr",
    },
  });
};
