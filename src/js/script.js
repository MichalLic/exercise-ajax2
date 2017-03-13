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
        CommentApp.scrollToTop();
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
                console.log('Getting comment error!')
            }
        });
    },

    drawComments: function (comments) {
        CommentApp.COMMENT_ID++;
        $.each(comments, function (index, item) {
            CommentApp.mustacheRender(item, '#template', '#target');
            return index < 13
        });
    },

    mustacheRender: function (data, id, target) {
        var template = $(id).html();
        if(template){
            Mustache.parse(template);
            var rendered = Mustache.render(template, data);
            $(target).append(rendered);
        }
    },

    removeComments: function (id, e) {
        $.ajax({
            url: CommentApp.URL + '/posts/' + id,
            type: 'DELETE',
            success: function () {
                $(e).closest('.comment-detail').remove();
            },
            error: function () {
                console.log('Removing comment error');
            }
        });

    },

    onSend: function (btn) {
        $(btn).on('click', function (e) {
            CommentApp.validation(btn);
            CommentApp.getFormData($('.mui-form'))
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
        var formData = CommentApp.getFormData($('.mui-form'));
        block += '<div class="comment-detail mui-col-md-4 mui-col-xs-6">';
        block += '<div class="flex-column data-box">';
        block += '<a href="#" class="btn-delete"><i class="fa fa-trash" aria-hidden="true" onclick="CommentApp.removeComments(' + CommentApp.COMMENT_ID + ', event.target)"></a></i>';
        block += '<span class="name">' + formData.name + '</span>';
        block += '<span class="body"><q>' + formData.comment + '</q></span>';
        block += '<span class="email">' + formData.email + '</span>';
        block += '</div>';
        block += '</div>';
        $('.comment-box').prepend(block);
    },

    getFormData: function (form) {
        form = form.serializeArray();
        var obj = {};
        $.each(form, function (index, item) {
            obj[item.name] = item.value;
        });
        return obj
    },

    validation: function (btn) {
        var formData = CommentApp.getFormData($('.mui-form'));
        if (formData.name == '' ||
            formData.comment == '' ||
            formData.name.email == '' || !formData.email.match(CommentApp.EMAIL_REGEX)) {
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

    scrollToTop: function () {
        $("a[href='#top']").on('click', function () {
            $("html, body").animate({scrollTop: 0}, "slow");
            return false;
        });
    }
};

$(document).ready(function () {
    CommentApp.init();
});