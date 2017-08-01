
exports.URL= process.env.URL || 'http://localhost:8080/';

exports.clientID= process.env.clientID || '1461195987233806';

exports.clientSecret= process.env.clientSecret || '93f6c0e5811b441be57777a239001801';

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://localhost/crossever' :
                            'mongodb://localhost/crossever-dev');




exports.PORT = process.env.PORT || 8080;
