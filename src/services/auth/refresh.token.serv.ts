import { dbQuery } from "../../db/conn.js";
import jwt from "jsonwebtoken"

export class RefreshTokeService{
    newRefreshToken=async(userId:number)=>{
        try {
         const userResultSql = `
         SELECT id , email, role 
         FROM users
         WHERE id = $1
         `;
         
         const userResult = await dbQuery(userResultSql, [userId]);

         if(userResult.length === 0){
            throw new Error("User not found")
         }

         const user = userResult[0]

         const refreshToken = jwt.sign(
            {id:user.id, email:user.email, role:user.role},
            process.env.REFRESH_TOKEN_SECRET as string,
            {expiresIn:"7d"}
         );

         const expireDate = new Date(Date.now() + 7*24*60*60*1000);

         const insertTokenSql = `
         INSERT INTO refresh_token(user_id, token, expires_at)
         VALUES ($1, $2, $3)
         RETURNING *
         `;

        await dbQuery(insertTokenSql, [user.id, refreshToken, expireDate]);

        return refreshToken;

        } catch (error) {
        throw error;    
        }
    }

    verifyRefreshToken=async(token:string)=>{
       try {
        const resultSql =
          `SELECT 
          refresh_token.user_id,
          refresh_token.token,
          refresh_token.role,
          FROM refresh_token
          INNER JOIN users
          ON users.id = refresh_token.user_id
          WHERE refresh_token.token = $1 AND refresh_token.expires_at > NOW()
          ` ;

          const result = await dbQuery(resultSql, [token]);
          
          if(result.length == 0){
          throw new Error("Invalid or expired refresh token")
          }

          return result[0];

       } catch (error) {
           throw error;
       }
    }

    deleteRefreshToken=async(token:string):Promise<{message:string}>=>{
      const deleteSql = `
      DELETE FROM refresh_token WHERE token = $1
      `
      await dbQuery(deleteSql,[token]);

      return {
         message:"User loged out successfuly!"
      }
    }
}