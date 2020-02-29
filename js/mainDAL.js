/*
* mainDAL.js
* Created by: Marcus Rodrigues
* 
* Purpose: Enable CRUD for our database.
* 
* Revision History: Marcus Rodrigues, April 14/2019: Created. 
*/

// CRUD for the 'blogs_stats' table
var BlogStats = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO blog_stats (title, blogTypeId, author," + 
                "commentsEnabled, datePosted, blogVisits, tags, content)" +
                "VALUES (?,?,?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE blog_stats " +
                "SET title=?, blogTypeId=?, author=?, commentsEnabled=?," +
                "datePosted=?, blogVisits=?, tags=?, content=? " +
                "WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM blog_stats " + 
                "WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT *" +
                "FROM blog_stats " +
                "WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT *" +
                "FROM blog_stats;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

// CRUD for the 'blog_type' table
var BlogType = {
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT *" +
                "FROM blog_type;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
