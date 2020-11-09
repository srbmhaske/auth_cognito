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

const register = (name: string, code: string) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: name,
      Pool: userPool,
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

export { register };
