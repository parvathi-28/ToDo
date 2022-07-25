import { IEmail, ITokenData } from "../model/interfaces/itask";
import * as jwt from 'jsonwebtoken';

const SECRET = 'hhhhh';


export class JWTAuth {

    public static create(email: IEmail): Promise<ITokenData> {

        return new Promise((resolve, reject) => {

            const token = jwt.sign({ user: email.email }, SECRET);

            let result: ITokenData = {
                token: token,
                expiresIn: 20
            }

            resolve(result);
        });
    }
}