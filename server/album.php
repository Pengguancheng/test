<?php 

header("Access-Control-Allow-Origin: *");
mysql_connect("127.0.0.1","root","");//連結伺服器
mysql_select_db("bee");//選擇資料庫
mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文

//$userid = $_POST["id"];
$userid = 2;
get_news_data();


function get_friend_data(){
	
	
	
	
	//抓取該使用者的第一個好友頁面,再透過next的欄位是否有值判斷是否還有下一個好友介面
	$getfirstfriend = mysql_query("SELECT * FROM `friends` WHERE (`user_id`={$_POST["user_id"]} AND `firstid`=1)");
	
	//判斷這個人有沒有好友
	if(mysql_num_rows($getfirstfriend)==0){
		return 0;
	}
	else{
	$friendlist = array(); //儲存所有的好友USER_ID
	for($k=1;$k<=mysql_num_rows($getfirstfriend);$k++){ 
		$rs=mysql_fetch_row($getfirstfriend);
		$check = $rs[2];
		for($j=1;$j<=50;$j++){
			if ($rs[3+$j]==NULL) break;
			$friendlist[$j-1] = $rs[3+$j];
		}
	}
	
	
	if($check!=0){
		$time = 1;
		
		do{
			$getfriend = mysql_query("SELECT * FROM `friends` WHERE `id`=".$check."");
			
			for($k=1;$k<=mysql_num_rows($getfriend);$k++){ 
				$rs=mysql_fetch_row($getfriend);
				$check = $rs[2];
				for($j=1+($time*50);$j<=50+($time*50);$j++){
					if ($rs[3+$j-($time*50)]==NULL) break;
					$friendlist[$j-1] = $rs[3+$j-($time*50)];
				}
			}
			
			$time++;
			
		}while($check!=0);
	}
	
	//取得的friendlist會得到使用者的所有好友
	return ($friendlist);
	//echo json_encode($friendlist);
	}
}

