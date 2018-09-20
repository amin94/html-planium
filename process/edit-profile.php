<?php
ob_start();
session_start();
require_once('../config.php');


		$fName = $_POST['fName'];
		$lName = $_POST['lName'];
		$passwd = $_POST['passwd1'];


		if (empty($fName))
			$errors['fName'] = ' حتما فیلد نام را پر نمایید در غیر اینصورت انصراف را بزنید ';
		if (empty($lName))
			$errors['lName'] = 'حتما فیلد نام خانوادگی را پر نمایید در غیر اینصورت انصراف را بزنید';
		if (empty($passwd))
			$errors['passwd'] = 'فیلد رمز را پر بفرمایید';



			if ( ! empty($errors)) {
				$data['success'] = false;
				$data['errors']  = $errors;
				echo json_encode($data);
			} else {

			$data['success'] = true;

			$finalData = array(
				'fcm_id'=> 1,
				'first_name'=> $fName,
				'last_name'=> $lName,
				'password'=> $passwd,
	      );

			// sending data to main server
	    $curl = curl_init();

			curl_setopt_array($curl, array(
			CURLOPT_URL => api_url."/authentication/api/v1/",
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "PUT",
			CURLOPT_POSTFIELDS => json_encode($finalData),
			CURLOPT_HTTPHEADER => array(
			"Accept: application/json",
			"Authorization: token ".$_SESSION['userToken'],
			"Cache-Control: no-cache",
			"Content-Type: application/json"
			),
			));

	   $response = curl_exec($curl);
		 $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	   $err = curl_error($curl);

	   curl_close($curl);

	   if ($err) {
			 $errors['httpCode'] = "cURL Error #:" . $err;
			 $data['success'] = false;
			 $data['errors'] = $errors;
	   } else {

			 if ($httpcode == 200) {
				 $data['message'] = "profile updated";
				 $_SESSION['userFullName'] = $fName.' '.$lName;
				 $data['success'] = true;
			} elseif($httpcode == 400) {
				$data['meessage'] = 'parameter error';
				$errors['httpCode'] = 'parameter error';
				$data['success'] = false;
				$data['errors'] = $errors;
			} else {
				$data['message'] = 'unknown Error';
				$errors['httpCode'] = 'parameter error';
				$data['success'] = false;
				$data['errors'] = $errors;
			}

		}

		echo json_encode($data);

	}

ob_end_flush();
?>
