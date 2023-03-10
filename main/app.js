import { Settings } from "./settings.js";
import { ModAws } from "../aws/mod.js";
import { ModAwsCognito } from "../aws/mod-cognito.js";

import { ModAwsS3 } from "../aws/mod-s3.js";

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
    }

};


const s3ListBucketObjects = async () => {

    const viewResultElement = document.getElementById("s3_list_bucket_objects_result");

    if (CognitoUserPoolCredentials.Authenticated === false) {
        const msg = "CognitoGetSecurityCredentials: No Active Cognito Session. SignIn first.";
        console.error(msg);
        viewResultElement.innerHTML = `<p style='color:orange'>${msg}</p>`;
        return;
    }

    if (SecurityCredentials.Authenticated === false) {
        const msg = "CognitoGetSecurityCredentials: No Active Security Credentials. Get Credentials first.";
        console.error(msg);
        viewResultElement.innerHTML = `<p style='color:orange'>${msg}</p>`;
        return;
    }

    // let SignInUserId = document.getElementById("sign_in_request_user_id").value;
    // SignInUserId = (SignInUserId)? SignInUserId : Settings.Cognito.UserId;

    // console.log(Settings.Cognito.UserPoolId);
    // console.log(CognitoUserPoolCredentials.Authenticated);
    // console.log(SecurityCredentials.Authenticated);

    const modAwsS3 = new ModAwsS3();
    const response = await modAwsS3.ListBucketObjects({
        AccessKeyId: SecurityCredentials.AccessKeyId,
        SecretKey: SecurityCredentials.SecretKey,
        SessionToken: SecurityCredentials.SessionToken,
        BucketRegion: Settings.S3.Region,
        BucketName: Settings.S3.BucketName
    });

    console.log(response.Success);

    if (response.Success) {
        
        viewResultElement.innerHTML = "Success";

        let s3ContentsFormatted = "";
        response.BucketContents.forEach(element => {
            s3ContentsFormatted += "  " + element.Key + " " + element.Size + "<br/>";
        });

        console.log(s3ContentsFormatted);

        viewResultElement.innerHTML = `<p style='color:blue'>${s3ContentsFormatted}</p>`

    } else {
        viewResultElement.innerHTML = `<p style='color:red'>Error: ${response.ErrorMessage}</p>`
    }

};

window.cognitoSignIn = cognitoSignIn;
window.cognitoGetSecurityCredentials = cognitoGetSecurityCredentials;
window.s3ListBucketObjects = s3ListBucketObjects;