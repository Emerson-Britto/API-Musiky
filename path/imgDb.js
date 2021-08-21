let path = require('path')

const imgDb = imgPath => {
    let img = path.join(__dirname, `../dataBase/imgs/${imgPath}`);
    console.log(img)
    return img
}

module.exports = imgDb
