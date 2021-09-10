const validator = require('./dataValidator')
const accountManager = require('./accountManager')

const createAccount = (dataUser, res) => {

	var hasError = validator(dataUser)
	if (hasError) { 
		res.status(401).json({msg: 'account was denied'})
		return
	}

	delete dataUser.rePassword

	accountManager.add(dataUser)

	res.status(201).json({msg: 'created'})

	console.log(dataUser)
}

module.exports = createAccount