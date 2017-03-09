var userApp = {
    //variables
    URL: 'https://jsonplaceholder.typicode.com',

    //init
    init: function () {
        userApp.onShowUsers($('.show-users'));
        userApp.onHideUsers($('.hide-users'));
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
            userApp.showButton();
        });
    },
    onHideUsers: function (btn) {
        $(btn).on('click', function () {
            userApp.removeUsers();
        });
    },

    drawUsers: function (users) {
        var userBlock = '';
        userBlock += '<div class="mui-container">';
        userBlock += '<div class="mui-row">';
        for (var i = 0; i < users.length; i++) {
            userBlock += '<div class="mui-col-md-6 mui-col-xs-12">';
            userBlock += '<div class="user-box data-box flex-column">';
            userBlock += '<span class="name">' + users[i].name + '</span>';
            userBlock += '<span class="email">' + users[i].email + '</span>';
            userBlock += '<span class="phone">' + users[i].phone + '</span>';
            userBlock += '<span class="website">' + users[i].website + '</span>';
            userBlock += '</div>';
            userBlock += '</div>';
        }
        userBlock += '</div>';
        userBlock += '</div>';
        console.log(userBlock);
        $('.user-subpage-content').prepend(userBlock);
    },
    //removeUsers: function (id) {
    //    $.ajax({
    //        url: userApp.URL + '/users/' + id,
    //        type: 'DELETE',
    //        success: function () {
    //            $('.user-subpage-content').remove();
    //        },
    //        error: function () {
    //            console.log('Error')
    //        }
    //    });
    //},
    removeUsers: function() {
        $('.user-subpage-content').remove();
    },

    showButton: function () {
        $('.hide-users').fadeIn('fast').css('display', 'inline-block');
    }


};
$(document).ready(function () {
    userApp.init();
});