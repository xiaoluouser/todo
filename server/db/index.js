const mysql = require("mysql");

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'todo',
})

// 接收一个sql语句 以及所需的values
// 这里接收第二参数values的原因是可以使用mysql的占位符 '?'
// 比如 query(`select * from my_database where id = ?`, [1])

const query = (sql, values) => {
    // 返回一个 Promise
    return new Promise((resolve, reject) => {
        db.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                    // 结束会话
                    connection.release();
                })
            }
        })
    })
}

module.exports = query;