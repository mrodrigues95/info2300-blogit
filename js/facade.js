/*
* facade.js
* Created by: Marcus Rodrigues
* 
* Purpose: Perform maintenace on the database (CRUD operations).
* 
* Revision History: Marcus Rodrigues, April 14/2019: Created.
*/

// Add blog to the 'blog_stats' table
function insertBlogIntoDB() {
    // Fetch data from form
    var title = $("#blogit_title").val();
    var blogTypeId = $("#blogit_blog_type :selected").val();
    var author = "Marcus Rodrigues"
    var commentsEnabled;
    var datePosted = $("#blogit_date_posted").val();
    var blogVisits = Math.floor((Math.random() * 10000) + 1);
    var tags = $("#blogit_tags").val();
    var content = $("#blogit_main_textarea").val();
    var typeId;

    // Set blogTypeId
    if (blogTypeId == "Personal")
        typeId = 1;
    else if (blogTypeId == "Hobbies & Passions")
        typeId = 2;
    else if (blogTypeId == "Life Experiences")
        typeId = 3;

    // Check whether the author enabled comments on their blog
    if ($("#blogit_enablefeedback").is(':checked')) {
        commentsEnabled = "Yes";
    } else {
        commentsEnabled = "No";
    }

    var options = [title, typeId, author, commentsEnabled,
        datePosted, blogVisits, tags, content];

    function callback() {
        console.info("Success: Record inserted successfully");
    }
    // Insert new blog into the table
    BlogStats.insert(options, callback);
    alert("Your new blog has been created.");
}

// Select all fields in the 'blogs_stats' table and generate a listview
function retrieveAllBlogs() {
    var options = [];

    function callback(tx, results) {
        var htmlCode = "";
        var visits;
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var tags;
            var blogType;

            if (row['tags'] == "") {
                tags = "None";
            } else {
                tags = row['tags'];
            }

            // Check what kind of blog it is
            if (row['blogTypeId'] == 1) {
                blogType = "Personal";
            } else if (row['blogTypeId'] == 2) {
                blogType = "Hobbies & Passions";
            } else if (row['blogTypeId'] == 3) {
                blogType = "Life Experiences";
            }

            console.info("Id: " + row['id'] +
                " Blog Title: " + row['title'] +
                " Blog Type Id: " + row['blogTypeId'] +
                " Author: " + row['author'] +
                " Comments Enabled: " + row['commentsEnabled'] +
                " Date Posted: " + row['datePosted'] +
                " Visits: " + row['blogVisits'] +
                " Tags: " + row['tags']);

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<h4>Title: " + row['title'] + "</h4>" +
                "<p>Author: " + row['author'] + "</p>" +
                "<p>Blog Type: " + blogType + "</p>" +
                "<p>Date Posted: " + row['datePosted'] + "</p>" +
                "<p>Comments Enabled: " + row['commentsEnabled'] + "</p>" +
                "<p>Visits: " + row['blogVisits'] + "</p>" +
                "<p>Tags: " + tags + "</p>" +
                "</a></li>";
        }

        var lv = $("#blogit_listOfBlogs");

        lv = lv.html(htmlCode);
        lv.listview("refresh"); // This line MUST remain, else it will not work

        // Attach event handler for each list items
        $("#blogit_listOfBlogs a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            //localStorage.setItem("visits", $(this).attr("data-row-id"));

            // Navigate to the 'Edit Blog' page
            $(location).prop('href', '#BlogItEditBlogPage');
        }
    }
    BlogStats.selectAll(options, callback);
}

// Select a specific blog and enable editing
function showSelectedBlog() {
    var id = localStorage.getItem("id");
    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];
        var type;
        localStorage.setItem("visits", row['blogVisits']);

        // Set blog category
        if (row['blogTypeId'] == 1)
            type = "Personal";
        else if (row['blogTypeId'] == 2)
            type = "Hobbies & Passions";
        else if (row['blogTypeId'] == 3)
            type = "Life Experiences";

        console.info("Id: " + row['id'] +
            " Blog Title: " + row['title'] +
            " Blog Type Id: " + row['blogTypeId'] +
            " Author: " + row['author'] +
            " Comments Enabled: " + row['commentsEnabled'] +
            " Date Posted: " + row['datePosted'] +
            " Visits: " + row['blogVisits'] +
            " Tags: " + row['tags']);

        // Place values into the textboxes
        $("#blogit_title_edit").val(row['title']);
        $("form select[name=blogit_blog_type_edit]").val(type).change();
        $("#blogit_main_textarea_edit").val(row['content']);
        $("#blogit_tags_edit").val(row['tags']);
        $("#blogit_date_posted_edit").val(row['datePosted']);

        // Check if comments are enabled or disabled
        if (row['commentsEnabled'] == "No") {
            $('#blogit_enablefeedback_edit').prop('checked', false).checkboxradio('refresh');
        } else {
            $('#blogit_enablefeedback_edit').prop('checked', true).checkboxradio('refresh');
        }
    }
    BlogStats.select(options, callback);
}

// Update a blog
function updateBlog() {
    var id = localStorage.getItem("id");

    // Fetch data from form
    var title = $("#blogit_title_edit").val();
    var blogTypeId = $("#blogit_blog_type_edit :selected").val();
    var author = "Marcus Rodrigues"
    var commentsEnabled;
    var datePosted = $("#blogit_date_posted_edit").val();
    var blogVisits = localStorage.getItem('visits');
    var tags = $("#blogit_tags_edit").val();
    var content = $("#blogit_main_textarea_edit").val();
    var typeId;

    // Set blogTypeId
    if (blogTypeId == "Personal")
        typeId = 1;
    else if (blogTypeId == "Hobbies & Passions")
        typeId = 2;
    else if (blogTypeId == "Life Experiences")
        typeId = 3;

    // Check whether the author enabled comments on their blog
    if ($("#blogit_enablefeedback").is(':checked')) {
        commentsEnabled = "Yes";
    } else {
        commentsEnabled = "No";
    }

    var options = [title, typeId, author, commentsEnabled,
        datePosted, blogVisits, tags, content, id];

    function callback() {
        console.info("Success: Record updated successfully.");
    }

    BlogStats.update(options, callback);
    localStorage.removeItem('visits')

    alert("Blog updated successfully.")
    // Navigate to the dashboard
    $(location).prop('href', '#BlogItDashboardPage');
}

// Delete a blog
function deleteBlog() {
    var id = localStorage.getItem("id");
    var options = [id];

    function callback() {
        console.info("Success: Record deleted successfully.");
    }
    alert("Blog deleted successfully.")
    // Navigate to the dashboard
    $(location).prop('href', '#BlogItDashboardPage');

    BlogStats.delete(options, callback);
}


