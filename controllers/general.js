// CONTROLLER

exports.getWho = (req, res, next) => {
    res.render('whoWeAre', {
        pageTitle: 'who-we-are'
        
    });
};

exports.getHome = (req, res, next) => {
    res.render('home', {
        pageTitle: 'home'
        
    });


};

