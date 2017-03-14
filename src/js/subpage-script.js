var userApp = {
    //variables
    URL: 'https://jsonplaceholder.typicode.com',

    //init
    init: function () {
        userApp.getUsers();
    },

    //function
    getUsers: function () {
        $.ajax({
            url: CommentApp.URL + '/users',
            method: 'GET',
            success: function (response) {
                userApp.drawUsers(response);
            },
            error: function () {
                CommentApp.showErrorAlert('Getting data error!');
            }
        });
    },

    drawUsers: function (users) {
        $.each(users, function (index, item) {
            CommentApp.mustacheRender(item, '#template-user', '#target-user');
        });
    },

    removeUser: function (id, btn) {
        $.ajax({
            url: userApp.URL + '/users/' + id,
            type: 'DELETE',
            success: function () {
                $(btn).closest('.user-box').remove();
            },
            error: function () {
                CommentApp.showErrorAlert('Removing user error')
            }
        });
    }
};

$(document).ready(function () {
    userApp.init();
});