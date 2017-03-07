var CommentApp={URL:"https://jsonplaceholder.typicode.com",init:function(){CommentApp.getComments()},getComments:function(){$.ajax({url:CommentApp.URL+"/comments",method:"GET",success:function(o){console.log(o)},error:function(){console.log("Getting data error!")}})}};$(document).ready(function(){CommentApp.init()});
//# sourceMappingURL=app.js.map
