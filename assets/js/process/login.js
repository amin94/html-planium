$(document).ready(function() {

	// process the form
	$('form').submit(function(event) {

		$('.form-group').removeClass('has-error'); // remove the error class
		$('.help-block').remove(); // remove the error text

		// get the form data
		// there are many ways to get this data using jQuery (you can use the class or id also)



		var formData = {
			'email' 			: $('input[name=email]').val(),
			'passwd' 			: $('input[name=passwd]').val()

		};

		$('.submit_txt').fadeOut('fast');
		$('.process_txt').delay(200).fadeIn('fast');
		$('.signup_btn').removeClass('btn-primary');
		$('.signup_btn').addClass('signup_btn_process');

		// process the form
		$.ajax({
			type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
			url 		: 'http://amins-macbook-pro.local:5757/html-planium/main-planium/login_process.php', // the url where we want to POST
			data 		: formData, // our data object
			dataType 	: 'json', // what type of data do we expect back from the server
			encode 		: true
		})
			// using the done promise callback
			.done(function(data) {

				// log data to the console so we can see
				console.log(data);

				// here we will handle errors and validation messages
				if ( ! data.success) {

					$('.submit_txt').delay(200).fadeIn('fast');
					$('.process_txt').fadeOut('fast');
					$('.signup_btn').addClass('btn-primary');
					$('.signup_btn').removeClass('signup_btn_process');

					// handle errors for email ---------------
					if (data.errors.email) {
						$('#email_group').addClass('has-error'); // add the error class to show red input
						$('#email_group').append('<div class="help-block">' + data.errors.email + '</div>'); // add the actual error message under our input
					}

					// handle errors for passwd ---------------
					if (data.errors.passwd) {
						$('#passwd_group').addClass('has-error'); // add the error class to show red input
						$('#passwd_group').append('<div class="help-block">' + data.errors.passwd + '</div>'); // add the actual error message under our input
					}

					// handle errors for server_con ---------------
					if (data.errors.serverCon) {
						$('#submit_group').append('<div class="help-block">' + data.errors.serverCon + '</div>'); // add the actual error message under our input
					}

					if (data.errors.wrongData) {
						$('#submit_group').append('<div class="help-block">' + data.errors.wrongData + '</div>'); // add the actual error message under our input
					}


				} else {

					// ALL GOOD!
					window.location.href = "projects.php";



				}
			})

			// using the fail promise callback
			.fail(function(data) {

				// show any errors
				// best to remove for production
				console.log(data);

				$('.submit_txt').delay(200).fadeIn('fast');
				$('.process_txt').fadeOut('fast');
				$('.signup_btn').addClass('btn-primary');
				$('.signup_btn').removeClass('signup_btn_process');

				swal("خطا!", "ارتباط با سرور قطع شده است!", "error", {
				  button: "تلاش مجدد",
				});

			});

		// stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
	});

});
