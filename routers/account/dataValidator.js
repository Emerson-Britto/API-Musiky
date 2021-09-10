const validator = dataUser => {

	exp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%#*?&]{8,}$/

	const errors = [
		Object.keys(dataUser).length == 0,
		lengthName = dataUser.userName.length > 20 || dataUser.userName.length < 3,
		lengthMail = dataUser.mail.length > 40 || dataUser.mail.length < 16,
		lengthPass = dataUser.password.length > 40 || dataUser.password.length < 9,
		pattern = !exp.test(dataUser.password),
		noMatchPass = dataUser.password != dataUser.rePassword
	]

    const hasSomeEvenError = errors.some(test => test === true);

    return hasSomeEvenError
}

module.exports = validator