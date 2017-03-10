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
                console.log(response);
                userApp.drawUsers(response);
            },
            error: function () {
                console.log('Getting data error!')
            }
        });
    },
    

    //drawUsers: function (users) {
    //    var userBlock = '';
    //    userBlock += '<div class="mui-container mui-table">';
    //    userBlock += '<div class="mui-row flex-wrap">';
    //    userBlock += '<div class="mui-row flex-wrap">';
    //    for (var i = 0; i < users.length; i++) {
    //        userBlock += '<div class="user-box mui-col-md-6 mui-col-xs-12">';
    //        userBlock += '<div class="data-box flex-1">';
    //        userBlock += '<div class="flex-column mui-col-xs-6 padding0">';
    //        userBlock += '<span class="name">' + users[i].name + '</span>';
    //        userBlock += '<span class="email">' + users[i].email + '</span>';
    //        userBlock += '<span class="phone">' + users[i].phone + '</span>';
    //        userBlock += '<span class="website">' + users[i].website + '</span>';
    //        userBlock += '</div>';
    //        userBlock += '<div class="mui-col-xs-6 padding0 mui--text-right">';
    //        userBlock += '<a href="#" class="go-to hide-users" onclick="userApp.removeUsers('+ users[i].id +', event.target)">Hide Users</a>';
    //        userBlock += '</div>';
    //        userBlock += '</div>';
    //        userBlock += '</div>';
    //    }
    //    userBlock += '</div>';
    //    userBlock += '</div>';
    //    $('.user-subpage-content').append(userBlock);
    //},

    drawUsers: function (users) {
        var userBlock = '';
        userBlock += '<div class="mui-col-xs-12 mui-col-md-offset-1 mui-col-md-10">';
        userBlock += '<table class="mui-table">';
        userBlock += '<thead>';
        userBlock += '<tr>';
        userBlock += '<th>Name</th>';
        userBlock += '<th>Email</th>';
        userBlock += '<th>Phone</th>';
        userBlock += '<th>Website</th>';
        userBlock += '<th></th>';
        userBlock += '</tr>';
        userBlock += '</thead>';
        userBlock += '<tbody>';
        for (var i = 0; i < users.length; i++) {
            userBlock += '<tr>';
            userBlock += '<td><span class="name">' + users[i].name + '</span></td>';
            userBlock += '<td><span class="email">' + users[i].email + '</span></td>';
            userBlock += '<td><span class="phone">' + users[i].phone + '</span></td>';
            userBlock += '<td><span class="website">' + users[i].website + '</span></td>';
            userBlock += '<td><a href="#" class="go-to" onclick="userApp.removeUsers(' + users[i].id + ', event.target)">Hide</a></tr></tr>';
            userBlock += '</tr>';
        }
        userBlock += '</tbody>';
        userBlock += '</table>';
        userBlock += '</div>';
        $('.user-subpage-content').append(userBlock);
    },

    removeUsers: function (id, btn) {
        $.ajax({
            url: userApp.URL + '/users/' + id,
            type: 'DELETE',
            success: function () {

                $(btn).closest('tr').remove();
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