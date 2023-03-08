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


const cognitoGetSecurityCredentials = async () => {

    const viewResultElement = document.getElementById("get_security_credentials_result");

    if (CognitoUserPoolCredentials.Authenticated === false) {
        const msg = "CognitoGetSecurityCredentials: No Active Cognito Session. SignIn first.";
        console.error(msg);
        viewResultElement.innerHTML = `<p style='color:orange'>${msg}</p>`;
        return;
    }

    if (SecurityCredentials.Authenticated === true) {
        const msg = "CognitoGetSecurityCredentials: Credentials Already Active.";
        console.error(msg);
        viewResultElement.innerHTML = `<p style='color:orange'>${msg}</p>`;
        return;
    }

    let SignInUserId = document.getElementById("sign_in_request_user_id").value;
    SignInUserId = (SignInUserId)? SignInUserId : Settings.Cognito.UserId;

    console.log(Settings.Cognito.UserPoolId);
    console.log(CognitoUserPoolCredentials.Authenticated);
    console.log(SecurityCredentials.Authenticated);

    const modAwsCognito = new ModAwsCognito();
    const response = await modAwsCognito.GetSecurityCredentials({
        RegionId: Settings.Cognito.Region,
        IdentityPoolId: Settings.Cognito.Identity.PoolId,
        IdentityLoginProviderId: Settings.Cognito.Identity.LoginProviderId,
        UserPoolIdToken: CognitoUserPoolCredentials.IdToken,
        UserId: SignInUserId,
        Password: Settings.Cognito.Password
    });
 
    console.log(response.Success);

    if (response.Success) {
        SecurityCredentials.signin(
            response.AccessKeyId,
            response.SecretKey,
            response.SessionToken,
            response.Expiration);
        
        viewResultElement.innerHTML = "Success";

        document.getElementById("cognito_identity_pool_access_key_id").innerHTML = SecurityCredentials.AccessKeyId;
        document.getElementById("cognito_identity_pool_secret_key").innerHTML = SecurityCredentials.SecretKey;
        document.getElementById("cognito_identity_pool_session_token").innerHTML = SecurityCredentials.SessionToken;
        document.getElementById("cognito_identity_pool_expiration").innerHTML = SecurityCredentials.Expiration;
    } else {
        viewResultElement.innerHTML = `<p style='color:red'>Error: ${response.ErrorMessage}</p>`

        //document.getElementById("cognito_user_pool_authenticated").innerHTML = CognitoUserPoolCredentials.Authenticated;
    }

};

window.cognitoSignIn = cognitoSignIn;
window.cognitoGetSecurityCredentials = cognitoGetSecurityCredentials;