import { Settings } from "./settings.js";
import { ModAws } from "../aws/mod.js";

const CognitoUserPoolCredentials = new ModAws.CognitoUserPoolCredentials();

const SecurityCredentials = new ModAws.Credentials();

const cognitoSignIn = async () => {

    console.log(Settings.Cognito.UserPoolId);
    console.log(CognitoUserPoolCredentials.Authenticated);
    console.log(SecurityCredentials.Authenticated);
 
};

window.cognitoSignIn = cognitoSignIn;