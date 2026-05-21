import { pool } from "../db/conn.js"

export class UserServices{
regUser=async(firstName:string,midName:string,lastName:string,email:string, phoneNumber:string, passwordHash:string)=>{
    const client = await pool.connect();
    try {
     if(!firstName ||!midName ||!lastName ||!email ||!phoneNumber){
      throw new Error("Missing fields");
     } 

    const regData={
    firstName,
    midName,
    lastName,
    email,
    phoneNumber,
    }

    await client.query("BEGIN");

    const userAddSql = `
    INSERT INTO users(first_name,mid_name,last_name,email,phone_no)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
    `
    const UserData = await client.query(userAddSql,
    [regData.firstName,
    regData.midName,
    regData.lastName,
    regData.email,
    regData.phoneNumber
    ]);
    
    const userId = UserData.rows[0]?.id;

    const insertCredentialsSql = `
    INSERT INTO user_credentials(user_id ,password_hash)
    VALUES ($1, $2)
    RETURNING *
    `

    await client.query(insertCredentialsSql, [userId, passwordHash]);

    await client.query("COMMIT");

    } catch (error) {
    await client.query("ROLLBACK");
    throw error;

    } finally {
    client.release();
    }
}

loginUser=async(email:string)=>{
  const client = await pool.connect();
  try {
  if(!email){
  throw new Error("user email not available");
  return;
  }

   const insertCredentialsSql = `
    SELECT 
    users.*,
    user_credentials.password_hash AS "passwordHash"
    FROM users
    INNER JOIN user_credentials
    ON users.id = user_credentials.user_id
    WHERE users.email = $1
    `
    const insertCredentials = await client.query(insertCredentialsSql, [email]);

    const fetchedUser = insertCredentials.rows[0];

    return fetchedUser;

  } catch (error) {
    throw error;

  } finally {
    client.release();
  }
}
}