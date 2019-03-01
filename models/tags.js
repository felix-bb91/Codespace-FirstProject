const db = require('../util/database');


module.exports = class Tags {
  
    static fetchAll() {
        return db.execute('SELECT * FROM tags');
    }

    static saveTagsWithStory(story_id, tag_id){
        return db.execute('INSERT INTO project1_2.S_T (story_id, tag_id) values (?, ?)',[story_id, tag_id]);
    }

    
}
