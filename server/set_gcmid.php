<?php
	header("Access-Control-Allow-Origin:*");
	mysql_connect("127.0.0.1","root","");//連結伺服器
	mysql_select_db("bee");//選擇資料庫
	mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文
	date_default_timezone_set("Asia/Taipei");
	$uid = $_POST['id'];
	$rid = $_POST['rid'];
	// $uid = 4;
	// $rid = 'dzsNq5ZPbSM:APA91bFX2G6g4sX857YEgYzzO3fStBxSbMpKT5gRbFtpzYGrEwTlqRs9vgJ4ID4ENRWRL5oOMO6RzuMnWNoLTmxksI065MwTOOi5OCtHX3Hb0Wv_fPPyaqCv39tx3inoIP9MDlHYOZ5H';
	$data=mysql_query("UPDATE `user` SET `gcmid` = '".$rid."' WHERE `user`.`user_id` = ".$uid."");
	echo json_encode('1');
?>