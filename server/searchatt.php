<?php
	header("Access-Control-Allow-Origin:*");
	mysql_connect("127.0.0.1","root","");//連結伺服器
	mysql_select_db("bee");//選擇資料庫
	mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文
	date_default_timezone_set("Asia/Taipei");
	$name = $_POST["name"];
	//$name = "高";
	$tmp=mysql_query("select `attraction_name`,`attraction_id`,`picture_id` from `attraction` WHERE `attraction_name` LIKE '%".$name."%'");
	for($k=0;$k<=mysql_num_rows($tmp);$k++)
	$data[$k] = mysql_fetch_array($tmp);
	echo json_encode($data);
	//print_r($data);
?>