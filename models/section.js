const db = require('../util/database');

module.exports = class Section {
    constructor(id, story_id, author_id, uploaded_date, body){
        this.id = id; // Se pone pero luego en el insert no está y al instanciar será null
        this.story_id = story_id;
        this.author_id = author_id;
        this.uploaded_date = uploaded_date; // Se pone pero luego en el insert no está y al instanciar será null
        this.body = body;
    }

    createSection() {
        return db.execute(
          'INSERT INTO section (story_id, author_id, body) VALUES ( ?, ?, ?)',
          [ this.story_id, this.author_id, this.body ]
        );
    }

    // No necesito instancia para llamar a este método
    static getSectionByID(id) {
        return db.execute('SELECT * FROM section WHERE section.id = ?', [id]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM section order by uploaded_date DESC');
    }

    static fectchAuthors() { // Dejará fuera los usuarios no autores
        return db.execute('SELECT users.username from section join users on users.id = section.author_id');
    }

    static getByAuthorID(author_id) {
        return db.execute('SELECT * FROM section WHERE section.author_id = ? order by uploaded_date DESC', [author_id]);
    }






}