function get_news_data(){
	global $userid;
	//取得好友列表
	$friendlist = array();
	//echo json_encode($friendlist);
	$friendlist[0] = $userid;

	//進入album中去抓取每個使用者的相簿
	$num = 0;
	$albumdata = array();
	$message = array();
	
	for($a=1;$a<=count($friendlist);$a++){
		$getalbum = mysql_query("SELECT * FROM `albums` WHERE `user_id`= ".$friendlist[$a-1]." AND `firstid`='1'");
		//echo mysql_num_rows($getalbum)." ".count($friendlist)."  77\n";//test
		for($b=1;$b<=mysql_num_rows($getalbum);$b++){
			$rs=mysql_fetch_row($getalbum);
			$albumdata[$num]["user"] = array("0" => $rs[2]);  //取得album創建人的id
			$albumdata[$num]["date"] = $rs[3];                //取得album的最新日期
			$albumdata[$num]["id"] = $rs[0];                  //取得album的id
			$albumdata[$num]["next"] = $rs[7];                //判斷是否有下一本相簿
			for($c=1;$c<=30;$c++){
				if($rs[$c+7]!=null){
					$albumdata[$num][$c]= array("0" => $rs[$c+7]);   //把30個相片id放入陣列中 
					$message[$num][$c] = array("0" => $rs[$c+7]);
				}
			}

			//若有下一本相簿就進入if函式中
			if($albumdata[$num]["next"]!=0){
				$time = 1;
				do{
					$getpicture = mysql_query("SELECT * FROM `albums` WHERE `id`=".$albumdata[$num]["next"]."");
			
					for($e=1;$e<=mysql_num_rows($getpicture);$e++){ 
						$row=mysql_fetch_row($getpicture);
						$albumdata[$num]["next"] = $rs[7];
						for($f=1+($time*30);$f<=30+($time*30);$f++){
							if ($row[$f+7-($time*30)]==NULL) break;
							$albumdata[$num][$f] = array("0" => $row[$f+7-($time*30)]);
							$message[$num][$f] = array("0" => $row[$f+7-($time*30)]);
						}
					}
			
					$time++;
			
				}while($albumdata[$num]["next"]=0);
			}
			$num++;
		}
	}
	
	if($albumdata==NULL){
		$nodata=1;
		echo json_encode($nodata);
	}
	else{

	
	// 取得每本album中每張相片的內文和景點id
	for($a=1;$a<=count($albumdata);$a++){
		//echo "a= ".$a."\n";
		for($b=1;$b<=(count($albumdata[$a-1]))-4;$b++){
			//echo "b= ".$b."\n";
			//echo "albumdata[$a-1][$b][0]= ".$albumdata[$a-1][$b][0]."\n";
			if($albumdata[$a-1][$b][0] != null){
				$getpicturedata= mysql_query("SELECT `content`,`attraction_id`,`purl`,`id` FROM `picture` WHERE `id`=".$albumdata[$a-1][$b][0]."");
				for($c=1;$c<=mysql_num_rows($getpicturedata);$c++){ 
					$row=mysql_fetch_row($getpicturedata);
					if($row[1] != 0){
					//echo "row[1] = ".$row[1]."\n";
						// 取得每本album中每張相片的景點名稱
						$getattractionname= mysql_query("SELECT `attraction_name` FROM `attraction` WHERE `attraction_id`=".$row[1]."");
						
						for($d=1;$d<=mysql_num_rows($getattractionname);$d++){ 
							$rs=mysql_fetch_row($getattractionname);
							$albumdata[$a-1][$b] = array("pid" => $row[3], "1" => $row[0], "2" => $row[1], "3" => $rs[0], "4" => $row[2]);
						}
					}	
				}
			}	
		}
	}
	
	//取得每張相片下的留言資料
	for($a=1;$a<=count($message);$a++){
		for($b=1;$b<=(count($message[$a-1]))-4;$b++){
			if($message[$a-1][$b][0] != null){
				$getmessagedata = mysql_query("SELECT `user_id`,`content` FROM `message` WHERE `picture_id`=".$message[$a-1][$b][0]." ORDER BY `date` DESC");
				$message[$a-1][$b] = array();
				for($c=1;$c<=mysql_num_rows($getmessagedata);$c++){ 
					$row=mysql_fetch_row($getmessagedata);
					
					$getmsguserdata = mysql_query("SELECT `name`,`picture_id`,`purl` FROM `user` WHERE `user_id`=".$row[0]."");
					
					for($d=1;$d<=mysql_num_rows($getmsguserdata);$d++){ 
						$rs=mysql_fetch_row($getmsguserdata);
						//$message[$a-1][$b] = array( $c*4-3 => $row[0], $c*4-2 => $rs[0], $c*4-1 => $rs[1], $c*4 => $row[1]);					
						$message[$a-1][$b][$c*4-3] = $row[0];
						$message[$a-1][$b][$c*4-2] = $rs[0];
						$message[$a-1][$b][$c*4-1] = $rs[1];
						$message[$a-1][$b][$c*4] = $row[1];
					}
				}
			}	
		}
	}
	
	//把每個景點的路線彙整起來(修改中)
	$temptdata = array();
	$routedata = array();
	$finalroute = array();
	for($a=1;$a<=count($albumdata);$a++){
		for($b=1;$b<=(count($albumdata[$a-1]))-4;$b++){
			if(count($albumdata[$a-1][$b]) > 1){
			//echo "acount(albumdata[$a-1][$b])= ".count($albumdata[$a-1][$b])."\n";
				$temptdata[$a-1][$b-1] = $albumdata[$a-1][$b][3];
			}
		}
	}
	
	$routedata = array_unique_2d($temptdata);
	
	for($a=0;$a<count($routedata);$a++){
		$routedata[$a] = array_values($routedata[$a]);
	}
	$routedatanum = floor(count($routedata)/2);
	//echo "routedatanum= ".$routedatanum."\n";
	$num = count($routedata)-1;
	//echo "num= ".$num."\n";
	for($a=0;$a<$routedatanum;$a++){
		$tmp = $routedata[$num-$a];
		$routedata[$num-$a] = $routedata[$a];
		$routedata[$a] = $tmp;
	}
	

	
	//把各個album依照時間排序
	usort($albumdata, 'sort_by_date');
	
	
	$data = array();
	$data['albumdata'] = $albumdata;
	$data['message'] = $message;
	$data['routedata']= $routedata;
		
	//將陣列編碼成 JSON 字串
	echo json_encode($data);
	
	}
}	

	function sort_by_date($a, $b){
		if($a['date'] == $b['date'])return 0;
		return ($a['date'] < $b['date']) ? 1 : -1;
	}
	
	function array_unique_2d($array2D){
		$temp = $res = array();
		foreach ($array2D as $v){
			$v = json_encode($v);
			$temp[] = $v;
		}
		$temp = array_unique($temp);
		foreach ($temp as $item){
		$res[] = json_decode($item,true);
		}
		return $res;
	}
	
	function get_new_time($time){
		
		$num=0;
		
		date_default_timezone_set("Asia/Taipei"); //把時間定位在台灣(+8)
	
		//抓取現在系統的時間
		$Y=date("Y");  //Y:西元年4位數
		$M=date("m");  //m:1~12月 (不足二位數補0)
		$D=date("d");  //d:1~31日 (不足二位數補0)
		$H=date("H");  //H:小時 (24時制)
		$I=date("i");  //i:00~59分
		$S=date("s");  //s:00~59秒
	
	do{
		$Y1=$Y;
		$M1=$M;
		$D1=$D;
		$H1=$H;
		$I1=$I;
		$S1=$S;
		
		if($M==1){
			$y= $Y-1;
			$m= 12;
			$d= $D;
			$d= str_pad($d,2,'0',STR_PAD_LEFT);  //不足2位數補0
			$h= "00";
			$i= "00";
			$s= "00";
		}
		elseif(($M==3)&&($D>28)){
			$y= $Y;
			$m= 2;
			$m = str_pad($m,2,'0',STR_PAD_LEFT);  //不足2位數補0
			$d= 28;
			$d= str_pad($d,2,'0',STR_PAD_LEFT);  //不足2位數補0
			$h= "00";
			$i= "00";
			$s= "00";
		}
		elseif(($M==5)||($M==7)||($M==10)||($M==12)&&($D>30)){
			$y= $Y;
			$m= $M-1;
			$m = str_pad($m,2,'0',STR_PAD_LEFT);  //不足2位數補0
			$d= 30;
			$d= str_pad($d,2,'0',STR_PAD_LEFT);  //不足2位數補0
			$h= "00";
			$i= "00";
			$s= "00";
		}
		else{
			$y= $Y;
			$m= $M-1;
			$m = str_pad($m,2,'0',STR_PAD_LEFT);  //不足2位數補0
			$d= $D;
			$d= str_pad($d,2,'0',STR_PAD_LEFT);  //不足2位數補0
			$h= "00";
			$i= "00";
			$s= "00";
		}
		
		$y1=$y;
		$m1=$m;
		$d1=$d;
		$h1=$h;
		$i1=$i;
		$s1=$s;
		
		$Y=$y;  //Y:西元年4位數
		$M=$m;  //m:1~12月 (不足二位數補0)
		$D=$d;  //d:1~31日 (不足二位數補0)
		$H=$h;  //H:小時 (24時制)
		$I=$i;  //i:00~59分
		$S=$s;  //s:00~59秒
		
		$num++;
	}while($num<$time);
	
		return array($y1,$m1,$d1,$h1,$i1,$s1,$Y1,$M1,$D1,$H1,$I1,$S1);
	}
?>
