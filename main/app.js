import { Settings } from "./settings.js";
import { ModAws } from "../aws/mod.js";
import { ModAwsCognito } from "../aws/mod-cognito.js";

const CognitoUserPoolCredentials = new ModAws.CognitoUserPoolCredentials();

const SecurityCredentials = new ModAws.Credentials();

const cognitoSignIn = async () => {

    console.log(Settings.Cognito.UserPoolId);
    console.log(CognitoUserPoolCredentials.Authenticated);
    console.log(SecurityCredentials.Authenticated);

    const modAwsCognito = new ModAwsCognito();
    modAwsCognito.SignIn();
 
};

window.cognitoSignIn = cognitoSignIn;