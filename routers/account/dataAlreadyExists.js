const accountManager = require('./accountManager')

const dataAlreadyExists = async ({userName=false, mail=false}) => {

    let resultName = undefined
    let resultMail = undefined

	if(userName) {
		resultName = await accountManager.nameExists(userName)
	}

	if(mail) {
		resultMail = await accountManager.mailExists(mail)
	}

	return {'userName': resultName, 'mail': resultMail}
}

module.exports = dataAlreadyExists