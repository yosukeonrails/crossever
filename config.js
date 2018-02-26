
require('dotenv').config();

exports.URL= process.env.URL ||'http://localhost:8080/';

exports.clientID= process.env.CLIENT_ID || 'clientid' ;

exports.clientSecret= process.env.CLIENT_SECRET || 'clientsecret';

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://localhost/crossever' :
                            'mongodb://localhost/crossever-dev');

exports.PORT = process.env.PORT || 8080;
