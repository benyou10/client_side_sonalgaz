import * as mysql from 'mysql2/promise';

const executeQuery = async (query, data) => {
    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            database: 'attendence',
            user: 'admin',
            password: 'P@ssw0rd!MySQL2024'
            
        });
        const [result] = await db.execute(query, data);
console.log(result)
        db.end();
        return result[0];
    } catch (error) {
        console.error("Error executing query:", error);
        return null;
    }
}

export default executeQuery;
