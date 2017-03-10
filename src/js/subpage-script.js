var userApp = {
    //variables
    URL: 'https://jsonplaceholder.typicode.com',

    //init
    init: function () {
        userApp.onShowUsers($('.show-users'));
    },

    //function
    getUsers: function () {
        $.ajax({
            url: CommentApp.URL + '/users',
            method: 'GET',
            success: function (response) {
                console.log(response);
                userApp.drawUsers(response);
            },
            error: function () {
                console.log('Getting data error!')
            }
        });
    },

    onShowUsers: function (btn) {
        $(btn).on('click', function () {
            userApp.getUsers();
        });
    },

    drawUsers: function (users) {
        var userBlock = '';
        userBlock += '<div class="mui-container">';
        userBlock += '<div class="mui-row flex-wrap">';
        for (var i = 0; i < users.length; i++) {
            userBlock += '<div class="user-box mui-col-md-6 mui-col-xs-12">';
            userBlock += '<div class="data-box flex-1">';
            userBlock += '<div class="flex-column mui-col-xs-6 padding0">';
            userBlock += '<span class="name">' + users[i].name + '</span>';
            userBlock += '<span class="email">' + users[i].email + '</span>';
            userBlock += '<span class="phone">' + users[i].phone + '</span>';
            userBlock += '<span class="website">' + users[i].website + '</span>';
            userBlock += '</div>';
            userBlock += '<div class="mui-col-xs-6 padding0 mui--text-right">';
            userBlock += '<a href="#" class="go-to hide-users" onclick="userApp.removeUsers('+ users[i].id +', event.target)">Hide Users</a>';
            userBlock += '</div>';
            userBlock += '</div>';
            userBlock += '</div>';
        }
        userBlock += '</div>';
        userBlock += '</div>';
        $('.user-subpage-content').append(userBlock);
    },

    removeUsers: function (id, btn) {
        $.ajax({
            url: userApp.URL + '/users/' + id,
            type: 'DELETE',
            success: function () {
                $(btn).closest('.user-box').remove();
            },
            error: function () {
                console.log('error');
            }
        });
    }

};
$(document).ready(function () {
    userApp.init();
});