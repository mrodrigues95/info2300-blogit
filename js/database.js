/*
* database.js
* Created by: Marcus Rodrigues
* 
* Purpose: Main creation and entry point for our database.
* 
* Revision History: Marcus Rodrigues, April 14/2019: Created. 
*/

var db;

// Default error handler
function errorHandler(tx, error) {
    console.error("[ERROR] SQL error: " + tx + " (" + error.code + ") : " + error.message);
}

var DB = {
    // Create the database
    BlogItcreateDatabase: function() {
        var shortName= "Blog It";
        var version = "1.0";
        var displayName = "Database for Blog It app";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating Database ...");
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess(){
            console.info("Success: Database created successfully.");
        }
    },
    // Create two tables: blog_type and blog_stats
    BlogItcreateTables: function() {
        function txFunction(tx) {
            console.info("Creating table: blog_type");
            var sql = "CREATE TABLE IF NOT EXISTS blog_type (" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL);";         
            tx.executeSql(sql, options, successCreate, errorHandler);

            var insert = [
                "INSERT INTO blog_type (name) VALUES ('Personal');",
                "INSERT INTO blog_type (name) VALUES ('Hobbies & Passions');",
                "INSERT INTO blog_type (name) VALUES ('Life Experiences');",
            ];

            for (var i in insert) {
                console.log();
                tx.executeSql(insert[i], options, successCreate, errorHandler);
            }
            
            console.info("Creating table: blog_stats");
            var sql2 = "CREATE TABLE IF NOT EXISTS blog_stats (" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "title VARCHAR(60) NOT NULL," +
                "blogTypeId INTEGER NOT NULL," +
                "author VARCHAR(30)," +
                "commentsEnabled TEXT," +
                "datePosted DATE," +
                "blogVisits INTEGER," +
                "tags TEXT," +
                "content TEXT," +
                "FOREIGN KEY(blogTypeId) REFERENCES blog_type(id));";
            tx.executeSql(sql2, options, successCreate, errorHandler);

            // Insert rows into the 'review' table - TESTING PURPOSES
            // var insertReview1 = "INSERT INTO review (businessName, typeId, reviewerEmail, reviewerComments," +
            //     "reviewDate, rating1, rating2, rating3)" +
            //     "VALUES ('Jason Bourne', '2', 'jbourne@conestogac.on.ca', 'good stuff', '2016-03-11', '3', '3', '3');";
            // tx.executeSql(insertReview1, options, successCreate, errorHandler);

            // var insertReview2 = "INSERT INTO review (businessName, typeId, reviewerEmail, reviewerComments," +
            // "reviewDate, rating1, rating2, rating3)" +
            // "VALUES ('James Bond', '1', 'jbourne@conestogac.on.ca', 'not so good', '2016-03-11', '', '', '');";
            // tx.executeSql(insertReview2, options, successCreate, errorHandler);

            var options = [];

            function successCreate() {
                console.info("Success: Create table: blog_type successful.");
                console.info("Success: Create table: blog_stats successful.");
            }        
        }
        function successTransaction() {
            console.info("Success: Create tables transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    // Drop existing tables
    BlogItdropTables: function() {        
        function txFunction(tx) {
            var sql = "DROP TABLE IF EXISTS blog_type;";
            var sql2 = "DROP TABLE IF EXISTS blog_stats;";
            var options = [];
            tx.executeSql(sql, options, successDrop, errorHandler);
            tx.executeSql(sql2, options, successDrop, errorHandler);
            
            function successDrop() {
                console.info("Success: blog_type table dropped successfully.");
                console.info("Success: blog_stats table dropped successfully.");
            }
        }
                
        function successTransaction() {
            console.info("Success: Drop tables transaction successful.");
        }        
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};