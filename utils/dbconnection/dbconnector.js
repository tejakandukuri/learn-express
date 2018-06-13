var appConstants = require('../../helpers/constants.json');

var MongoClient = require('mongodb').MongoClient;

var Q = require('q');

var dbURL = process.env.MONGODB_URI || appConstants.dbConfig.url,
    dbName = appConstants.dbConfig.dbName;

var dbConnector = {

    insertOne: function (collectionName, data) {
        var deferred = Q.defer();
        MongoClient.connect(dbURL, function(err, db) {
            if (err) throw err;
            var dbInstance = db.db(dbName);
            dbInstance.collection(collectionName).insertOne(data, function(err, res) {
                if (err) deferred.reject(err);
                db.close();
                deferred.resolve(res);
            });
        });
        return deferred.promise;
    },

    insertMany: function (collectionName, data) {
        var deferred = Q.defer();
        MongoClient.connect(dbURL, function(err, db) {
            if (err) throw err;
            var dbInstance = db.db(dbName);
            dbInstance.collection(collectionName).insertMany(data, function(err, res) {
                if (err) deferred.reject(err);
                db.close();
                deferred.resolve(res);
            });
        });
        return deferred.promise;
    },

    findOne: function (collectionName) {
        var deferred = Q.defer();
        MongoClient.connect(dbURL, function(err, db) {
            if (err) throw err;
            var dbInstance = db.db(dbName);
            dbInstance.collection(collectionName).findOne({}, function(err, res) {
                if (err) deferred.reject(err);
                db.close();
                deferred.resolve(res);
            });
        });
        return deferred.promise;
    },

    findAll: function (collectionName) {
        var deferred = Q.defer();
        MongoClient.connect(dbURL, function(err, db) {
            if (err) throw err;
            var dbInstance = db.db(dbName);
            dbInstance.collection(collectionName).find({}).toArray(function(err, res) {
                if (err) deferred.reject(err);
                db.close();
                deferred.resolve(res);
            });
        });
        return deferred.promise;
    },

    findSome: function(collectionName, fieldKeys) {
        var fieldsToDisplay = fieldKeys ? fieldKeys : {}, deferred = Q.defer();
        MongoClient.connect(dbURL, function(err, db) {
            if (err) throw err;
            var dbInstance = db.db(dbName);
            dbInstance.collection(collectionName).find(fieldsToDisplay).toArray(function(err, res) {
                if (err) deferred.reject(err);
                db.close();
                deferred.resolve(res);
            });
        });
        return deferred.promise;
    },

    queryBy: function (collectionName, queryObj) {
        var query = queryObj ? queryObj : {}, deferred = Q.defer();
        MongoClient.connect(dbURL, function(err, db) {
            if (err) throw err;
            var dbInstance = db.db(dbName);
            dbInstance.collection(collectionName).find(query).toArray(function(err, res) {
                if (err) deferred.reject(err);
                db.close();
                deferred.resolve(res);
            });
        });
        return deferred.promise;
    },

    queryFindSortLimitBy: function (collectionName, queryObj, fieldKeys, limit, sortingObj) {
        var query = queryObj ? queryObj : {},
            fieldsToDisplay = fieldKeys ? fieldKeys : {},
            limitCount = limit ? limit : 100,
            soryBy = sortingObj ? sortingObj : {}, deferred = Q.defer();

        MongoClient.connect(dbURL, function(err, db) {
            if (err) throw err;
            var dbInstance = db.db(dbName);
            dbInstance.collection(collectionName).find(query, fieldsToDisplay).limit(limitCount).sort(soryBy).toArray(function(err, res) {
                if (err) deferred.reject(err);
                db.close();
                deferred.resolve(res);
            });
        });
        return deferred.promise;
    },

    sortOnly: function (collectionName, sortingObj) {
        var soryBy = sortingObj ? sortingObj : {}, deferred = Q.defer();

        MongoClient.connect(dbURL, function(err, db) {
            if (err) throw err;
            var dbInstance = db.db(dbName);
            dbInstance.collection(collectionName).find().sort(soryBy).toArray(function(err, res) {
                if (err) deferred.reject(err);
                db.close();
                deferred.resolve(res);
            });
        });
        return deferred.promise;
    },

    deleteOne: function (collectionName, deleteObj) {
        var deferred = Q.defer();
        MongoClient.connect(dbURL, function(err, db) {
            if (err) throw err;
            var dbInstance = db.db(dbName);
            dbInstance.collection(collectionName).deleteOne(function(err, res) {
                if (err) deferred.reject(err);
                db.close();
                deferred.resolve(res);
            });
        });
        return deferred.promise;
    },

    deleteMany: function (collectionName, deleteObj) {
        var deferred = Q.defer();
        MongoClient.connect(dbURL, function(err, db) {
            if (err) throw err;
            var dbInstance = db.db(dbName);
            dbInstance.collection(collectionName).deleteMany(function(err, res) {
                if (err) deferred.reject(err);
                db.close();
                deferred.resolve(res);
            });
        });
        return deferred.promise;
    },

    updateOne: function (collectionName, oldObj, newObj) {
        var oldData = oldObj ? oldObj : {},
            newData = newObj ? newObj : {};

        newData = { $set: newData }, deferred = Q.defer();

        MongoClient.connect(dbURL, function(err, db) {
            if (err) throw err;
            var dbInstance = db.db(dbName);
            dbInstance.collection(collectionName).updateOne(oldData, newData, function(err, res) {
                if (err) deferred.reject(err);
                db.close();
                deferred.resolve(res);
            });
        });
        return deferred.promise;
    },

    updateMany: function (collectionName, oldObj, newObj) {
        var oldData = oldObj ? oldObj : {},
            newData = newObj ? newObj : {};

        newData = { $set: newData }, deferred = Q.defer();

        MongoClient.connect(dbURL, function(err, db) {
            if (err) throw err;
            var dbInstance = db.db(dbName);
            dbInstance.collection(collectionName).updateMany(oldData, newData, function(err, res) {
                if (err) deferred.reject(err);
                db.close();
                deferred.resolve(res);
            });
        });
        return deferred.promise;
    },

    limit: function (collectionName, limitCount) {
        var deferred = Q.defer();
        MongoClient.connect(dbURL, function(err, db) {
            if (err) throw err;
            var dbInstance = db.db(dbName);
            dbInstance.collection(collectionName).find().limit(limitCount).toArray(function(err, res) {
                if (err) deferred.reject(err);
                db.close();
                deferred.resolve(res);
            });
        });
        return deferred.promise;
    }
};

module.exports = dbConnector;
