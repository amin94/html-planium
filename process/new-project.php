<?php
ob_start();
session_start();
require_once('../config.php');

if ( 0 < $_FILES['file']['error'] ) {
			echo 'Error: ' . $_FILES['file']['error'] . '<br>';
	}
	else {
			move_uploaded_file($_FILES['file']['tmp_name'], '../uploads/' . $_FILES['file']['name']);

			$projectPhotoAddress = panel_url.$_FILES['file']['name'];
			$projectName = $_POST['projectName'];
			$projectAddress = $_POST['projectAddress'];


			$finalData = array(
				'title'=> $projectName,
				'address'=> $projectAddress,
				'status'=> true,
				'image'=> $projectPhotoAddress,
	      );

			// sending data to main server
	    $curl = curl_init();

	   curl_setopt_array($curl, array(
	     CURLOPT_URL => api_url."/project/api/v1/",
	     CURLOPT_RETURNTRANSFER => true,
	     CURLOPT_ENCODING => "",
	     CURLOPT_MAXREDIRS => 10,
	     CURLOPT_TIMEOUT => 30,
	     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	     CURLOPT_CUSTOMREQUEST => "POST",
	     CURLOPT_POSTFIELDS => json_encode($finalData),
			 CURLOPT_HTTPHEADER => array(
			 "Accept: application/json",
			 "Authorization: token ".$_SESSION['userToken'],
			 "Cache-Control: no-cache",
			 "Content-Type: application/json"
			 )
	   ));

	   $response = curl_exec($curl);
		 $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	   $err = curl_error($curl);

	   curl_close($curl);

	   if ($err) {
	     echo "cURL Error #:" . $err;
	   } else {

			 if ($httpcode == 200) {
			 	echo "project added";
			} elseif($httpcode == 400) {
				echo "parameter error";
			} else {
				echo "unknown Error";
			}

		 }


	}

ob_end_flush();
?>
