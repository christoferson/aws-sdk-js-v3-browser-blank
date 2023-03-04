import { 
    CognitoIdentityProviderClient, AuthFlowType,
    InitiateAuthCommand
} from "@aws-sdk/client-cognito-identity-provider";

class ModAwsCognito {

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

};

export {ModAwsCognito};