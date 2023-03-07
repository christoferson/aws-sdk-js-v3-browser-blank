import { 
    CognitoIdentityProviderClient, AuthFlowType,
    InitiateAuthCommand
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
    
            const command = new InitiateAuthCommand({
                AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
                ClientId: request.ClientId,
                AuthParameters: { USERNAME: request.UserId, PASSWORD: request.Password }
            });
    
            console.log(`SignIn: UserId=${request.UserId}`);
    
            const response = await client.send(command);
    
            console.log(response);
            console.log(response.AuthenticationResult.AccessToken);
            console.log(response.AuthenticationResult.IdToken);
            console.log(response.AuthenticationResult.RefreshToken);
    
            return {
                Success: true,
                IdToken: response.AuthenticationResult.IdToken,
                AccessToken: response.AuthenticationResult.AccessToken,
                RefreshToken: response.AuthenticationResult.RefreshToken
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

};

export {ModAwsCognito};