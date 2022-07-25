import { Request, Response, NextFunction } from 'express';
import * as Validator from "email-validator";
export class InputValidation {
    public static validateField(key: string, value: string): Promise<string> {

        return new Promise((resolve, reject) => {

            if (this.stringValidate(value) == true) {

                resolve(value);
            } else {

                reject("invalid field");
            }
        });
    }

    public static stringValidate(value :string) :boolean {
  
        if (this.validate(value) == false) { return false; } 
        if (value === "" || value === " ") { return false; }

        value = value.trim();
        
        if (value === "" || value === " ") { return false; }

        return true; 
    }

    public static validate(value :any) :boolean {
 
        if (value === undefined) { return false; } 
        if (value === null) { return false; }
 
        return true; 
    }

    public static validateRequestParam(req: Request, field: string): Promise<string> {

        return new Promise((resolve, reject) => {

            let fValue = req.params[field] || "";
            if (this.stringValidate(fValue) == true) {

                resolve(fValue);
            } else {

                reject("invalid value");
            }
        });
    }

    public static emailValidate(email :string) :boolean {
 
        if (this.stringValidate(email) == false) { return false; }  

        return Validator.validate(email); 
    }
}
