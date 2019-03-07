const User = require('../models/users');


async function getAllUsers(){

    let allUsers;
    try {

        allUsers = await User.fetchAll();

    } catch (err) {console.log(err);}

    allUsers = allUsers[0]; // Da un array de dos elementos, el primero es el que tiene la info que queremos, el segundo tiene info de la propia db
    
    return allUsers;
}




module.exports = {
    getAllUsers,
};



