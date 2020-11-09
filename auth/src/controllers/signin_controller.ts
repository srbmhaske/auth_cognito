import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import TypedArrays from "crypto-js/lib-typedarrays";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

import { poolData } from "../constants";

const userPool = new CognitoUserPool(poolData);

let accessToken: string = "";
let msg: string = "";

const signin = (name: string, pass: string) => {
  return new Promise((resolve, reject) => {
    const Username = name; //JSON.stringify(name);
    const password = pass; //JSON.stringify(pass);
    console.log(Username);
    console.log(password);
    const authenticationData = {
      Username,
      password,
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);

    var userData = {
      Username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        accessToken = result.getAccessToken().getJwtToken(); //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
        console.log("access token + " + result.getAccessToken().getJwtToken());
        console.log("id token + " + result.getIdToken().getJwtToken());
        console.log("refresh token + " + result.getRefreshToken().getToken());
        msg = "successfully signed in!!!";
        resolve(msg);
      },

      onFailure: function (err) {
        msg = err.message;
        console.log(err.message || JSON.stringify(err));
        reject(msg);
      },
    });
  });
};

export { signin, accessToken };
