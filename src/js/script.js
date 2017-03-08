/**
 * Created by Michał_2 on 2017-03-07.
 */

 var CommentApp = {
  //variables
    URL: 'https://jsonplaceholder.typicode.com',


  //init
        init: function (){
            CommentApp.getComments();
        },



  //function
    getComments: function () {
        $.ajax({
            url: CommentApp.URL + '/comments',
            method: 'GET',
            success: function (response) {
                console.log(response);
                CommentApp.drawComments(response);
            },
            error: function () {
                console.log('Getting data error!')
            }
        });
    },

    drawComments: function (data) {
        var box = "";
        box += '<div class="mui-col-xs-10 mui-col-xs-offset-1 padding0">';
        box += '<div class="mui-row comment-box">';
         for (var c = 0; c < 15; c++){
             box += '<div class="comment-detail mui-col-md-4 mui-col-lg-3 mui-col-xs-5 mui-col-xs-offset-1">';
             box += '<span class="name">'+ data[c].name +'</span>';
             box += '<span class="body">'+ data[c].body +'</span>';
             box += '<span class="email">'+ data[c].email +'</span>';
             box += '</div>';
        }
        box += '</div>';
        box += '</div>';

        $('.comments-section').append(box);
    }




};

$(document).ready(function () {
    CommentApp.init();
});