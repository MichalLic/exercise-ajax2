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
            },
            error: function () {
                console.log('Getting data error!')
            }
        });
    }





};

$(document).ready(function () {
    CommentApp.init();
});