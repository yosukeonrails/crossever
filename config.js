
exports.URL= process.env.URL ||'http://localhost:8080/';

exports.clientID= process.env.clientID || '147100242642935';

exports.clientSecret= process.env.clientSecret || 'f08b311b823fc23c591047ebe5d81a1a';

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://localhost/crossever' :
                            'mongodb://localhost/crossever-dev');

exports.PORT = process.env.PORT || 8080;
