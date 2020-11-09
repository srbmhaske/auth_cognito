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
const attributeList: CognitoUserAttribute[] = [];

const signup = (username: string, email: string, password: string) => {
  return new Promise((resolve, reject) => {
    const dataEmail = {
      Name: "email",
      Value: email,
    };
    const dataName = {
      Name: "name",
      Value: username,
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    const attributeName = new CognitoUserAttribute(dataName);
    attributeList.push(attributeName);
    userPool.signUp(username, password, attributeList, [], function (
      err,
      result
    ) {
      if (err) {
        console.log(err);
        reject(err.message);
      }

      resolve(result);
    });
  });
};

export { signup };
