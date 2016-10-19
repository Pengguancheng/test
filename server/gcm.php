<?php
	header("Access-Control-Allow-Origin:*");
	mysql_connect("127.0.0.1","root","");//連結伺服器
	mysql_select_db("bee");//選擇資料庫
	mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文
	date_default_timezone_set("Asia/Taipei");
	$userid = $_POST['id'];
	$postattraction = $_POST['postattraction'];
	$posttext = $_POST['posttext'];
	$pid = $_POST['pid'];
	// $friendlist = get_friend_data();
	// $num = count($friendlist);
	// $userid = 3;
	// $postattraction = '溫暖的家';
	// $posttext = '好爽阿~~~';
	// $pid = 73;
	$title="一窩蜂";
	$additionalData = $pid;
	$ridlist = array();
	$friendlist = get_friend_data();
	if($friendlist!=0){
		$num = count($friendlist);
		$data = mysql_query("SELECT `name` FROM `user` WHERE `user_id`= ".$userid."");
		$name=mysql_fetch_row($data);
		$message = $name[0]." 在 ".$postattraction." 發布貼文";
		set_rid();
		sendPush($title,$message);
		echo json_encode("1");
	}
	else
		echo json_encode("0");
	function set_rid(){
		global $ridlist,$friendlist,$num;
		$j = 0;
		for($i=0;$i<$num;$i++){
			$data = mysql_query("SELECT `gcmid` FROM `user` WHERE `user_id`= ".$friendlist[$i]."");
			$rs=mysql_fetch_row($data);
			if($rs[0] != null){
				$ridlist[$j] = $rs[0];
				$j++;
			}
		}
	}
	function get_friend_data(){
		global $userid;
		$friendlist = array(); //儲存所有的好友USER_ID	
		//抓取該使用者的第一個好友頁面,再透過next的欄位是否有值判斷是否還有下一個好友介面
		$getfirstfriend = mysql_query("SELECT * FROM `friends` WHERE (`user_id`= ".$userid." AND `firstid`=1)");	
				if(mysql_num_rows($getfirstfriend)!=0){
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
		else 
			return 0;
	}

	function sendPush($title,$message)
	{
		global $additionalData,$ridlist;
	// API access key from Google API's Console
	// replace API
	define( 'API_ACCESS_KEY', 'AIzaSyBqHzsbVXlChnyA3hVumf5mkCWZ2uz22dY');
	$msg = array
	(
	'message' => $message,
	'title' => $title,	
	'add' => $additionalData,
	'vibrate' => 1,
	'sound' => 1,
	'image' => '127.0.0.1/img/bee.png'

	// you can also add images, additionalData
	);
	$fields = array
	(
	'registration_ids' => $ridlist,
	'data' => $msg
	);
	$headers = array
	(
	'Authorization: key=' . API_ACCESS_KEY,
	'Content-Type: application/json'
	);
	$ch = curl_init();
	curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
	curl_setopt( $ch,CURLOPT_POST, true );
	curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
	curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
	curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
	curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
	$result = curl_exec($ch );
	curl_close( $ch );
	}
?>