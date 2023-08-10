import { createBrowserRouter } from "react-router-dom";
import register from "./auth";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import * as reactRouterDom from "react-router-dom";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";

const superTokensRoutes = () => {
  return getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
    EmailPasswordPreBuiltUI,
  ]).map((r) => {
    return r.props;
  });
};

export const router = () =>
  createBrowserRouter([...superTokensRoutes(), ...register]);
