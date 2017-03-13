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
    //    userBlock += '<div class="mui-row <!--flex-wrap-->">';
    //    for (var i = 0; i < users.length; i++) {
    //        userBlock += '<div class="user-box data-box padding0 mui-col-xs-10 mui-col-xs-offset-1">';
    //        userBlock += '<div class="set-span  mui-col-md-10 mui-col-xs-8 padding0">';
    //        userBlock += '<span>' + users[i].name + '</span>';
    //        userBlock += '<span>' + users[i].email + '</span>';
    //        userBlock += '<span>' + users[i].phone + '</span>';
    //        userBlock += '<span>' + users[i].website + '</span>';
    //        userBlock += '</div>';
    //        userBlock += '<div class="mui-col-md-2 mui-col-xs-4 padding0 mui--text-center">';
    //        userBlock += '<a href="#" class="go-to hide-users" onclick="userApp.removeUsers(' + users[i].id + ', event.target)">Hide</a>';
    //        userBlock += '</div>';
    //        userBlock += '</div>';
    //    }
    //    userBlock += '</div>';
    //    $('.user-subpage-content').append(userBlock);
    //},

    drawUsers: function (users) {
        $.each(users, function (index, item) {
            userApp.mustacheRender(item);
        });
    },

    mustacheRender: function (item) {
        var template = $('#template').html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, item);
        console.log(item);
        $('#target').append(rendered);
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