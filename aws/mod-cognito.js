import { 
    CognitoIdentityProviderClient, AuthFlowType,
    InitiateAuthCommand, SignUpCommand, ConfirmSignUpCommand
} from "@aws-sdk/client-cognito-identity-provider";

import { CognitoIdentityClient, GetIdCommand, GetCredentialsForIdentityCommand } from "@aws-sdk/client-cognito-identity";

class ModAwsCognito {

    /**
     * @param request {
     *  RegionId: "RegionId",
     *  ClientId: "ClientId",
     *  UserId: "UserId",
     *  Password: "Password"
     * } 
     * @returns response {
     *  Success: true/false,
     *  ErrorMessage: "",
     *  IdToken: "IdToken",
     *  AccessToken: "AccessToken",
     *  RefreshToken: "RefreshToken"
     * }
     */
    async SignIn(request) {

        console.log("ModAwsCognito.SignIn");
    
        try {
    
            const client = new CognitoIdentityProviderClient({ region: request.RegionId });
    
            const cognitoInitiateAuthRequest = new InitiateAuthCommand({
                AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
                ClientId: request.ClientId,
                AuthParameters: { USERNAME: request.UserId, PASSWORD: request.Password }
            });
    
            console.log(`SignIn: UserId=${request.UserId}`);
    
            const cognitoInitiateAuthResponse = await client.send(cognitoInitiateAuthRequest);
    
            console.log(cognitoInitiateAuthResponse);
            console.log(cognitoInitiateAuthResponse.AuthenticationResult.AccessToken);
            console.log(cognitoInitiateAuthResponse.AuthenticationResult.IdToken);
            console.log(cognitoInitiateAuthResponse.AuthenticationResult.RefreshToken);
    
            return {
                Success: true,
                IdToken: cognitoInitiateAuthResponse.AuthenticationResult.IdToken,
                AccessToken: cognitoInitiateAuthResponse.AuthenticationResult.AccessToken,
                RefreshToken: cognitoInitiateAuthResponse.AuthenticationResult.RefreshToken
            };

        } catch (err) {
            console.log("Error", err);
            return {
                Success: false,
                ErrorMessage: err
            };
        }

    }

    /**
     * @param request {
     *  RegionId: "RegionId",
     *  IdentityPoolId: "IdentityPoolId",
     *  IdentityLoginProviderId: "IdentityLoginProviderId",
     *  UserPoolIdToken: "UserPoolIdToken"
     * } 
     * @returns response {
     *  Success: true/false,
     *  ErrorMessage: "",
     *  AccessKeyId: "AccessKeyId",
     *  SecretKey: "SecretKey",
     *  SessionToken: "SessionToken",
     *  Expiration: "Expiration"
     * }
     */
    async GetSecurityCredentials(request) {

        console.log("ModAwsCognito.GetSecurityCredentials");
    
        try {

            // Step1: GetIdCommand

            const cognitoIdentityClient = new CognitoIdentityClient({ region: request.RegionId });

            const cognitoGetIdRequest = { IdentityPoolId: request.IdentityPoolId,
                Logins: {
                    [request.IdentityLoginProviderId]: request.UserPoolIdToken
                } 
            };

            const cognitoGetIdResponse = await cognitoIdentityClient.send(new GetIdCommand(cognitoGetIdRequest));
            console.log("Success", cognitoGetIdResponse);
            console.log("IdentityId", cognitoGetIdResponse.IdentityId);

            // Step2: GetCredentialsForIdentityCommand
            const cognitoGetCredentialsRequest = { IdentityId: cognitoGetIdResponse.IdentityId,
                Logins: {
                    [request.IdentityLoginProviderId]: request.UserPoolIdToken
                } 
            };

            console.log("GetCredentialsForIdentityCommand ...");
            const cognitoGetCredentialsResponse = await cognitoIdentityClient.send(new GetCredentialsForIdentityCommand(cognitoGetCredentialsRequest));
            console.log("Success", cognitoGetCredentialsResponse);
            console.log("Credentials", cognitoGetCredentialsResponse.Credentials);
            console.log("Credentials.AccessKeyId: ", cognitoGetCredentialsResponse.Credentials.AccessKeyId);
            console.log("Credentials.SecretKey: ", cognitoGetCredentialsResponse.Credentials.SecretKey);
            console.log("Credentials.Expiration: ", cognitoGetCredentialsResponse.Credentials.Expiration);
            console.log("Credentials.SessionToken: ", cognitoGetCredentialsResponse.Credentials.SessionToken);
            
            return {
                Success: true,
                AccessKeyId: cognitoGetCredentialsResponse.Credentials.AccessKeyId,
                SecretKey: cognitoGetCredentialsResponse.Credentials.SecretKey,
                SessionToken: cognitoGetCredentialsResponse.Credentials.SessionToken,
                Expiration: cognitoGetCredentialsResponse.Credentials.Expiration
            };

        } catch (err) {
            console.log("Error", err);
            return {
                Success: false,
                ErrorMessage: err
            };
        }

    }

