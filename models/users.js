const db = require('../util/database');


module.exports = class User {
    constructor(id, username, mail, country, city, password, register_date, info, img ){
        this.id = id; // Se pone pero luego en el insert no está y al instanciar será null
        this.username = username;
        this.mail = mail;
        this.country = country;
        this.city = city;
        this.password = password;
        this.register_date = register_date; // Se pone pero luego en el insert no está y al instanciar será null
        this.info = info;
        this.img = img;
    }

    registerUser() {
        return db.execute(
          'INSERT INTO users (username, mail, country, city, password) VALUES (?, ?, ?, ?, ?)',
          [this.username, this.mail, this.country, this.city, this.password]
        );
    }



    // ------------------ EDIT Profile ---------------------
   

    /*
    postInfo(id){
        return db.execute(
            'UPDATE users SET info = ? WHERE users.id = ?',[info],[id]
        ); 
    }
    */

    
    static postImg(id, imgURL){
    
        return db.execute('UPDATE users SET imgURL = ? WHERE users.id = ?',[imgURL , id]); 

    }
    
    static getImg(id){
        return db.execute('SELECT imgURL from users where users.id = ?',[id]);
    }
   

   
    // getInfo(id)

    // -------------------------------------------------------



    // No necesito instancia para llamar a este método
    static getUserByID(id) {
        return db.execute('SELECT * FROM users WHERE users.id = ?', [id]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM users');
    }

    static login(user, pass){
        return db.execute('SELECT * FROM users WHERE username = ? AND password = ?',[user, pass]);
    }


    static removeUser(id){
        return db.execute('DELETE FROM users WHERE users.id = ?', [id]);
    }

    static blockAccess(id){
        return db.execute('UPDATE users SET enableAccess = false WHERE users.id = ?',[id]);
    }

 
    


}