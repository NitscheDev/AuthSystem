const jwt = require('jsonwebtoken')
const db = require('../config/db.config')

const genTokens = (payload) => {
    if (!payload) throw new Error('Payload is required to generate tokens')
    console.log(payload)
    //destructure payload
    const { _id,email,fullname,status } = payload
    const load = { _id,email,fullname,status }
    //sign tokens
    const access = jwt.sign(load,process.env.JWT1, { expiresIn: '1m' })
    const refresh = jwt.sign(load,process.env.JWT2)
    //save refresh to database to be able to invalidate it in case of leaked
    db.query('SELECT * FROM refresh WHERE _id = ?', [_id], (err,res) => {
        if (err) console.log(err)
        if (res.length > 0) {
            //update existing token
            db.query('UPDATE refresh SET token = ? WHERE _id = ?', [refresh,_id], (erro,resp) => {
                if (erro) console.log(erro)
                console.log(resp)
            })
        } else {
            //insert new
            db.query('INSERT INTO refresh (_id,token) VALUES (?,?)', [_id,refresh], (error,result) => {
                if (error) console.log(error)
                console.log(result)
            })
        }
    })
    //return tokens
    return {
        access,
        refresh
    }
}

module.exports = {
    genTokens
}