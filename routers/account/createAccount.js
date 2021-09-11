const validator = require('./dataValidator')
const accountManager = require('./accountManager')

const createAccount = async (dataUser, res) => {

	var hasError = await validator(dataUser)
	if (hasError) { 
		res.status(401).json({msg: 'account was denied'})
		return
	}

	delete dataUser.rePassword

	accountManager.add(dataUser)

	res.status(201).json({msg: 'created'})
}

module.exports = createAccount