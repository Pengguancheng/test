<?php 

header("Access-Control-Allow-Origin: *");
mysql_connect("127.0.0.1","root","");//連結伺服器
mysql_select_db("bee");//選擇資料庫
mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文
  
  get_keydata();
  
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
  
 function get_keydata(){
   //關鍵字搜尋資料
	$searchdata = array();
	
	$data=mysql_query("select `user_id`,`name`,`purl` from `user` WHERE `name` LIKE '%{$_POST["search"]}%'"); //設定關鍵字
	
	for($i=1;$i<=mysql_num_rows($data);$i++){ 
		$ro5 = mysql_fetch_row($data);
		$searchdata[$i] = array( "id" => $ro5[0], "name" => $ro5[1], "purl" => $ro5[2]);
	}
	
	
	//列出使用者的好友表單
	$friendlist = get_friend_data();
	
	//合併成一個陣列
	$finaldata['friendlist'] = $friendlist;
	$finaldata['searchdata'] = $searchdata;
	
	//回傳
	echo json_encode($finaldata);
 }
?>	