    /**
     * @param request {
     *  RegionId: "RegionId",
     *  ClientId: "ClientId",
     *  Username: "Username",
     *  Password: "Password",
     *  Email: "Email"
     * } 
     * @returns response {
     *  Success: true/false,
     *  ErrorMessage: "",
     *  UserSub: "UserSub",
     *  UserConfirmed: "UserConfirmed"
     * }
     */
    async SignUp(request) {

        console.log("ModAwsCognito.SignUp " + request.Username);

        try {

            const client = new CognitoIdentityProviderClient({ region: request.RegionId });
    
            const cognitoSignUpRequest = new SignUpCommand({
                //RegionId: request.RegionId,
                ClientId: request.ClientId,
                Username: request.Username,
                Password: request.Password,
                UserAttributes: [{ Name: "email", Value: request.Email }]
            });
    
            console.log("Sign Up: " + cognitoSignUpRequest);
    
            const cognitoSignUpResponse = await client.send(cognitoSignUpRequest);
    
            console.log(cognitoSignUpResponse);
    
            //document.getElementById("sign_up_result").innerHTML = "Sub: " + cognitoSignUpResponse.UserSub + " Confirmed?: " + cognitoSignUpResponse.UserConfirmed;
    
            return {
                Success: true,
                UserSub: cognitoSignUpResponse.UserSub,   
                UserConfirmed: cognitoSignUpResponse.UserConfirmed   
            };

        } catch (err) {
            console.log("Error", err);
            //document.getElementById("sign_up_result").innerHTML = "Error: " + err;
            return {
                 Success: false,
                 ErrorMessage: err
            };
        }

    }


        /**
     * @param request {
     *  RegionId: "RegionId",
     *  ClientId: "ClientId",
     *  Username: "Username",
     *  Password: "ConfirmationCode"
     * } 
     * @returns response {
     *  Success: true/false,
     *  ErrorMessage: "",
     *  IdToken: "IdToken",
     *  AccessToken: "AccessToken",
     *  RefreshToken: "RefreshToken"
     * }
     */
    async ConfirmSignUp(request) {

        console.log("ModAwsCognito.ConfirmSignUp " + request.Username);

        try {

            const client = new CognitoIdentityProviderClient({ region: request.RegionId });
    
            const cognitoConfirmSignUpRequest = new ConfirmSignUpCommand({
                ClientId: request.ClientId,
                Username: request.Username,
                ConfirmationCode: request.ConfirmationCode
            });
    
            console.log("Confirm Sign Up: " + cognitoConfirmSignUpRequest);
    
            const cognitoConfirmSignUpResponse = await client.send(cognitoConfirmSignUpRequest);
    
            console.log(cognitoConfirmSignUpResponse);
            return {
                Success: true,
            };

        } catch (err) {
            console.log("Error", err);
            return {
                    Success: false,
                    ErrorMessage: err
            };
        }

    }
};



export {ModAwsCognito};