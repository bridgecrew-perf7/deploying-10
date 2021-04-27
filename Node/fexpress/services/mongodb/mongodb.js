const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let mdb;

const mongoConnect = (cb) => {
    MongoClient.connect('mongodb+srv://fexpress:fexpress@cluster0.l5s6b.mongodb.net/fexpress?retryWrites=true&w=majority', {useUnifiedTopology: true})
    .then(client => {
        console.log('Mongo Connected');
        mdb = client.db();
        cb();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
}

const getDb = () => {
    if(mdb) return mdb;
    throw 'Mongo database does not exist';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;