const StatisticsService = require('../services/statisticsService');

// Trae todos los documentos
function findAll(req, res){

    StatisticsService.findAll()
    .then((result) => { 

        console.log(result); // Devuelve un array de documentos. [0] - Da el primero
        /*
        [{ _id: 5c7e8a56b2bc8b37ac40e58c,
        userId: 8,
        regLog: 1,
        onDate: 2019-03-05T14:40:22.448Z,
        __v: 0 },

        { _id: 5c7e8b73a7f12d2a3cf02123,
        userId: 8,
        regLog: 1,
        onDate: 2019-03-05T14:45:07.178Z,
        __v: 0 },
        */

        //console.log(result.length); 


        //let totalNumLogin
        //let totalNumRegister
        
        





        //res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    });

};













module.exports = {
    findAll,
    
};