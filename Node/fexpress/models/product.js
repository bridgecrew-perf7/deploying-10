const serverConfig = require('../configs/server-config');
const mongodb = require('mongodb');
const getMongoDb = require('../services/mongodb/mongodb').getDb;
const getFirebaseDb = require('../services/firebase/firebase').getDb;
const e = require('express');

module.exports = class Product
{
    static getAllFirebase() 
    {
        const rdb = getFirebaseDb();
        return new Promise((resolve, reject) => 
        {
            try 
            {
                rdb.ref('products').once('value', (snapshot) => 
                {
                    let products = snapshot.val();
                    if(products)
                    {
                        products = Object.keys(products).map(key => 
                        {
                            products[key].imageUrl = `${serverConfig.scheme}://${serverConfig.server}/${products[key].imageUrl}`;
                            return ({ id: key, ...products[key] })
                        });
                    }
                    products = products || [];
                    resolve({message: 'success', products});
                });
            } 
            catch (err) 
            {
                reject(err);
            }
        });
    }

    static getAllMongo() 
    {
        const mdb = getMongoDb();
        return new Promise((resolve, reject) => 
        {
            mdb.collection('products')
            .find()
            .toArray()
            .then(products => 
            {
                if(products)
                {
                    products = products.map((product) => ({ 
                        id: product['_id'],
                        title: product.title,
                        price: product.price,
                        imageUrl:  `${serverConfig.scheme}://${serverConfig.server}/${product.imageUrl}`
                    }));
                }
                products = products || [];
                resolve({message: 'success', products: products});
            })
            .catch(err => 
            {
                reject('Error al obtener los datos en MongoDb');
            });
        });
    }

    static getByIdFirebase(productId) 
    {
        const rdb = getFirebaseDb();
        return new Promise((resolve, reject) => 
        {
            try 
            {
                rdb.ref('products').child(productId).once('value', (snapshot) => {
                    let product = snapshot.val();
                    if(product != null)
                    {
                        product.imageUrl = `${serverConfig.scheme}://${serverConfig.server}/${product.imageUrl}`;
                        product = { id: productId, ...product};
                    }
                    resolve({message: 'success', product: { ...product }});
                });
            } 
            catch (err) 
            {
                reject(err);
            }
        });
    }

    static getByIdMongo(productId) 
    {
        const mdb = getMongoDb();
        return new Promise((resolve, reject) => 
        {
            mdb.collection('products')
            .find({_id: new mongodb.ObjectId(productId)})
            .next()
            .then(product => 
            {   
                if(product)
                {
                    product = {
                        id: product['_id'],
                        title: product.title,
                        price: product.price,
                        imageUrl: `${serverConfig.scheme}://${serverConfig.server}/${product.imageUrl}`
                    }
                }
                resolve({message: 'success', product: { ...product }});
            })
            .catch(err => 
            {
                reject('Error al obtener los datos en MongoDb');
            });
        });
    }

    static deleteByIdFirebase(productId)
    {
        const rdb = getFirebaseDb();
        return new Promise((resolve, reject) => 
        {
            rdb.ref('products').child(productId).remove()
            .then(result => 
            {
                resolve({
                    message: 'Producto eliminado correctamente'
                });
            })
            .catch(err => 
            {
                reject('Error al eliminar el producto en Firebase');
            });
        });
    }

    static deleteByIdMongo(productId)
    {
        const mdb = getMongoDb();
        return new Promise((resolve, reject) => 
        {
            mdb.collection('products').deleteOne({_id: new mongodb.ObjectId(productId)})
            .then(result => 
            {
                resolve({
                    message: 'Producto eliminado correctamente'
                });
            })
            .catch(err => 
            {
                reject('Error al eliminar el producto en MongoDb');
            });
        });
    }

    constructor(title, price, image, id)
    {
        this.title = title;
        this.price = price;
        this.imageUrl = image;
        this.id = id;
    }

    saveFirebase() 
    {
        const rdb = getFirebaseDb();
        return new Promise((resolve, reject) => 
        {
            rdb.ref('products').push({
                title: this.title,
                price: this.price,
                imageUrl: this.imageUrl
            })
            .then(ref => 
            {
                const imageUrl = `${serverConfig.scheme}://${serverConfig.server}/${this.imageUrl}`;
                resolve({
                    message: 'Producto agregado correctamente',
                    product: {
                        id: ref.key,
                        title: this.title,
                        price: this.price,
                        imageUrl: imageUrl
                    }
                });
            })
            .catch(err => 
            {
                reject('Error al insertar datos en Firebase');
            });
        }); 
    }

    saveMongo() 
    {
        const mdb = getMongoDb();
        return new Promise((resolve, reject) => 
        {
            mdb.collection('products')
            .insertOne({
                title: this.title,
                price: this.price,
                imageUrl: this.imageUrl
            })
            .then(result => 
            {
                const imageUrl = `${serverConfig.scheme}://${serverConfig.server}/${this.imageUrl}`;
                resolve({
                    message: 'Producto agregado correctamente',
                    product: {
                        id: result.insertedId,
                        title: this.title,
                        price: this.price,
                        imageUrl: imageUrl
                    }
                });
            })
            .catch(err => 
            {
                reject('Error al insertar datos en MongoDb');
            });
        }); 
    }

    updateFirebase()
    {
        const rdb = getFirebaseDb();
        return new Promise((resolve, reject) => 
        {
            let updatedProduct = {};
            if(this.title) updatedProduct.title = this.title;
            if(this.price) updatedProduct.price = this.price;
            if(this.image) updatedProduct.image = this.image;
            rdb.ref('products').child(this.id).update(updatedProduct)
            .then(result => 
            {
                resolve({
                    message: 'Producto editado correctamente'
                });
            })
            .catch(err => 
            {
                reject('Error al actualizar datos en Firebase');
            });
        });
    }

    updateMongo()
    {
        const mdb = getMongoDb();
        return new Promise((resolve, reject) => 
        {
            let updatedProduct = {};
            if(this.title) updatedProduct.title = this.title;
            if(this.price) updatedProduct.price = this.price;
            if(this.image) updatedProduct.image = this.image;
            mdb.collection('products')
            .updateOne({_id: new mongodb.ObjectId(this.id)}, 
            {
                $set: updatedProduct
            })
            .then(result => 
            {
                resolve({
                    message: 'Producto editado correctamente'
                });
            })
            .catch(err => 
            {
                reject('Error al actualizar datos en MongoDb');
            });
        });
    }
}