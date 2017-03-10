var CommentApp={URL:"https://jsonplaceholder.typicode.com",COMMENT_ID:"0",EMAIL_REGEX:/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/,ERROR_TEXT_CL:".error-text",init:function(){CommentApp.getComments(),CommentApp.onSend($(".btn-add")),CommentApp.scrollToTop()},getComments:function(){$.ajax({url:CommentApp.URL+"/comments",method:"GET",success:function(e){console.log(e),CommentApp.drawComments(e)},error:function(){console.log("Getting data error!")}})},drawComments:function(e){CommentApp.COMMENT_ID++;var o="";o+='<div class="mui-col-xs-10 mui-col-xs-offset-1 padding0">',o+='<div class="mui-row comment-box">';for(var n=0;n<14;n++)o+='<div class="comment-detail mui-col-md-4 mui-col-xs-6">',o+='<div class="flex-column data-box">',o+='<a href="#" class="btn-delete"><i class="fa fa-trash" aria-hidden="true" onclick="CommentApp.removeComments('+e[n].id+', event.target)"></a></i>',o+='<span class="name">'+e[n].name+"</span>",o+='<span class="body"><q>'+e[n].body+"</q></span>",o+='<span class="email">'+e[n].email+"</span>",o+="</div>",o+="</div>";o+="</div>",o+="</div>",$(".comments-section").append(o)},removeComments:function(e,o){event.preventDefault(),$(o).closest(".comment-detail").remove()},onSend:function(e){$(e).on("click",function(o){CommentApp.validation(e),CommentApp.getFormData($(".mui-form"))})},resetForm:function(){setTimeout(function(){$(".mui-form")[0].reset()},2e3)},getInputValue:function(e){CommentApp.COMMENT_ID++;var o="",n=CommentApp.getFormData($(".mui-form"));o+='<div class="comment-detail mui-col-md-4 mui-col-xs-6">',o+='<div class="flex-column data-box">',o+='<a href="#" class="btn-delete"><i class="fa fa-trash" aria-hidden="true" onclick="CommentApp.removeComments('+CommentApp.COMMENT_ID+', event.target)"></a></i>',o+='<span class="name">'+n.name+"</span>",o+='<span class="body"><q>'+n.comment+"</q></span>",o+='<span class="email">'+n.email+"</span>",o+="</div>",o+="</div>",$(".comment-box").prepend(o)},getFormData:function(e){e=e.serializeArray();var o={};return $.each(e,function(e,n){o[n.name]=n.value}),o},validation:function(e){var o=CommentApp.getFormData($(".mui-form"));return""!=o.name&&""!=o.comment&&""!=o.name.email&&o.email.match(CommentApp.EMAIL_REGEX)?(CommentApp.destroyMessage(),CommentApp.getInputValue(e),CommentApp.resetForm(),void 0):(CommentApp.throwError(),!1)},throwError:function(){$(CommentApp.ERROR_TEXT_CL).fadeIn("fast")},destroyMessage:function(){$(CommentApp.ERROR_TEXT_CL).fadeOut("slow")},scrollToTop:function(){$("a[href='#top']").on("click",function(){return $("html, body").animate({scrollTop:0},"slow"),!1})}};$(document).ready(function(){CommentApp.init()});var userApp={URL:"https://jsonplaceholder.typicode.com",init:function(){userApp.onShowUsers($(".show-users"))},getUsers:function(){$.ajax({url:CommentApp.URL+"/users",method:"GET",success:function(e){console.log(e),userApp.drawUsers(e)},error:function(){console.log("Getting data error!")}})},onShowUsers:function(e){$(e).on("click",function(){userApp.getUsers(),console.log("hahahaha")})},drawUsers:function(e){var o="";o+='<div class="mui-container">',o+='<div class="mui-row flex-wrap">';for(var n=0;n<e.length;n++)o+='<div class="user-box mui-col-md-6 mui-col-xs-12">',o+='<div class="data-box flex-1">',o+='<div class="flex-column mui-col-xs-6 padding0">',o+='<span class="name">'+e[n].name+"</span>",o+='<span class="email">'+e[n].email+"</span>",o+='<span class="phone">'+e[n].phone+"</span>",o+='<span class="website">'+e[n].website+"</span>",o+="</div>",o+='<div class="mui-col-xs-6 padding0 mui--text-right">',o+='<a href="#" class="go-to hide-users" onclick="userApp.removeUsers('+e[n].id+', event.target)">Hide Users</a>',o+="</div>",o+="</div>",o+="</div>";o+="</div>",o+="</div>",$(".user-subpage-content").append(o)},removeUsers:function(e,o){$.ajax({url:userApp.URL+"/users/"+e,type:"DELETE",success:function(){$(o).parent().parent(".data-box",".mui-col-md-6",".mui-col-xs-12").remove()},error:function(){console.log("error")}})}};$(document).ready(function(){userApp.init()});
//# sourceMappingURL=app.js.map
