# aws-sdk-js-v3-browser-blank
AWS SDK Javascript Version 3 Blank Project


#### Configure Webpack

1. npm install --save-dev webpack
2. npm install --save-dev webpack-cli
3. npm install --save-dev path-browserify
4. create webpack.config.js
5. Configure "build": "webpack" in package.json

```(javascript)
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
}
```

#### Install AWS SDK Dependencies (Cognito)

- npm i @aws-sdk/client-cognito-identity-provider
- npm i @aws-sdk/client-cognito-identity

#### Install AWS SDK Dependencies

- npm i @aws-sdk/client-s3

#### Build the Project

Running build should output webpack bundle main.js in the main folder.

- npm run build

--------------------------------------------------------------------------

#### Update Dependencies

##### Check NPM Version
npm -v

##### Update NPM
npm install -g npm@9.8.1

##### Check installed components
npm list --depth=0

##### Check Outdated components
npm outdated

```
Package                                    Current   Wanted   Latest  Location                                                Depended by
@aws-sdk/client-cognito-identity           3.282.0  3.398.0  3.398.0  node_modules/@aws-sdk/client-cognito-identity           
@aws-sdk/client-cognito-identity-provider  3.282.0  3.398.0  3.398.0  node_modules/@aws-sdk/client-cognito-identity-provider  
@aws-sdk/client-s3                         3.282.0  3.398.0  3.398.0  node_modules/@aws-sdk/client-s3                         
webpack                                     5.75.0   5.88.2   5.88.2  node_modules/webpack                            
webpack-cli                                  5.0.1    5.1.4    5.1.4  node_modules/webpack-cli                                
```

##### Update Components
npm update
npm install @aws-sdk/client-cognito-identity@3.398.0
npm install @aws-sdk/client-cognito-identity-provider@3.398.0
npm install @aws-sdk/client-s3@3.398.0

npm install webpack@5.88.2 
npm install webpack-cli@5.1.4



-----

#### Access

file:///C:/codes/aws-sdk-js-v3-browser-blank/main/app.html


### Links

- (npm-install)[https://docs.npmjs.com/cli/v8/commands/npm-install]

- (jwt-token-parser)[https://jwt.io/]