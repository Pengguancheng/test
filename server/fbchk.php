<?php
	//$_POST['fbid']$_POST['name']
	// $name="123";
	// $id="231351";
	$link = mysql_connect("127.0.0.1", "root", "")or die("無法連接資料庫: " . mysql_error( ));  //建立資料庫連線
	mysql_select_db("bee") or die("無法選擇資料庫");  //選擇資料庫
	mysql_query("set names utf8");
	$query = "SELECT `user_id` FROM `user` WHERE `fb_id`= '".$_POST['fbid']."' ";
	$result=mysql_query($query);
	$num=mysql_num_rows($result);
	if($num==0){
		$query1 = "INSERT INTO user (fb_id, name ,purl)VALUES ('".$_POST['fbid']."','".$_POST['name']."','".$_POST['userpurl']."');";
		if($result=mysql_query($query1)){
			echo "data insert success!!";
			$result=mysql_query($query);
			$row=mysql_fetch_row($result);
			echo $row[0];
		}
		else{
			echo "error";
			echo $result;
		}
	}
	else{
		$row=mysql_fetch_row($result);
		$data=mysql_query("UPDATE `user` SET `purl` = '".$_POST['userpurl']."' WHERE `user_id` = ".$row[0]."");
		echo $row[0];
	}

?>