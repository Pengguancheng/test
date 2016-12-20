<?php 
	header("Access-Control-Allow-Origin:*");
	mysql_connect("127.0.0.1","root","");//連結伺服器
	mysql_select_db("bee");//選擇資料庫
	mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文
	date_default_timezone_set("Asia/Taipei");
	$userid = $_POST['id'];
	//$userid = 3;
	$friendlist = get_friend_data();
	if($friendlist!=0){
		$num = count($friendlist);
		for($i=0;$i<$num;$i++){
			$friendlist[$i] = userdata($friendlist[$i]);
		}
		echo json_encode($friendlist);
		//print_r($friendlist);
	}else
		echo json_encode("0");

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
	function userdata($uid){
		$tmp = mysql_query("SELECT name,user_id,purl FROM `user` WHERE `user_id`= ".$uid." ");
		$rs = mysql_fetch_array($tmp);
		return $rs;
	}
	
?>