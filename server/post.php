<?php
	header("Access-Control-Allow-Origin:*");
	mysql_connect("127.0.0.1","root","");//連結伺服器
	mysql_select_db("bee");//選擇資料庫
	mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文
	$data=mysql_query("SELECT `attraction_id` FROM `attraction` WHERE attraction_name = '".$_POST['postattraction']."'");
	$rs = mysql_fetch_row($data);
	$date = date("Y-m-d H:i:s");
	$data = mysql_query("INSERT INTO picture (attraction_id,user_id,date,content,purl)VALUES('".$rs[0]."','".$_POST['id']."','".$date."','".$_POST['posttext']."','".$_POST['imgurl']."')");
	echo json_encode("上傳成功");
?>