<?php 

	header("Access-Control-Allow-Origin: *");
	mysql_connect("127.0.0.1","root","");//連結伺服器
	mysql_select_db("bee");//選擇資料庫
	mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文.
	date_default_timezone_set("Asia/Taipei");

	$a = mysql_query("SELECT * FROM `attraction`");//取得所有景點
	$num = mysql_num_rows($a);
	for($i=0; $i<$num;$i++){
		$attraction[$i] = mysql_fetch_array($a);    
	}
	// $top10 = searchlist();
	// for($i=0;$i<10;$i++)
		// echo $top10[$i][id];
	echo json_encode($attraction);
	
	
	
	function searchlist(){
		
		date_default_timezone_set("Asia/Taipei"); //把時間定位在台灣(+8)
		
		//抓取現在系統的時間
		$Y=date(Y);  //Y:西元年4位數
		$M=date(m);  //m:1~12月 (不足二位數補0)
		$D=date(d);  //d:1~31日 (不足二位數補0)
		$H=date(H);  //H:小時 (24時制)
		$I=date(i);  //i:00~59分
		$S=date(s);  //s:00~59秒
		
		//計算一周前的時間
		if($D-7<=0){
			if($M=1){
				$y= $Y-1;
				$m= 12;
				$d= 31-(7-$D);
				$h= 00;
				$i= 00;
				$s= 00;
			}
			elseif(($M=2)||($M=4)||($M=6)||($M=8)||($M=9)||($M=11)){
				$y= $Y;
				$m= $M-1;
				$d= 31-(7-$D);
				$h= 00;
				$i= 00;
				$s= 00;
			}
			elseif(($M=5)||($M=7)||($M=10)||($M=12)){
				$y= $Y;
				$m= $M-1;
				$d= 30-(7-$D);
				$h= 00;
				$i= 00;
				$s= 00;
			}
			else{
				$y= $Y;
				$m= $M-1;
				$d= 28-(7-$D);
				$h= 00;
				$i= 00;
				$s= 00;
			}
		}
		else{
			$y= $Y;
			$m= $M;
			$d= $D-7;
			$h= 00;
			$i= 00;
			$s= 00;
		}
		
		
		$idresult = array();
		
		//取得全部的attraction_id (不重複)  
		$getid = mysql_query("SELECT DISTINCT `attraction_id` FROM `attraction`");
		
		//放入attraction_id和變數0
		for($i=1;$i<=mysql_num_rows($getid);$i++){
			$row= mysql_fetch_row($getid);
			$idresult[$i-1] = array("id" => $row[0], "num" => 0);
		}
		
		
		//取得從今天開始至一周前所有的attraction_id   //注意:變數與字串相連前後要加.
		$rangeid = mysql_query("SELECT `attraction_id` FROM `picture` WHERE `date` BETWEEN `".$Y."/".$M."/".$D." ".$H.":".$I.":".$S."` AND `".$y."/".$m."/".$d." ".$h.":".$i.":".$s."`");

		//如果範圍內所抓取的id(rangeid)和id列表相同(idresult)就把該id的變數+1	
		for($j=1;$j<=mysql_num_rows($rangeid);$j++){
			for($k=1;$k<=mysql_num_rows($idresult);$k++){
				if($rangeid[j-1]=$idresult[k-1][0]){
					$idresult[k-1][1]+=1;
				}
			}
		}
		//執行結束後idresult中會有每個ID在時間範圍內的總數，需再將該陣列以總數由大到小排序
		
		
		//使用usort排序idresult陣列 (遞減 => 由大排到小)
		function sort($a, $b){
			if($a['num'] == $b['num'])return 0;
			return ($a['num'] < $b['num']) ? 1 : -1;
		}
		
		usort($idresult, 'sort');
		
		
		return $idresult;
			
		
	}