<?php
$path = "img/";
if( $_FILES["file"] != null ) {
	if( $_FILES["file"]["error"] > 0 ) {
		echo "上傳錯誤。Error code: " . $_FILES["file"]["error"];
	}
	else {	//如果目錄不存在，建立目錄
		move_uploaded_file($_FILES["file"]["tmp_name"], $path . $_FILES["file"]["name"]);
		echo "done";	//輸出成功上傳的識別字串
	}
}
// the actual uploaded image
// $uploaded_image = $_FILES['image']['tmp_name'];
// the uploaded image name
// $uploaded_image_name = $_FILES['image']['name'];
// location where you want to save the image
// $saved_image = "/tmp/".time().".jpg";
// saves the image
// move_uploaded_file($uploaded_image, $saved_image);  
?>