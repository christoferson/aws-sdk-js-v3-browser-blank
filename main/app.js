import { Settings } from "./settings.js";

const cognitoSignIn = async () => {

    console.log(Settings.Cognito.UserPoolId);
 
};

window.cognitoSignIn = cognitoSignIn;