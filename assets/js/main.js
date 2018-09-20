// functions
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


// check token
var usrtkn = getCookie("usrtkn");
var fName = getCookie("fName");

if (usrtkn=='') {

  // window.location.href = "http://amins-macbook-pro.local:5757/html-planium/";

}


$(document).ready(function() {


    // open popups

    	$(document).on('click', 'a[name=modalLink]', function(e) {

    		e.preventDefault();

        $('.modal').fadeOut();

    		var modalId = $(this).attr('href');

    		$(modalId).fadeIn();

    		$('.mask').fadeIn();

    	});



      // $('a[name=ajaxModalLink]').click(function(e) {
    	// 	//لغو حالت پیش فرض عملکرد لینک
    	// 	e.preventDefault();
      //
      //   var targetUrl = $(this).data("url");
      //   var targetKind = $(this).data("kind");
      //
      //   var modalId = $(this).attr('href');
      //
      //
      //
      // });


    	$('.sidebarMask').click(function(e) {

    		$(this).fadeOut();
    		var maskModalId = $('.sidebarMask').data('modalid');

        $('#'+maskModalId).removeClass('openModal');

    	});

    	$('.mask').click(function(e) {

    		$(this).fadeOut();
    		$('.modal').fadeOut();
    	});


    	$('a[name=closeModal]').click(function(e) {

    		$('.mask').fadeOut();
        var modalId = $(this).attr('href');
    		$(modalId).fadeOut();

    	});






      // sidebar modal

      $(document).on('click', 'a[name=sidebarModal]', function(e) {

        e.preventDefault();
    		//دریافت آیدی عنصر پاپ آپ
    		var modalId = $(this).attr('href');

    		$(modalId).addClass('openModal');

    		$('.sidebarMask').fadeToggle();

      });






      $(document).on('click', 'a[name=ajaxModalLink]', function(e) {

    		e.preventDefault();

        var targetID = $(this).data('targetid');

        $('.modal').fadeOut();

    		var modalId = $(this).attr('href');

    		$(modalId).fadeIn();

    		$('.mask').fadeIn();



        var settings = {
          "url": "http://api.planium.mortz.ir/task/api/v1/issue/data/"+targetID,
          "method": "GET",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "token "+usrtkn,
          }
        }

        $.ajax(settings).done(function (response) {
          console.log(response);

          $('#issueDetail h3 span').text(response.title);
          $('#issueDetail .box_actions p span').text(response.creator.first_name+' '+ response.creator.last_name);
          $('#issueDetail input[name=issueTitle]').val(response.title);
          $('#issueDetail input[name=issueDesc]').val(response.description);
          $('#issueDetail #issueCat').val(response.category.id);
          $('#issueDetail #issueAss').val(response.assignee.id);
          $('#issueDetail #issueStatus').val(response.status);
          $('#issueDetail #issueFlwer').val(response.followers);

        });



    	});





      // check signout link
      $(document).on('click', 'a[name=logout]', function(e) {

        e.preventDefault();

        document.cookie = "usrtkn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        window.location.href = "http://amins-macbook-pro.local:5757/html-planium/";

      });



  });
