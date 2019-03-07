const statisticsModelModule = require('../models/statisticsModel'); // traigo todo
const statisticsModel = statisticsModelModule.model;


async function saveLogOrRegisterDate(id, regOrLog ){  //regOrLog: 0: Registro - 1: Login
    return new Promise( (resolve, reject) => {
        const newAcces = new statisticsModel({ userId: id, regLog: regOrLog });
        newAcces.save( err => {
            if (err) reject(err);
            resolve(newAcces);
        })
    });
}


async function findAll() {
    return new Promise ( (resolve, reject) => {
        statisticsModel.find({}, (err, result) => {
            if(err) reject (err);
            //else
            resolve(result);
        });
    })
}

async function findAllResgistered() {
    return new Promise ( (resolve, reject) => {
        statisticsModel.find({"regLog":0 }, (err, result) => {
            if(err) reject (err);
            //else
            resolve(result);
        });
    })
}

async function findAllLogin() {
    return new Promise ( (resolve, reject) => {
        statisticsModel.find({"regLog":1 }, (err, result) => {
            if(err) reject (err);
            //else
            resolve(result);
        });
    })
}





// Funcion que devuelve toda la info de las estadísticas de acceso

async function getAllAccessStatistics(){

    let totalUserActivity;
    let totalUserRegister;
    let totalUserLogin; 
    let AllAccessStatistics;
    
    try {

        let UserActivity = await findAll();
        let UserRegister = await findAllResgistered();
        let UserLogin = await findAllLogin();

        totalUserActivity = UserActivity.length;
        totalUserRegister = UserRegister.length;
        totalUserLogin = UserLogin.length;

        AllAccessStatistics = [totalUserActivity, totalUserRegister, totalUserLogin];

    } catch (err) {console.log(err);}

    return AllAccessStatistics;

}






module.exports = {
    findAll,
    saveLogOrRegisterDate,
    findAllResgistered,
    findAllLogin,
    getAllAccessStatistics,
};


