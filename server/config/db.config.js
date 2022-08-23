const mysql = require('mysql')

const host = process.env.DB_HOST,
      database = process.env.DB_NAME,
      user = process.env.DB_USER,
      password = process.env.DB_PASS

const conn = mysql.createConnection({
    host,
    database,
    user,
    password
})

if (!host || !database || !user) {
    console.log('Required database credentials where not given!')
} else {
    conn.connect((err) => {
        if (err) console.log(`MySQL: ${err}`)
        console.log('MySQL Connected')
    })
}

module.exports = conn