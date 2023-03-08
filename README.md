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





### Links

- (npm-install)[https://docs.npmjs.com/cli/v8/commands/npm-install]