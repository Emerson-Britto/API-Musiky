let path = require('path')

const greeting = () => {
    file = '../dataBase/imgs/period/0/0.gif'
    let img = path.join(__dirname, file);
    console.log(img)
    return img
}

module.exports = greeting
