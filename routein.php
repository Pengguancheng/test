<<<<<<< HEAD
<?php header("Access-Control-Allow-Origin:*");
	mysql_connect("127.0.0.1","root","");//連結伺服器
	mysql_select_db("bee");//選擇資料庫
	mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文
	$name = json_decode($_POST['data']);
	$sentdata;
	$insert = array();
	$sname = $name->routename;
	$num = $name->num;
	//json_encode($name);
	//$a=$name -> data[0] -> name ;
	//echo $name->data[0]->name; 
	$sentdata = 1;
	for($i=0;$i<$num;$i++){
		$data=mysql_query("SELECT `attraction_id` FROM `attraction` WHERE attraction_name = '".$name->data[$i]->name ."'");
		if(mysql_num_rows($data)<1){
			$sentdata = 0;
			break;
		}
		else{
			$rs = mysql_fetch_row($data);
			$insert[$i] = intval($rs[0]);			
		}
	}
	if($sentdata == 0)
		echo json_encode($sentdata);
	else{
		$sentdata=0;
		for($i=0;$i<(ceil($num/10)*10);$i++){
				if($insert[$i]==null)
					$insert[$i]=0;
		}

		$data=mysql_query("SELECT max(route_id) FROM `route`");
		$rs=mysql_fetch_row($data);
		$routeid=$rs[0]+1;
		for($i=0;$i<=floor($num/10);$i++){
			$firstid = 0;
			if($i==0){
				$firstid = 1;
				$next = 0 ;
				if($num>10)
					$next = $routeid+1 ;
			}
			else if( $i>0 && $i=floor($num/10)){
				$next = 0 ;
				$firstid = 0;
			}	
			else{
				$next = $routeid+1;
				$firstid = 0;
			}
			$data = mysql_query("INSERT INTO route (route_name, firstid, next, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`)VALUES('".$sname."',".$firstid.",".$next.",".$insert[$i*10].",".$insert[$i*10+1].",".$insert[$i*10+2].",".$insert[$i*10+3].",".$insert[$i*10+4].",".$insert[$i*10+5].",".$insert[$i*10+6].",".$insert[$i*10+7].",".$insert[$i*10+8].",".$insert[$i*10+9].")");
			if($data)
				$sentdata = 1;
			else
				$sentdata = 2;
			echo json_encode($sentdata);
			echo json_encode("INSERT INTO route (route_name, firstid, next, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`)VALUES('".$sname."',".$firstid.",".$next.",".$insert[$i*10].",".$insert[$i*10+1].",".$insert[$i*10+2].",".$insert[$i*10+3].",".$insert[$i*10+4].",".$insert[$i*10+5].",".$insert[$i*10+6].",".$insert[$i*10+7].",".$insert[$i*10+8].",".$insert[$i*10+9].")");
		}
	}

=======
<?php header("Access-Control-Allow-Origin:*");
mysql_connect("127.0.0.1","root","");//連結伺服器
mysql_select_db("bee");//選擇資料庫
mysql_query("set names utf8");//以utf8讀取資料，讓資料可以讀取中文
$name = json_decode($_POST['data']);
//json_encode($name);
//$a=$name -> data[0] -> name ;
//echo $name->data[0]->name; 
$query = "INSERT INTO attraction (attraction_name, city, address, latitude, longitude)VALUES()";
//$data=mysql_query("SELECT `attraction_id` FROM `attraction` WHERE '".$_POST['']."'");

>>>>>>> origin/master
?>