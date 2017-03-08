/**
 * Created by Michał_2 on 2017-03-07.
 */

var CommentApp = {
    //variables
    URL: 'https://jsonplaceholder.typicode.com',
    COMMENT_ID: '0',


    //init
    init: function () {
        CommentApp.getComments();
        CommentApp.onSend($('.btn-add'));
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
        CommentApp.COMMENT_ID++;
        var box = "";
        box += '<div class="mui-col-xs-10 mui-col-xs-offset-1 padding0">';
        box += '<div class="mui-row comment-box">';
        for (var i = 0; i < 15; i++) {
            box += '<div class="comment-detail mui-col-md-4 mui-col-lg-3 mui-col-xs-5 mui-col-xs-offset-1">';
            box += '<a href="#"><i class="fa fa-trash" aria-hidden="true bin-delete" onclick="CommentApp.removeComments(' + comments[i].id + ', event.target)"></a></i>';
            box += '<span class="name">' + comments[i].name + '</span>';
            box += '<span class="body"><q>' + comments[i].body + '</q></span>';
            box += '<span class="email">' + comments[i].email + '</span>';
            box += '</div>';
        }
        box += '</div>';
        box += '</div>';
        console.log(comments[i].id);
        console.log(CommentApp.COMMENT_ID);
        $('.comments-section').append(box);
    },

    removeComments: function (id, e) {
        event.preventDefault();
        console.log(e);
        console.log(id);
        console.log($(e).parent().parent());
        $(e).closest('.comment-detail').remove();
    },

    onSend: function (btn) {
        $(btn).on('click', function (e) {
            CommentApp.getInputValue(btn);
            CommentApp.resetForm();
        });
    },

    resetForm: function () {
        setTimeout(function(){
            $('.mui-form')[0].reset();
        }, 2000)
    },

    getInputValue: function (btn) {
        CommentApp.COMMENT_ID++;
        console.log($(btn).parent().find('input[name=name]').val());
        var titleValue = ($(btn).parent().find('input[name=name]').val());
        var commentValue = ($(btn).parent().find('input[name=comment]').val());
        var emailValue = ($(btn).parent().find('input[name=email]').val());

        console.log(titleValue, commentValue, emailValue);
        var block = "";
        block += '<div class="comment-detail mui-col-md-4 mui-col-lg-3 mui-col-xs-5 mui-col-xs-offset-1">';
        block += '<a href="#"><i class="fa fa-trash" aria-hidden="true bin-delete" onclick="CommentApp.removeComments(' + CommentApp.COMMENT_ID + ', event.target)"></a></i>';
        block += '<span class="name">' + titleValue + '</span>';
        block += '<span class="body"><q>' + commentValue + '</q></span>';
        block += '<span class="email">' + emailValue + '</span>';
        block += '</div>';

        $('.comment-box').prepend(block);
    }


};

$(document).ready(function () {
    CommentApp.init();
});