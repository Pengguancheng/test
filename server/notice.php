<?php 
	header("Access-Control-Allow-Origin:*");
	mysql_connect("127.0.0.1","root","");//連結伺服器
	mysql_select_db("bee");//選擇資料庫
	mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文
	date_default_timezone_set("Asia/Taipei");
	$userid = $_POST['id'];
	$friendlist = get_friend_data();
	$num = count($friendlist);
	$senddata = get_notice();
	echo json_encode($senddata);
	function get_friend_data(){
		global $userid;
		$friendlist = array(); //儲存所有的好友USER_ID	
		//抓取該使用者的第一個好友頁面,再透過next的欄位是否有值判斷是否還有下一個好友介面
		$getfirstfriend = mysql_query("SELECT * FROM `friends` WHERE (`user_id`= ".$userid." AND `firstid`=1)");	
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
	function get_notice(){
		global $userid,$num,$friendlist;
		$rownum = 0;
		$row = array();
		$maxid;
		$data = mysql_query("SELECT noticeid FROM `user` WHERE `user_id`=".$userid."");
		$a = mysql_fetch_row($data);
		$maxid = $a[0];
		for($i=0;$i<$num;$i++){
			$notice = mysql_query("SELECT * FROM `notice` WHERE `id`>".$a[0]." AND `user_id`=".$friendlist[$i]."");
			for($j=0;$j<mysql_num_rows($notice);$j++){
				$row[$rownum] = mysql_fetch_array($notice);
				if($row[$rownum]['class'] == 'post'){
					$row[$rownum]['gps'] = setgps($row[$rownum]['picture_id'],$rownum);
				}
				$data = mysql_query("SELECT purl,name FROM `user` WHERE `user_id`=".$row[$rownum]['id']."");
				$rs = mysql_fetch_row($data);
				$row[$rownum]['purl'] = $rs[0];
				$row[$rownum]['name'] = $rs[1];
				if($row[$rownum]['id'] > $maxid)
					$maxid = $row[$rownum]['id'];
				$rownum++;
			}
		}
		//$data=mysql_query("UPDATE `user` SET `noticeid` = ".$maxid." WHERE `user_id` = ".$userid."");
		return $row;
	}
	function setgps($pid){//找到是哪個景點並抓取GPS
		$data = mysql_query("SELECT attraction_id FROM `picture` WHERE `id`=".$pid."");
		$rs =  mysql_fetch_row($data);
		$data = mysql_query("SELECT latitude,longitude FROM `attraction` WHERE `attraction_id`=".$rs[0]."");
		$gps = mysql_fetch_array($data);
		return $gps;
	}	
?>