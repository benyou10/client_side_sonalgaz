import * as mysql from 'mysql2/promise';

const executeQuery = async (query, data) => {
    try {
        const db = await mysql.createConnection({
            host: 'sql11.freesqldatabase.com',
            port: 3306,
            database: 'sql11693703',
            user: 'sql11693703',
            password: 'c2zSA9lrhl'
        });
        const [result] = await db.execute(query, data);
        db.end();
        return result;
    } catch (error) {
        console.error("Error executing query:", error);
        return null;
    }
}

export default executeQuery;
