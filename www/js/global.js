/*
* global.js
* Created by: Marcus Rodrigues
* 
* Purpose: Main event handler library.
* 
* Revision History: Marcus Rodrigues, April 13/2019: Created.
* Marcus Rodrigues, April 14/2019: Implemented functions in order to utilize the database.
*/

// Create and insert a new blog into the database
function createBlog_click() {
    createBlog();
    if (createBlog()) {
        insertBlogIntoDB();
    }
}

// Update blog
function editBlog_click() {
    editBlog();
    if (editBlog()) {
        updateBlog();
    }
}

// Delete a blog
function deleteBlog_click() {
    deleteBlog();
}

// Retrieve all the blogs from the database then show them all on the dashboard
function BlogItDashboard_show() {
    retrieveAllBlogs();
}

function BlogItEditBlogPage_show () {
    showSelectedBlog();
}

// Retrieve the current date
function getTodaysDate() {
    var now = new Date();
    var month = (now.getMonth() + 1);               
    var day = now.getDate();
    if (month < 10) 
        month = "0" + month;
    if (day < 10) 
        day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;
    $('#blogit_date_posted').val(today);
    $('#blogit_date_posted_edit').val(today);
}

function init() {
    $('#blogit_createblog').on('click', createBlog_click);
    $('#blogit_update_blog_edit').on('click', editBlog_click);
    $('#blogit_delete_blog_edit').on('click', deleteBlog_click);
    $("#BlogItDashboardPage").on("pageshow", BlogItDashboard_show);
    $("#BlogItEditBlogPage").on("pageshow", BlogItEditBlogPage_show);

    $('#blogit_tags').tagsInput();
    $('#blogit_tags_edit').tagsInput();

    getTodaysDate();
}

function initDB() {
    try{
        DB.BlogItcreateDatabase();
        if (db) {
            console.info("Creating Tables...");
            DB.BlogItdropTables();
            DB.BlogItcreateTables();
        }
        else{
            console.error("[ERROR] Cannot create tables: Database does not exist!");
        }
    } catch(e){
        console.error("[ERROR] (Fatal) Error in initDB(). Cannot proceed.");
    }
}

$(document).ready(function () {
    init();
    initDB();
});