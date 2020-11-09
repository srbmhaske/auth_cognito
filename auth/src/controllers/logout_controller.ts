import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

import { poolData } from "../constants";

const userPool = new CognitoUserPool(poolData);

let msg = "";
const logout = () => {
  const logger = new Promise((success, failure) => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser !== null) {
      console.log("user name is " + cognitoUser.getUsername());
      cognitoUser.signOut();
      msg = "successfully logged out";
      success(msg);
    } else {
      msg = "Some error occured";
      failure(msg);
    }
  });

  return logger;
};

export { logout };
