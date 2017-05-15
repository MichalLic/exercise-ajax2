var CommentApp={URL:"https://jsonplaceholder.typicode.com",EMAIL_REGEX:/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/,ERROR_TEXT_CL:".error-text",init:function(){CommentApp.getComments(),CommentApp.onSend($(".btn-add")),CommentApp.scrollToTop()},getComments:function(){$.ajax({url:CommentApp.URL+"/comments",method:"GET",success:function(e){CommentApp.drawComments(e)},error:function(){CommentApp.showErrorAlert("Getting comments error!")}})},showErrorAlert:function(e){alert(e)},drawComments:function(e){var t=e.slice(0,20);$.each(t,function(e,t){CommentApp.mustacheRender(t,"#template","#target")})},mustacheRender:function(e,t,o){var n=$(t).html();Mustache.parse(n);var m=Mustache.render(n,e);$(o).append(m)},removeComment:function(e,t){$.ajax({url:CommentApp.URL+"/posts/"+e,type:"DELETE",success:function(){$(t).closest(".comment-detail").remove()},error:function(){CommentApp.showErrorAlert("Removing comment error")}})},onSend:function(e){$(e).on("click",function(){CommentApp.validation(e),CommentApp.getFormData($(".mui-form"))})},resetForm:function(){setTimeout(function(){$(".mui-form")[0].reset()},2e3)},drawAddedComment:function(e,t){console.log(t);var o="",n=CommentApp.getFormData($(".mui-form"));o+='<div class="comment-detail mui-col-md-4 mui-col-xs-6">',o+='<div class="flex-column data-box width100">',o+='<a href="#" class="btn-delete"><i class="fa fa-trash" aria-hidden="true" onclick="CommentApp.removeComment('+t+', event.target)"></a></i>',o+="<span>"+n.name+"</span>",o+='<span class="comment-content"><q>'+n.comment+"</q></span>",o+="<span>"+n.email+"</span>",o+="</div>",o+="</div>",$(".comment-box").prepend(o)},sendAddedComment:function(e){$.ajax({type:"POST",url:CommentApp.URL+"/comments",success:function(t){console.log(t),CommentApp.drawAddedComment(e,t.id)}})},getFormData:function(e){e=e.serializeArray();var t={};return $.each(e,function(e,o){t[o.name]=o.value}),t},validation:function(e){var t=CommentApp.getFormData($(".mui-form"));return""!==t.name&&""!==t.comment&&""!==t.name.email&&t.email.match(CommentApp.EMAIL_REGEX)?(CommentApp.destroyMessage(),CommentApp.sendAddedComment(e),CommentApp.resetForm(),void 0):(CommentApp.throwError(),!1)},throwError:function(){$(CommentApp.ERROR_TEXT_CL).fadeIn("fast")},destroyMessage:function(){$(CommentApp.ERROR_TEXT_CL).fadeOut("slow")},scrollToTop:function(){$("a[href='#top']").on("click",function(){return $("html, body").animate({scrollTop:0},"slow"),!1})}};$(document).ready(function(){CommentApp.init()});var userApp={URL:"https://jsonplaceholder.typicode.com",init:function(){userApp.getUsers()},getUsers:function(){$.ajax({url:CommentApp.URL+"/users",method:"GET",success:function(e){userApp.drawUsers(e)},error:function(){CommentApp.showErrorAlert("Getting data error!")}})},drawUsers:function(e){$.each(e,function(e,t){CommentApp.mustacheRender(t,"#template-user","#target-user")})},removeUser:function(e,t){$.ajax({url:userApp.URL+"/users/"+e,type:"DELETE",success:function(){$(t).closest(".user-box").remove()},error:function(){CommentApp.showErrorAlert("Removing user error")}})}};$(document).ready(function(){userApp.init()});
//# sourceMappingURL=app.js.map
