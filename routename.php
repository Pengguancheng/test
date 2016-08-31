<?php 

header("Access-Control-Allow-Origin: *");
mysql_connect("127.0.0.1","root","");//連結伺服器
mysql_select_db("bee");//選擇資料庫
mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文
$data=mysql_query("SELECT `attraction_name` FROM `attraction`");
$sentdata = array();
for($i=0;$i<mysql_num_rows($data);$i++){ 
		$rs=mysql_fetch_row($data);
		$sentdata[$i] = $rs[0];
		//array_push($sentdata,$rs[1],$rs[0]);
	}	
	//print_r($sentdata);
	echo json_encode($sentdata);

?>