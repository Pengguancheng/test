<?php
	header("Access-Control-Allow-Origin:*");
	mysql_connect("127.0.0.1","root","");//連結伺服器
	mysql_select_db("bee");//選擇資料庫
	mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文
	date_default_timezone_set("Asia/Taipei");
	$userid = 3;
	$aid = $_POST["route_id"];
	$data = array();
	get_news_data();
function getlist(){
	global $aid;
	$albumlist = array();
	$tmp = mysql_query("SELECT * FROM `albums` WHERE firstid=1");
	while($adata = mysql_fetch_array($tmp)){
		$check = 0;
		$albid = $adata['id'];
		for($i=1;$i<31;$i++){
			$atmp = mysql_query("SELECT attraction_id FROM `picture` WHERE id=".$adata[$i]."");
			if($atmp!=null)
			$rs = mysql_fetch_row($atmp);
			if($rs[0]==$aid){
				$albumlist[count($albumlist)] = $adata['id'];
				$check = 1;
				break;
			}
		}
		if($check == 0)
		while($adata['next'] != 0){
			$atmp = mysql_query("SELECT * FROM `albums` WHERE id=".$adata['next']."");
			$adata = mysql_fetch_array($atmp);
			for($i=1;$i<31;$i++){
				$atmp = mysql_query("SELECT attraction_id FROM `picture` WHERE id=".$adata[$i]."");
				if($atmp!=null){
				$rs = mysql_fetch_row($atmp);
				}
				if($rs[0]==$aid){
					$albumlist[count($albumlist)] = $albid;
					break;
				}
			}			
		}
	}	
	return $albumlist;
}	
function get_news_data(){
	global $userid;
	//取得好友列表
	$friendlist = array();
	//echo json_encode($friendlist);
	$friendlist = getlist();
	//進入album中去抓取每個使用者的相簿
	$num = 0;
	$albumdata = array();
	$message = array();	

		// print_r($friendlist);
	for($a=1;$a<=count($friendlist);$a++){
		$getalbum = mysql_query("SELECT * FROM `albums` WHERE `id`= ".$friendlist[$a-1]." AND `firstid`='1'");
		//echo mysql_num_rows($getalbum)." ".count($friendlist)."  77\n";//test
		for($b=1;$b<=mysql_num_rows($getalbum);$b++){
			$rs=mysql_fetch_row($getalbum);
			$albumdata[$num]["user"] = array("0" => $rs[2],"name" => $rs[1]);  //取得album創建人的id
			$albumdata[$num]["date"] = $rs[3];                //取得album的最新日期
			$albumdata[$num]["id"] = $rs[0];                  //取得album的id
			$albumdata[$num]["next"] = $rs[7];                //判斷是否有下一本相簿
			//$albumdata[$num]["albumname"] = $rs[2];
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
	$getmsguserdata = mysql_query("SELECT * FROM `user` WHERE `user_id`=".$userid."");
	$userdata = mysql_fetch_array($getmsguserdata);
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
	for($a=0;$a<count($routedata);$a++){
		$routedata[$a]=array_unique($routedata[$a]);
	}	
	for($a=0;$a<count($routedata);$a++){
		$routedata[$a] = array_values($routedata[$a]);
	}
	
	//把各個album依照時間排序
	usort($albumdata, 'sort_by_date');
	
	
	$data = array();
	$data['albumdata'] = $albumdata;
	$data['message'] = $message;
	$data['routedata']= $routedata;
	$data['userdata'] = $userdata;	
	//將陣列編碼成 JSON 字串
	echo json_encode($data);
	//print_r($data);
	
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
	
	
	
	
	
	
	

?>