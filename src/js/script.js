/**
 * Created by Michał_2 on 2017-03-07.
 */

var CommentApp = {
    //variables
    URL: 'https://jsonplaceholder.typicode.com',
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
                CommentApp.drawComments(response);
            },
            error: function () {
                CommentApp.showErrorAlert('Getting comments error!');
            }
        });
    },

    showErrorAlert: function (message) {
        alert(message);
    },

    drawComments: function (comments) {
        // limit comments length
        var sliceComments = comments.slice(0, 20);
        $.each(sliceComments, function (index, item) {
            CommentApp.mustacheRender(item, '#template', '#target');
        });
    },

    mustacheRender: function (data, id, target) {
        var template = $(id).html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, data);
        $(target).append(rendered);
    },

    removeComment: function (id, e) {
        $.ajax({
            url: CommentApp.URL + '/posts/' + id,
            type: 'DELETE',
            success: function () {
                $(e).closest('.comment-detail').remove();
            },
            error: function () {
                CommentApp.showErrorAlert('Removing comment error')
            }
        });
    },

    onSend: function (btn) {
        $(btn).on('click', function () {
            CommentApp.validation(btn);
            CommentApp.getFormData($('.mui-form'))
        });
    },

    resetForm: function () {
        setTimeout(function () {
            $('.mui-form')[0].reset();
        }, 2000)
    },

    drawAddedComment: function (btn, id) {
        console.log(id);
        var block = '';
        var formData = CommentApp.getFormData($('.mui-form'));
        block += '<div class="comment-detail mui-col-md-4 mui-col-xs-6">';
        block += '<div class="flex-column data-box width100">';
        block += '<a href="#" class="btn-delete"><i class="fa fa-trash" aria-hidden="true" onclick="CommentApp.removeComment(' + id + ', event.target)"></a></i>';
        block += '<span>' + formData.name + '</span>';
        block += '<span class="comment-content"><q>' + formData.comment + '</q></span>';
        block += '<span>' + formData.email + '</span>';
        block += '</div>';
        block += '</div>';
        $('.comment-box').prepend(block);

    },
    sendAddedComment: function (btn) {
        $.ajax({
            type: "POST",
            url: CommentApp.URL + '/comments',
            success: function (response) {
                console.log(response);
                CommentApp.drawAddedComment(btn, response.id);
            }
        });
    },

    getFormData: function (form) {
        form = form.serializeArray();
        var obj = {};
        $.each(form, function (index, item) {
            obj[item.name] = item.value;
        });
        return obj;
    },

    validation: function (btn) {
        var formData = CommentApp.getFormData($('.mui-form'));
        if (formData.name === '' ||
            formData.comment === '' ||
            formData.name.email === '' || !formData.email.match(CommentApp.EMAIL_REGEX)) {
            CommentApp.throwError();
            return false
        } else {
            CommentApp.destroyMessage();
            CommentApp.sendAddedComment(btn);
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