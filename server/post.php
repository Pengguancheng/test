<?php
	header("Access-Control-Allow-Origin:*");
	mysql_connect("127.0.0.1","root","");//連結伺服器
	mysql_select_db("bee");//選擇資料庫
	mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文
	date_default_timezone_set("Asia/Taipei");
	$userid = $_POST['id'];
	$data=mysql_query("SELECT `attraction_id` FROM `attraction` WHERE attraction_name = '".$_POST['postattraction']."'");
	$rs = mysql_fetch_row($data);
	$attractionid = $rs[0];
	$datetime = date("Y-m-d H:i:s");
	$data=mysql_query("SELECT MAX(id)  FROM `picture`");
	$pictureid = mysql_fetch_row($data);
	$pictureid[0]++;
	$context = $_POST['posttext'];
	$data = mysql_query("INSERT INTO picture (attraction_id,user_id,date,content,purl)VALUES('".$rs[0]."','".$userid."','".$datetime."','".$context."','".$_POST['imgurl']."')");
	$day = date("Y-m-d");
	$data=mysql_query("SELECT *  FROM `route` WHERE user_id = ".$userid." AND date ='".$day."' GROUP BY user_id");		
	$num = mysql_num_rows($data);
	for($i=0; $i<$num;$i++){
		$row[$i] = mysql_fetch_array($data);    //用arr[]陣列來記錄取得的會員資料
	}
	 if($num>0){
		$num--;
		if($row[$num][10] != 0){
			$data=mysql_query("SELECT MAX(route_id)  FROM `route` ");
			$rs = mysql_fetch_row($data);
			$rs[0]++;
			$data=mysql_query("INSERT INTO route (use_id,firstid, next, `1`)VALUES(".$userid.",0,0,".$attractionid.")");			
			$data=mysql_query("UPDATE `route` SET `next` = ".$rs[0]." WHERE `route_id` = ".$row[$num]['route_id']."");
		}
		else{
			for($i=1;$i<11;$i++){
				if($row[$num][$i] == 0){
						$data=mysql_query("UPDATE `route` SET `".$i."` = ".$attractionid." WHERE `route_id` = ".$row[$num]['route_id']."");
						break;
					}				
			}			
		}		
	}
	else{
		$data=mysql_query("INSERT INTO route (user_id,route_name,firstid, next,date,`1`)VALUES(".$userid.",'".$day."',1,0,'".$day."',".$attractionid.")");
	}
	$data=mysql_query("INSERT INTO `notice` (user_id,date,class,picture_id,context) VALUES(".$userid.",'".$datetime."','post',".$pictureid[0].",'".$context."')");
	echo json_encode('上傳成功');


?>
<?php
// $userid=1243;
// $day = date("Y-m-d");
// $attractionid=123;
// $data=mysql_query("SELECT *  FROM `route` WHERE `user_id` = ".$userid." AND `date` ='".$day."' GROUP BY user_id");	
// $num = mysql_num_rows($data); 
// echo $num;
	// for($i=0; $i<$num;$i++){
		// $row[$i] = mysql_fetch_array($data);    //用arr[]陣列來記錄取得的會員資料
		// echo $i;
	// }
	 // if($num>0){
		// $num--;
		// if($row[$num][10] != 0){
			// $data=mysql_query("SELECT MAX(route_id)  FROM `route` ");
			// $rs = mysql_fetch_row($data);
			// $rs[0]++;
			// $data=mysql_query("INSERT INTO route (use_id,firstid, next, `1`)VALUES(".$userid.",0,0,".$attractionid.")");			
			// $data=mysql_query("UPDATE `route` SET `next` = ".$rs[0]." WHERE `route_id` = ".$row[$num]['route_id']."");
		// }
		// else{
			// for($i=1;$i<11;$i++){
				// if($row[$num][$i] == 0){
						// $data=mysql_query("UPDATE `route` SET `".$i."` = ".$attractionid." WHERE `route_id` = ".$row[$num]['route_id']."");
						// break;
					// }
					
			// }
			
		// }		
	// }
	// else{
		// $data=mysql_query("INSERT INTO route (user_id,route_name,firstid, next,date,`1`)VALUES(".$userid.",'".$day."',1,0,'".$day."',".$attractionid.")");
	// }
?>