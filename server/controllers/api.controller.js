const db = require('../config/db.config')
const bcrypt = require('bcryptjs')
const { genTokens } = require('../helpers/default')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

exports.getUser = (req,res) => {
    const { id } = req.query
    if (!id) return res.json({ message: 'Query param id not given', ok: false })
    //try finding user in db
    db.query('SELECT * FROM users WHERE _id = ?', [id], (error,results) => {
        if (error) return res.json({ message: 'Server Error, Please try again!', ok: false })
        if (results.length <= 0) return res.json({ message: 'No user found', ok: false })
        delete results[0].password
        return res.json({ user: results[0], ok: true })
    })
}

exports.verify = (req,res) => {
    const { access,refresh } = req.cookies
    if (!access || !refresh) return res.json({ message: 'No tokens provided', ok: false })

    jwt.verify(access, process.env.JWT1, (error, decoded) => {
        if (error) {
            //Access expired or invalid. Generate new
            jwt.verify(refresh, process.env.JWT2, (err,de) => {
                //error will be thrown if refresh token is invalid
                if (err) return res.json({ message: 'Invalid tokens', ok: false })
                console.log(de)
                //compare refresh in database
                db.query('SELECT * FROM refresh WHERE _id = ?', [de._id], (myerr,myres) => {
                    if (myerr) return res.json({ message: 'Server Error', ok: false })
                    if (myres.length <= 0) return res.json({ message: 'Invalid tokens', ok: false })
                    if (refresh !== myres[0].token) return res.json({ message: 'Invalid tokens', ok: false })
                    //generate new tokens
                    const tokens = genTokens(de)
                    res.cookie('access', tokens.access, { httpOnly: true })
                    res.cookie('refresh', tokens.refresh, { httpOnly: true })
                    return res.json({ message: 'Auth refreshed', ok: true })
                })
            })
         } else {
            //token still valid send response to client
            return res.json({ message: 'Token valid', ok: true })
         }
    })
}

exports.login = (req,res) => {
    console.log(req.cookies)
    const { email, password } = req.body
    console.log(req.body)
    //make sure required credentials is provided
    if (!email || !password) return res.json({
        message: 'Both email and password is required',
        ok: false
    })
    //check for user in database
    db.query('SELECT * FROM users WHERE email = ?', [email], (error,response) => {
        if (error) {
            console.log(error)
            return res.json({message: 'Server error',ok: false})
        }
        //check if user was found
        if (response.length <= 0) return res.json({message: 'Invalid username or password',ok: false})
        //compare passwords -> string password eg, hashed password
        const match = bcrypt.compareSync(password, response[0].password)
        if (!match) return res.json({message: 'Invalid username or password',ok: false})
        //Check for account status 1 is ok and 0 means account is frozen
        if (response[0].status != '1') return res.json({message: 'Account frozen',ok: false})
        //Login success action
        const tokens = genTokens(response[0])
        res.cookie('access', tokens.access, { httpOnly: true })
        res.cookie('refresh', tokens.refresh, { httpOnly: true })
        //remove password key from object before sending to client
        delete response[0].password
        //Send response to client
        return res.json({
            message: 'Login success',
            ok: true,
            user: response[0]
        })
    })
}

exports.register = (req,res) => {
    const { email, fullname, password } = req.body
    if (!email || !fullname || !password) return res.json({message: 'All fields required', ok: false})
    //check if email already belows to an account
    db.query('SELECT * FROM users WHERE email = ?', [email], (error,result) => {
        if (error) return res.json({message: 'Server error, please try again', ok: false})
        if (result.length > 0) return res.json({message: 'Email already taken', ok: false})
        //hash password and generate id
        const hash = bcrypt.hashSync(password, 10)
        const id = uuidv4()
        //save new user
        db.query('INSERT INTO users (_id,email,fullname,password,status) VALUES(?,?,?,?,?)', [id,email,fullname,hash,1], (err,response) => {
            if (err) {
                console.log(err)
                return res.json({message: 'Server error, please try again', ok: false})
            }
            if (!response) return res.json({message: 'Server error, please try again', ok: false})
            //generate tokens and send success response
            const tokens = genTokens({ _id: id, email, fullname, status: 1 })
            res.cookie('access', tokens.access, { httpOnly: true })
            res.cookie('refresh', tokens.refresh, { httpOnly: true })
            //Send response to client
            return res.json({
                message: 'Register success',
                ok: true,
                user: { _id: id }
            })
        })
    })
}

exports.logout = (req,res) => {
    res.cookie('access', '', { httpOnly: true, maxAge: 1 })
    res.cookie('refresh', '', { httpOnly: true, maxAge: 1 })
    return res.json({ message: 'Logout successful', ok: true })
}