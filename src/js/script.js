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

    drawComments: function (comments) {
        var box = "";
        box += '<div class="mui-col-xs-10 mui-col-xs-offset-1 padding0">';
        box += '<div class="mui-row comment-box">';
         for (var i = 0; i < 15; i++){
             box += '<div class="comment-detail mui-col-md-4 mui-col-lg-3 mui-col-xs-5 mui-col-xs-offset-1">';
             box += '<a href="#"><i class="fa fa-trash" aria-hidden="true bin-delete" onclick="CommentApp.removeComments('+ comments[i].id +', event.target)"></a></i>';
             box += '<span class="name">'+ comments[i].name +'</span>';
             box += '<span class="body"><q>'+ comments[i].body +'</q></span>';
             box += '<span class="email">'+ comments[i].email +'</span>';
             box += '</div>';

        }
        box += '</div>';
        box += '</div>';

        $('.comments-section').append(box);
    },


    removeComments: function (id, e) {
        event.preventDefault();
        console.log(e);
        console.log(id);
        console.log($(e).parent().parent());
        $(e).closest('.comment-detail').remove();
    }






};

$(document).ready(function () {
    CommentApp.init();
});