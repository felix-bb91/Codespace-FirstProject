const db = require('../util/database');

module.exports = class Story {
    constructor(id, author_id, title, uploaded_date, body){
        this.id = id; // Se pone pero luego en el insert no está y al instanciar será null
        this.author_id = author_id;
        this.title = title;
        this.uploaded_date = uploaded_date; // Se pone pero luego en el insert no está y al instanciar será null
        this.body = body;
    }

    createStory() {
        return db.execute(
          'INSERT INTO story (author_id, title, body) VALUES ( ?, ?, ?)',
          [this.author_id, this.title, this.body]
        );
    }

    // No necesito instancia para llamar a este método
    static getStoryByID(id) {
        return db.execute('SELECT * FROM story WHERE story.id = ?', [id]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM story order by uploaded_date DESC');
    }

    static getByTags(tags) { // Este tags es un parámetro de entrada, no tiene nada que ver con el constructor

        let subQuery = ( "'" + tags[0] + "'" );
        for(let i = 1; i < tags.length; i++){
            subQuery = subQuery + " OR tagname = '" + tags[i] + "'";
        }
        // Hasta aquí está testeado y sale el string que debería

        return db.execute('SELECT * FROM story inner join S_T on story.id = S_T.story_id inner join tags on tags.id = S_T.tag_id WHERE tagname = ? group by story.id order by uploaded_date DESC', [subQuery]);
        // La query está probada, si falla es por el "?
    }

    static fectchAuthors() { // Dejará fuera los usuarios no autores
        return db.execute('SELECT users.username from story join users on users.id = story.author_idgroup by story.author_id');
    }

    static getByAuthorID(author_id) {
        return db.execute('SELECT * FROM story WHERE story.author_id = ? order by uploaded_date DESC', [author_id]);
    }

    static getLastStoryId(){
        return db.execute('SELECT id from story order by id DESC LIMIT 1');
    }

    static getAllStoriesAndTags(){
        return db.execute('SELECT story.id, story.title, story.author_id, story.body, story.uploaded_date, tagname from story inner join S_T on S_T.story_id = story.id inner join tags on tags.id = S_T.tag_id order by story.id DESC');
        
    }

    static setLikeAnonymousStory(id){
        return db.execute('UPDATE story SET author_id = ?  WHERE author_id = ?',[2, id]);
    }

    











}
