
class ModAws {

};

ModAws.Credentials = class SecurityCredentials {
    
    constructor() {
        this.Authenticated = false;
        this.AccessKeyId = ""; 
        this.SecretKey = "";
        this.SessionToken = "";
        this.Expiration = null;
    }

    signin(AccessKeyId, SecretKey, SessionToken, Expiration) {
        if (this.Authenticated === true) { throw new Error("Invalid State. Authentication is valid!"); }
        if (AccessKeyId === "") { throw new Error("AccessKeyId is required!"); }
        if (SecretKey === "") { throw new Error("SecretKey is required!"); }
        if (Expiration === null) { throw new Error("Expiration is required!"); }
        this.Authenticated = true;
        this.AccessKeyId = AccessKeyId; 
        this.SecretKey = SecretKey;
        this.SessionToken = SessionToken;
        this.Expiration = Expiration;
        console.log("SignIn Successful.");
    }

    signout() {
        this.Authenticated = false;
        this.AccessKeyId = ""; 
        this.SecretKey = "";
        this.SessionToken = "";
        this.Expiration = null;
    }

};

ModAws.CognitoUserPoolCredentials = class CognitoUserPoolCredentials {

    constructor() {
        this.Authenticated = false;
        this.IdToken = ""; 
        this.AccessToken = "";
        this.RefreshToken = "";
    }

    signin(IdToken, AccessToken, RefreshToken) {
        if (this.Authenticated === true) { throw new Error("Invalid State. Authentication is valid!"); }
        if (IdToken === "") { throw new Error("IdToken is required!"); }
        if (AccessToken === "") { throw new Error("AccessToken is required!"); }
        this.Authenticated = true;
        this.IdToken = IdToken; 
        this.AccessToken = AccessToken;
        this.RefreshToken = RefreshToken;
        console.log("SignIn Successful.");
    }

    signout() {
        this.Authenticated = false;
        this.IdToken = ""; 
        this.AccessToken = "";
        this.RefreshToken = "";
    }

};

export {ModAws};