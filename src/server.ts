import { authRoute } from "./api/auth/auth.route";
import { App } from "./app";
import { ValidateEnv } from "@app/utils";

ValidateEnv();

const app = new App([
  authRoute
]);

app.listen();