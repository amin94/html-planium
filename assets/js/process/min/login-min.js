$(document).ready(function(){$("form").submit(function(s){$(".form-group").removeClass("has-error"),$(".help-block").remove();var a={email:$("input[name=email]").val(),passwd:$("input[name=passwd]").val()};$(".submit_txt").fadeOut("fast"),$(".process_txt").delay(200).fadeIn("fast"),$(".signup_btn").removeClass("btn-primary"),$(".signup_btn").addClass("signup_btn_process"),$.ajax({type:"POST",url:"http://amins-macbook-pro.local:5757/html-planium/main-planium/login_process.php",data:a,dataType:"json",encode:!0}).done(function(s){console.log(s),s.success?window.location.href="projects.php":($(".submit_txt").delay(200).fadeIn("fast"),$(".process_txt").fadeOut("fast"),$(".signup_btn").addClass("btn-primary"),$(".signup_btn").removeClass("signup_btn_process"),s.errors.email&&($("#email_group").addClass("has-error"),$("#email_group").append('<div class="help-block">'+s.errors.email+"</div>")),s.errors.passwd&&($("#passwd_group").addClass("has-error"),$("#passwd_group").append('<div class="help-block">'+s.errors.passwd+"</div>")),s.errors.serverCon&&$("#submit_group").append('<div class="help-block">'+s.errors.serverCon+"</div>"),s.errors.wrongData&&$("#submit_group").append('<div class="help-block">'+s.errors.wrongData+"</div>"))}).fail(function(s){console.log(s),$(".submit_txt").delay(200).fadeIn("fast"),$(".process_txt").fadeOut("fast"),$(".signup_btn").addClass("btn-primary"),$(".signup_btn").removeClass("signup_btn_process"),swal("خطا!","ارتباط با سرور قطع شده است!","error",{button:"تلاش مجدد"})}),s.preventDefault()})});