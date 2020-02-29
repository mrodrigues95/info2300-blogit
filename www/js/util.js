/*
* util.js
* Created by: Marcus Rodrigues
* 
* Purpose: Control validation logic for our forms.
* 
* Revision History: Marcus Rodrigues, April 13/2019: Created. 
*/

// Validate "Create Blog" form
function doValidate_CreateBlogForm() {
    var form = $('#frm_create_blog');
    form.validate({
        rules: {
            blogit_title: {
                required: true,
                rangelength: [2, 60]
            },
            blogit_main_textarea: {
                required: true
            },
            blogit_tags: {
                required: false
            }
        },
        messages: {
            blogit_title: {
                required: "You must specify a blog title",
                rangelength: "Length must be 2-60 characters long"
            },
            blogit_main_textarea: {
                required: "You must specify content for your blog"
            }
        }
    });
    return form.valid();
}

// Validate "Edit Blog" form
function doValidate_EditBlogForm() {
    var form = $('#frm_edit_blog');
    form.validate({
        rules: {
            blogit_title_edit: {
                required: true,
                rangelength: [2, 60]
            },
            blogit_main_textarea_edit: {
                required: true
            },
            blogit_tags: {
                required: false
            }
        },
        messages: {
            blogit_title_edit: {
                required: "You must specify a blog title",
                rangelength: "Length must be 2-60 characters long"
            },
            blogit_main_textarea_edit: {
                required: "You must specify content for your blog"
            }
        }
    });
    return form.valid();
}

function createBlog() {
    // Check if the form passes our validation tests
    if (doValidate_CreateBlogForm()) {
        console.log("Validation successful.");
        return true;
    } else {
        console.error("[ERROR] Validation NOT SUCCESSFUL.");
        return false;
    }
}

function editBlog() {
    // Check if the form passes our validation tests
    if (doValidate_EditBlogForm()) {
        console.log("Validation successful.");
        return true;
    } else {
        console.error("[ERROR] Validation NOT SUCCESSFUL.");
        return false;
    }
}