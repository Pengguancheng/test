<?php
header("Access-Control-Allow-Origin: *");
mysql_connect("127.0.0.1","root","");//連結伺服器
mysql_select_db("bee");//選擇資料庫
mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文
$name = $_POST['session'];
$name => data[0] => name ;
$query = "INSERT INTO attraction (attraction_name, city, address, latitude, longitude)VALUES()";
$data=mysql_query("SELECT `attraction_id` FROM `attraction` WHERE '".$_POST['']."'");

?>