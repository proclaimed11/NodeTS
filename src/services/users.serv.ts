import { dbQuery } from "../db/conn.js";
import type { User } from "../types/user.types.js";

export class userServ{
    getAllUsers=async(
        page:number,
        limit:number,
        sort:string="created_at",
        search:string="",
        order:string="DESC"
    )=>{
        try {
            const safePage = Math.max(1, page)

            const safeLimit = Math.min(50, Math.max(1,limit))

            const safeOffset = (safePage-1) * safeLimit

            const safeOrder = order ? "ASC" : "DESC"

            const sortList = ["created_at", "first_name", "mid_name", "last_name", "email"];
        const safeSort = sortList.includes(sort) ? sort : "created_at";  // ← Fixed

            const params:any[] = [safeLimit, safeOffset]

            const countParams:any[] = []

            let whereClause = ""

            if(search && search.trim() !== null){
             const searchTerm = `%${search.trim()}%`;
                whereClause = `WHERE first_name ILIKE $3 OR mid_name ILIKE $3 OR last_name ILIKE $3 OR email ILIKE $3`

                params.push(searchTerm)

                countParams.push(searchTerm)
            }

            const usersSql = `
            SELECT * FROM users ${whereClause}
            ORDER BY ${safeSort} ${safeOrder}
            LIMIT $1 OFFSET $2 
            `;

            const users = await dbQuery(usersSql, params);

            const countWhereClause = search && search.trim() !==undefined ? `WHERE first_name ILIKE $1 OR mid_name ILIKE $1 OR last_name ILIKE $1 OR email ILIKE $1`
            :"";

            const countUserCountSql = `SELECT COUNT(*) AS count FROM users ${countWhereClause}`

            const countUser = await dbQuery<{count:number}>(countUserCountSql, countParams)

            const totalUsers = countUser[0]?.count;

            if(!totalUsers){
            throw new Error("no users available")
            }

            const totalPages = Math.ceil(totalUsers / safeLimit)

            const from = safeOffset + 1

            const to = Math.min(safeLimit * safeOffset, totalPages)

            return{
                ...users,
                pagination:{
                    page:safePage,
                    limit:safeLimit,
                    total:totalPages,
                    to:to,
                    from:from,
                    hasNext: totalPages > safePage,
                    hasPrev:safePage > 1
                }
            }

        } catch (error) {
            throw error;
        }
    }

    getUserProfile=async(userId:number)=>{
        try {
            if(!userId){
                throw new Error("invalid or missing user id")
            }

            const userProfileSql=`
            SELECT * FROM users WHERE id=$1
            `
            const userProfile = await dbQuery(userProfileSql, [userId]);

            return userProfile[0];
        } catch (error) {
            throw error;
        }
    }

    updateUserProfile=async(userId:number, updates:User):Promise<Partial<User>>=>{
        try {
            if(!userId){
                throw new Error("invalid or missing user id")
            }

            const fields:any[]=[];
            const values:any[]=[];
            let paramIndex = 1;

            if(updates.firstName !== undefined){
                fields.push(`first_name = $${paramIndex}`);
                values.push(updates.firstName)
                paramIndex ++
            }

            if(updates.midName !== undefined){
                fields.push(`mid_name = $${paramIndex}`);
                values.push(updates.midName)
                paramIndex ++
            }

            if(updates.lastName !== undefined){
                fields.push(`last_name = $${paramIndex}`);
                values.push(updates.lastName)
                paramIndex ++
            }

            if(updates.email !== undefined){
                fields.push(`email = $${paramIndex}`);
                values.push(updates.email)
                paramIndex ++
            }

            if(updates.phoneNo !== undefined){
                fields.push(`phone_no = $${paramIndex}`);
                values.push(updates.phoneNo)
                paramIndex ++
            }

            if(updates.location !== undefined){
                fields.push(`location = $${paramIndex}`);
                values.push(updates.location)
                paramIndex ++
            }

            if(fields.length == 0){
              throw new Error("no fields available to update")
            }

            values.push(userId);

            const userUpdateSql = `
            UPDATE users
            SET ${fields.join(",")}
            WHERE id = $${paramIndex}
            RETURNING *
            `
            const userUpdate = await dbQuery(userUpdateSql, values);

            const update = userUpdate[0]

            if(!update){
                throw new Error("No updates made!")
            }

            return update;

        } catch (error) {
            throw error;
        }
    }
}