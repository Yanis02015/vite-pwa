import { SuperTokensWrapper as SuperTokens } from "supertokens-auth-react";
import { EmailPasswordComponentsOverrideProvider } from "supertokens-auth-react/recipe/emailpassword";
import EmailPasswordComponentsOverride from "./EmailPasswordComponentsOverride";

export default function SuperTokensWrapper({
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <SuperTokens>
      <EmailPasswordComponentsOverrideProvider
        components={{
          // In this case, the <EmailPasswordSignIn_Override>
          // will render the original component
          // wrapped in a div with an octocat picture above it.
          EmailPasswordSignIn_Override: ({ DefaultComponent, ...props }) => {
            return (
              <EmailPasswordComponentsOverride
                DefaultComponent={<DefaultComponent {...props} />}
              />
            );
          },
          EmailPasswordResetPasswordEmail_Override: ({
            DefaultComponent,
            ...props
          }) => {
            return (
              <EmailPasswordComponentsOverride
                DefaultComponent={<DefaultComponent {...props} />}
              />
            );
          },
          EmailPasswordSubmitNewPassword_Override: ({
            DefaultComponent,
            ...props
          }) => {
            return (
              <EmailPasswordComponentsOverride
                DefaultComponent={<DefaultComponent {...props} />}
              />
            );
          },
        }}
      >
        {children}
      </EmailPasswordComponentsOverrideProvider>
    </SuperTokens>
  );
}
