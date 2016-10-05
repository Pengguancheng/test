<?php
	$to="APA91bG4fR8aVD6n44OfOkhqXf5hUm7yYHLUfm8Uvb0Mvc0-PBedgzqp1umPogrzJ2YMhSotloOjn5Yh3GKPWn7T0vyYu41FsxYENtsCbfFoHaICkV4pRvhRCewMLIvc8BPWK1fTW2Zg";
	$title="Push Notification Title";
	$message="Push Notification Message";
	sendPush($to,$title,$message);

	function sendPush($to,$title,$message)
	{
	// API access key from Google API's Console
	// replace API
	define( 'API_ACCESS_KEY', 'AIzaSyCIeERmZyLYeGCf7-ptqE25DpEXeWn86Vk');
	$registrationIds = array($to);
	$msg = array
	(
	'message' => $message,
	'title' => $title,
	'vibrate' => 1,
	'sound' => 1

	// you can also add images, additionalData
	);
	$fields = array
	(
	'registration_ids' => $registrationIds,
	'data' => $msg
	);
	$headers = array
	(
	'Authorization: key=' . API_ACCESS_KEY,
	'Content-Type: application/json'
	);
	$ch = curl_init();
	curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
	curl_setopt( $ch,CURLOPT_POST, true );
	curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
	curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
	curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
	curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
	$result = curl_exec($ch );
	curl_close( $ch );
	echo $result;
	}
?>