//load .env file
require('dotenv').config()
//required packages / middleware
const express = require('express')
const app = express()
const port = process.env.PORT
const cookieParser = require('cookie-parser')

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//routes
app.use('/api', require('./routes/api.route'))

//start server
app.listen(port, () => console.log(`Server alive at http://localhost:${port}`))

//serve statics files in production 
if (process.env.NODE_ENV === 'production') {
	// Static Folder
	app.use(express.static(__dirname + '/public/'))
	//SPA (Single Page Application)
	app.get(/.*/, (req,res) => {
		res.sendFile(__dirname + '/public/index.html')
	})
}