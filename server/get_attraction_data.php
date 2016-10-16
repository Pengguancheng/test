<?php 

header("Access-Control-Allow-Origin: *");
mysql_connect("127.0.0.1","root","");//連結伺服器
mysql_select_db("bee");//選擇資料庫
mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文


search();

//搜尋符合的景點資料
function search(){
	
	$sentdata = array();
	
	$data=mysql_query("SELECT * FROM `attraction` WHERE `attraction_id`=".$_POST["attraction_id"]."") ;
	
	$rs=mysql_fetch_array($data);
		$sentdata = $rs;
		//Introduction: 簡介; addr: 地址; phone:電話; time: 營業時間;
			
	//將陣列編碼成 JSON 字串	
	echo json_encode($sentdata);
}

?>
