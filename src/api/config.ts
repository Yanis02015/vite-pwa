import ky from "ky";
import { isDev } from "@/utils/functions";
import { env } from "@/configurations/dotenv";

const prefixUrl = env.API_DOMAINE;
let credentials: RequestCredentials = "same-origin";
if (isDev()) {
  credentials = "include";
}

export const MakeRequest = ky.create({
  prefixUrl,
  credentials,
  hooks: {
    beforeError: [
      async (error) => {
        console.log("config.ts :");
        console.log(error);

        const { response } = error;
        if (response && response.body) {
          let message;
          try {
            message = (await response.json()).error;
          } catch (error) {
            message = undefined;
          }
          error.name = "PosyameError";
          error.message = `${message} (${response.status})`;
        }
        return error;
      },
    ],
  },
});
