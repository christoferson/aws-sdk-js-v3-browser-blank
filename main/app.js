import { Settings } from "./settings.js";
import { ModAws } from "../aws/mod.js";
import { ModAwsCognito } from "../aws/mod-cognito.js";

const CognitoUserPoolCredentials = new ModAws.CognitoUserPoolCredentials();

const SecurityCredentials = new ModAws.Credentials();

const cognitoSignIn = async () => {

    const viewResultElement = document.getElementById("sign_in_result");

    if (CognitoUserPoolCredentials.Authenticated === true) {
        console.error("CognitoSignIn: Already Authenticated.");
        viewResultElement.innerHTML = "<p style='color:orange'>CognitoSignIn: Already Authenticated.</p>";
        return;
    }

    let SignInUserId = document.getElementById("sign_in_request_user_id").value;
    SignInUserId = (SignInUserId)? SignInUserId : Settings.Cognito.UserId;

    console.log(Settings.Cognito.UserPoolId);
    console.log(CognitoUserPoolCredentials.Authenticated);
    console.log(SecurityCredentials.Authenticated);

    const modAwsCognito = new ModAwsCognito();
    const response = await modAwsCognito.SignIn({
        RegionId: Settings.Cognito.Region,
        ClientId: Settings.Cognito.ClientId,
        UserId: SignInUserId,
        Password: Settings.Cognito.Password
    });
 
    console.log(response.Success);

    if (response.Success) {
        CognitoUserPoolCredentials.signin(
            response.IdToken,
            response.AccessToken,
            response.RefreshToken);
        
        viewResultElement.innerHTML = "Success";

        document.getElementById("cognito_user_pool_authenticated").innerHTML = CognitoUserPoolCredentials.Authenticated;
        document.getElementById("cognito_user_pool_access_token").innerHTML = CognitoUserPoolCredentials.AccessToken;
        document.getElementById("cognito_user_pool_id_token").innerHTML = CognitoUserPoolCredentials.IdToken;
    } else {
        viewResultElement.innerHTML = `<p style='color:red'>Error: ${response.ErrorMessage}</p>`

        document.getElementById("cognito_user_pool_authenticated").innerHTML = CognitoUserPoolCredentials.Authenticated;
    }

};

window.cognitoSignIn = cognitoSignIn;