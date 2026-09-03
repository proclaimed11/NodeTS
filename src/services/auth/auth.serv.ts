import { dbQuery, pool } from "../../db/conn.js";

export class Auth{
    userAccReg=async(
        firstName:string,
        midName:string,
        lastName:string,
        email:string,
        phoneNo:string,
        location:string,
        password:string
    )=>{
        const client = await pool.connect()
        try {
            if(
            !firstName ||
            !midName ||
            !lastName ||
            !email ||
            !phoneNo ||
            !password
            ){
             throw new Error(`Invalid or missing required fields`)
            }

            const newUserAcc = {
                firstName,
                midName,
                lastName,
                email,
                phoneNo
            };

            await client.query("BEGIN");

            const createAccSql = `
            INSERT INTO users(first_name , mid_name , last_name , email , phone_no ,location)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id 
            `;
            
            const createAcc = await client.query<{id:number}>(createAccSql, [
                newUserAcc.firstName,
                newUserAcc.midName,
                newUserAcc.lastName,
                newUserAcc.email,
                newUserAcc.phoneNo,
                location
            ]);

            const newUserAccId = Number(createAcc.rows[0]?.id);

            if(!newUserAccId || isNaN(newUserAccId)){
             throw new Error("invalid or missing new user id")
            }

            const userCredSql = `
            INSERT INTO user_credentials(user_id, password_hash)
            VALUES ($1, $2)
            RETURNING *
            `;

            await client.query(userCredSql, [newUserAccId, password]);

            await client.query("COMMIT");
           
        } catch (error) {
            await client.query("ROLLBACK")
            throw error;
        } finally {
            client.release();
        }
    }

    fetchUserAcc=async(email:string)=>{
     try {
        if(!email){
            throw new Error("invalid or missing email");
        }

        const userSql = `
        SELECT
        users.*,
        user_credentials.password_hash AS "passwordHash"
        FROM users
        INNER JOIN user_credentials
        ON users.id = user_credentials.user_id
        WHERE users.email = $1
        `;

        const user = await dbQuery(userSql, [email]);

        if(user.length == 0){
        throw new Error(`User with email : [${email}] is not available`)
        }

        return user[0];
     } catch (error) {
        throw error;
     }
    }
}