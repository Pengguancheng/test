<?php 

header("Access-Control-Allow-Origin: *");
mysql_connect("127.0.0.1","root","");//連結伺服器
mysql_select_db("bee");//選擇資料庫
mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文


searchlist();


function searchlist(){
	
	date_default_timezone_set("Asia/Taipei"); //把時間定位在台灣(+8)
	
	//抓取現在系統的時間
	$Y=date("Y");  //Y:西元年4位數
	$M=date("m");  //m:1~12月 (不足二位數補0)
	$D=date("d");  //d:1~31日 (不足二位數補0)
	$H=date("H");  //H:小時 (24時制)
	$I=date("i");  //i:00~59分
	$S=date("s");  //s:00~59秒
	
	//計算一周前的時間
	if($D-7<=0){
		if($M=1){
			$y= $Y-1;
			$m= 12;
			$d= 31-(7-$D);
			$h= "00";
			$i= "00";
			$s= "00";
		}
		elseif(($M=2)||($M=4)||($M=6)||($M=8)||($M=9)||($M=11)){
			$y= $Y;
			$m= $M-1;
			$m = str_pad($m,2,'0',STR_PAD_LEFT);  //不足2位數補0
			$d= 31-(7-$D);
			$h= "00";
			$i= "00";
			$s= "00";
		}
		elseif(($M=5)||($M=7)||($M=10)||($M=12)){
			$y= $Y;
			$m= $M-1;
			$m = str_pad($m,2,'0',STR_PAD_LEFT);  //不足2位數補0
			$d= 30-(7-$D);
			$h= "00";
			$i= "00";
			$s= "00";
		}
		else{
			$y= $Y;
			$m= $M-1;
			$m = str_pad($m,2,'0',STR_PAD_LEFT);  //不足2位數補0
			$d= 28-(7-$D);
			$h= "00";
			$i= "00";
			$s= "00";
		}
	}
	else{
		$y= $Y;
		$m= $M;
		$m = str_pad($m,2,'0',STR_PAD_LEFT); //不足2位數補0
		$d= $D-7;
		$d= str_pad($d,2,'0',STR_PAD_LEFT);  //不足2位數補0
		$h= "00";
		$i= "00";
		$s= "00";
	}
	
	
	$idresult = array();
	
	//取得全部的attraction_id (不重複)  //如果要改成各縣市就在where加上縣市名稱
	$getid = mysql_query("SELECT DISTINCT `attraction_id` FROM `attraction`");
	
	
	
	//放入attraction_id和變數0
	for($t=1;$t<=mysql_num_rows($getid);$t++){
		$row=mysql_fetch_row($getid);
		$idresult[$t-1] = array("id" => $row[0], "num" => 0);
	}
	
	//echo json_encode($idresult);
	
	//echo $y,$m,$d,$h,$i,$s,$Y,$M,$D,$H,$I,$S;
	
	//取得從今天開始至一周前所有的attraction_id   //注意:變數與字串相連前後要加.
	$getrangeid = mysql_query("SELECT `attraction_id` FROM `picture` WHERE `date` BETWEEN CAST('".$y."-".$m."-".$d." ".$h.":".$i.":".$s."' AS DATETIME) AND CAST('".$Y."-".$M."-".$D." ".$H.":".$I.":".$S."' AS DATETIME)");

	$rangeid = array();
	for($k=1;$k<=mysql_num_rows($getrangeid);$k++){
		$a=mysql_fetch_row($getrangeid);
		$rangeid[$k-1] = array("id" => $a[0]);
	}
	
	//echo json_encode($rangeid);
	
	
	//如果範圍內所抓取的id(rangeid)和id列表相php同(idresult)就把該id的變數+1	
	for($j=1;$j<=mysql_num_rows($getid);$j++){
		for($k=1;$k<=mysql_num_rows($getrangeid);$k++){
			if($idresult[$j-1]["id"]==$rangeid[$k-1]["id"]){
				$idresult[$j-1]["num"]+=1;
			}
		}
	}
	//執行結束後idresult中會有每個ID在時間範圍內的總數，需再將該陣列以總數由大到小排序
	
	
	
	
	//使用usort排序idresult陣列 (遞減 => 由大排到小)	
	usort($idresult, 'sort_by_num');
	
	
	//使用陣列到SQL查詢該ID的名稱和讚數	
	$location = 0;
	$sentdata = array();
	
	for($j=1;$j<=10;$j++){
		//去搜尋出前10名的景點名稱和讚數
		$search = mysql_query("SELECT `attraction_name`, `likenumber` FROM `attraction` WHERE `attraction_id`=".$idresult[$j-1]["id"]."");

		for($i=1;$i<=mysql_num_rows($search);$i++){
			$rs=mysql_fetch_row($search);
			$sentdata[$location] = array( "name" => $rs[0], "likenumber" => $rs[1]);
		}
		$location++;
	}
	
	//將陣列編碼成 JSON 字串	
	echo json_encode($sentdata);
}

	function sort_by_num($a, $b){
		if($a['num'] == $b['num'])return 0;
		return ($a['num'] < $b['num']) ? 1 : -1;
	}

?>
