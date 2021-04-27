const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('../../credentials/firebase/credential.json');

let rdb;

const firebaseConnect = () => {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: 'https://fexpress-6c93b-default-rtdb.firebaseio.com/'
    });
    rdb = firebaseAdmin.database();
}

const getDb = () => {
    if(rdb) return rdb;
    throw 'Firebase database does not exist';
}

exports.firebaseConnect = firebaseConnect;
exports.getDb = getDb;
