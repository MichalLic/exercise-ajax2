/**
 * Created by Michał_2 on 2017-03-07.
 */

var CommentApp = {
    //variables
    URL: 'https://jsonplaceholder.typicode.com',
    COMMENT_ID: '0',
    EMAIL_REGEX: /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/,
    ERROR_TEXT_CL: '.error-text',

    //init
    init: function () {
        CommentApp.getComments();
        CommentApp.onSend($('.btn-add'));
        CommentApp.scroll();
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
        for (var i = 0; i < 14; i++) {
            box += '<div class="comment-detail mui-col-md-4 mui-col-xs-5">';
            box += '<div class="flex-container">';
            box += '<a href="#" class="btn-delete"><i class="fa fa-trash" aria-hidden="true" onclick="CommentApp.removeComments(' + comments[i].id + ', event.target)"></a></i>';
            box += '<span class="name">' + comments[i].name + '</span>';
            box += '<span class="body"><q>' + comments[i].body + '</q></span>';
            box += '<span class="email">' + comments[i].email + '</span>';
            box += '</div>';
            box += '</div>';
        }

        box += '</div>';
        box += '</div>';
        $('.comments-section').append(box);
    },

    removeComments: function (id, e) {
        event.preventDefault();
        $(e).closest('.comment-detail').remove();
    },

    onSend: function (btn) {
        $(btn).on('click', function (e) {
            CommentApp.validation(btn);
        });
    },

    resetForm: function () {
        setTimeout(function () {
            $('.mui-form')[0].reset();
        }, 2000)
    },

    getInputValue: function (btn) {
        CommentApp.COMMENT_ID++;
        var block = "";
        var inputValue = {
            titleValue: ($(btn).parent().find('input[name=name]').val()),
            commentValue: ($(btn).parent().find('input[name=comment]').val()),
            emailValue: ($(btn).parent().find('input[name=email]').val())
        };
        block += '<div class="comment-detail mui-col-md-4 mui-col-lg-3 mui-col-xs-5 mui-col-xs-offset-1">';
        block += '<a href="#"><i class="fa fa-trash" aria-hidden="true bin-delete" onclick="CommentApp.removeComments(' + CommentApp.COMMENT_ID + ', event.target)"></a></i>';
        block += '<span class="name">' + inputValue.titleValue + '</span>';
        block += '<span class="body"><q>' + inputValue.commentValue + '</q></span>';
        block += '<span class="email">' + inputValue.emailValue + '</span>';
        block += '</div>';

        $('.comment-box').prepend(block);
    },

    validation: function (btn) {
        if ($(btn).parent().find('input[name=name]').val() == '' ||
            $(btn).parent().find('input[name=comment]').val() == '' ||
            $(btn).parent().find('input[name=email]').val() == '' ||
            !$(btn).parent().find('input[name=email]').val().match(CommentApp.EMAIL_REGEX)) {
            CommentApp.throwError();
            return false
        } else {
            CommentApp.destroyMessage();
            CommentApp.getInputValue(btn);
            CommentApp.resetForm();
        }
    },

    throwError: function () {
        $(CommentApp.ERROR_TEXT_CL).fadeIn('fast');
    },

    destroyMessage: function () {
        $(CommentApp.ERROR_TEXT_CL).fadeOut('slow');
    },

    scroll: function () {
        $("a[href='#top']").on('click', function() {
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });
    }
};

$(document).ready(function () {
    CommentApp.init();
});