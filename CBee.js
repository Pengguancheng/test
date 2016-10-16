var pointid;
var imagesrc="ppp1.jpg";
var stylesArray = [{"featureType":"water","elementType":"all","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"on"}]},{"featureType":"water","elementType":
    "labels","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":
    [{"hue":"#83cead"},{"saturation":1},{"lightness":-15},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#f3f4f4"},
    {"saturation":-84},{"lightness":59},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},
    {"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},
    {"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},
    {"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-35},{"visibility":"simplified"}]},
    {"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":
    [{"hue":"#d7e4e4"},{"saturation":-60},{"lightness":23},{"visibility":"on"}]}]    /*地圖樣式變更*/
    var mapOptions = {
        center: { lat: 23.5, lng: 121},   /*台灣座標*/
        zoom: 8,
        streetViewControl: false,
        scaleControl: true,
        zoomControl: false,
        };
    var map ;
    var name = "peng";
    var fbid = "100011";
    var userid="3";
    var uploadrs =1;
	var attraction;// 不同地方都不能通用
	var markers = [];
	var markerCluster;	
	var push = {};
	var actmarker = [];	
	var actnum = 0;
	var dataset=0;
	var number = 1;


function onDeviceReady() {//裝置啟動的設定
    fblogin();
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    map.setOptions({styles: stylesArray});
	//fbrd();




}
function getdata(t1){
	console.log("t1",t1);
	$.get(t1,function(t){
	 console.log(JSON.stringify(t));
	 //alert(number++);
	 number++;
	 senddata(t,t.data.length);
	 if((t.paging.next==undefined)||(number>11))
		return 1;
	 else
		getdata(t.paging.next);
	})	
}
var loginattnum = 0;
function senddata(data,len){
	for(i=0;i<len;i++){
			$.ajax({
			type:"post",
			url:"http://bee.japanwest.cloudapp.azure.com//test_fbsdk.php",
			data:{
						'city':data.data[i].place.location.city,
						'latitude':data.data[i].place.location.latitude,
						'longitude':data.data[i].place.location.longitude,
						'address':data.data[i].place.location.street,
						'name':data.data[i].place.name

			},
			success:function(callback){
				loginattnum++;
				console.log(loginattnum);
			},
			error:function(){
				alert("error");
			}
		});
	}
}
function fbrd(){
	//polling();
	get_attraction();
	setInterval("polling();", 5000);
	push = PushNotification.init({ "android": {"senderID": "1080112310883","icon": "icon.png"}});
	setgcm();
	setInterval(function(){
		if(actmarker.length>0){
			actnum = actnum % actmarker.length;
			//console.log(actnum);
			actmarker[actnum].setMap(null);
			actmarker[actnum] = actmarker[actmarker.length - 1];
			actmarker.pop();
			actnum++;
		}
	}, 500);
    $.mobile.changePage('#map');	
}
function setgcm(){
	push.on('registration', function(data) {
		console.log(data.registrationId);
			$.ajax({
					url: "http://bee.japanwest.cloudapp.azure.com//set_gcmid.php",
					type:"POST",
					dataType:'json',
					data:{
					  'id' : userid,
					  'rid' : data.registrationId					  
					},
					success: function(data){
						console.log(data);
					},
					error: function(jqXHR) {
					alert("發生錯誤: " + jqXHR.status);
				},
			})		
		});
	push.on('notification', function(data) {
		console.log(JSON.stringify(data));		 
		alert(data.additionalData.add);
	});
	push.on('error', function(e) {
		alert(e);
	});	
}
function mset(attraction){
	//console.log(attraction);
	var marker;
	var url;
	for(i=0;i<attraction.length;i++){
		url = 'images/attraction.png';
		size = new google.maps.Size(32,32);
		if(attraction[i].top == 1){
			url = 'images/topattraction.png';
			size = new google.maps.Size(64, 64);
		}
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(attraction[i].latitude,attraction[i].longitude),
			title:attraction[i].attraction_name,
			id:attraction[i].attraction_id,
			name:attraction[i].attraction_name,
			icon :{
					url: url,
					size: size,
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(0, 32)
				  }
		});
		marker.setMap(map);
		if(attraction[i].top == 0){
			markers.push(marker);
		}
		else
		marker.setAnimation(google.maps.Animation.BOUNCE);
		google.maps.event.addListener(marker, 'click', function() {  //跳轉到景點
			alert(this.id);
			clickmarker(this.id);
			$.mobile.changePage('#Attractions');
		});	
	}
	for(i=0;i<markers.length;i++){
		markers[i].setMap(map);
	}
	markerCluster = new MarkerClusterer(map, markers,
	{imagePath: 'images/m'});
}
function get_attraction(){
$.ajax({
		url: "http://bee.japanwest.cloudapp.azure.com//marker.php",
		type:"GET",
		dataType:'json',

		success: function(data){
		  attraction = data;
		  mset(data);
		},
		error: function(jqXHR) {
			//console.log(data);
		  alert("發生錯誤: " + jqXHR.status);
		},
	})	
}
function polling(){
	$.ajax({
			url: "http://bee.japanwest.cloudapp.azure.com//notice.php",
			type:"POST",
			dataType:'json',
			data:{
			  'id' : userid
			},
			success: function(data){
				console.log(data);
				for(i=0;i<data.length;i++){
					if(data[i].class == "post")
						pset(data[i]);
				}
			},
			error: function(jqXHR) {
			alert("發生錯誤: " + jqXHR.status);
		},
	})
}
function pset(data){
	url = 'images/people55.png';
	size = new google.maps.Size(64, 64);
	marker = new google.maps.Marker({
		position: new google.maps.LatLng(data.gps.latitude,data.gps.longitude),
		uid:data.user_id,
		pid:data.picture_id,
		name:data.name,
		title:data.name,
		icon :{
				url: url,
				size: size,
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(0, 32)
			  }
	});
	marker.setMap(map);
	marker.setAnimation(google.maps.Animation.BOUNCE);
	actmarker[actmarker.length] = marker;
}
function onPhotoDataSuccess(imageData) {

    var smallImage = document.getElementById('photoimg');

    smallImage.style.display = 'block';

    smallImage.src = "data:image/jpeg;base64," + imageData;

    imagesrc="data:image/jpeg;base64," + imageData;

    //upload_win(imagescr);

}


function onPhotoURISuccess(imageData) {

    var smallImage = document.getElementById('photoimg');

    smallImage.style.display = 'block';

    smallImage.src = "data:image/jpeg;base64," + imageData;

    imagesrc="data:image/jpeg;base64," + imageData;
}

function capturePhoto() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality:50,
    destinationType: destinationType.DATA_URL });
}

function capturePhotoEdit() {
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, allowEdit: true,
    destinationType: destinationType.DATA_URL,targetWidth:400,targetHeight:400 });
}

function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}

function onFail(message) {
  alert('Failed because: ' + message);
}

function clickmarker(val){
    pointid=val;//跳轉道景點頁面
    $.ajax({
        url: "http://bee.japanwest.cloudapp.azure.com//get_attraction_data.php",
        type:"POST",
        dataType:'json',
        data:{
            attraction_id: val
        },

        success: function(data){
            console.log(JSON.stringify(data));
            $("#titlename").html(data.attraction_name);
            $("#attraction").html(data.description);
            $("#addr").html(data.address);
            $("#phone").html(data.telephone);
            $("#time").html(data.businesshour);
        },
        error: function(jqXHR) {
            alert("發生錯誤: " + jqXHR.status);
        },
    })
}

function goroute(){
    $.ajax({
        url: "http://bee.japanwest.cloudapp.azure.com//get_route_data.php",
        type:"POST",
        dataType:'json',
        data:{
            route_id: pointid
        },

        success: function(data){
            console.log(data);
            var txtId = 1;
            var jsonNum = data.length; //json的長度
			$("#showBlock").empty();
            for (var i = 0; i < jsonNum; i++) {
                if ((txtId%2)==1){
                    $("#showBlock").append('<div id="div' + txtId + '" data-role="content" id="wrap" style="background-color:#C6D9F1;padding:10px;">路線名稱:'+data[i]["name"]+' ,讚數:'+data[i]["likenumber"]+ '</div>');
                    txtId++;
                }
                else{
                    $("#showBlock").append('<div id="div' + txtId + '" data-role="content" id="wrap" style="background-color:#F9F9D9;padding:10px;">路線名稱:'+data[i]["name"]+' ,讚數:'+data[i]["likenumber"]+ '</div>');
                    txtId++;
                }
            }
        },

        error: function(jqXHR) {
            alert("發生錯誤: " + jqXHR.status);
        },
    })
}


function win(r) {
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    uploadrs =1;
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
    uploadrs = 0;
}

function upload_win(name) {
    var uri = encodeURI("http://bee.japanwest.cloudapp.azure.com//server_save.php");
    fileURL=imagesrc;
    var ft = new FileTransfer();
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=name+".jpg";
    options.mimeType="image/jpg";
    options.trustAllHosts=true;
    var headers={'headerParam':'headerValue'};

    options.headers = headers;

//    ft.onprogress = function(progressEvent) {
//        if (progressEvent.lengthComputable) {
//          loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
//        } else {
//          loadingStatus.increment();
//        }
//    };
    ft.onprogress = function (progressEvt) {//显示上传进度条
        if (progressEvt.lengthComputable) {
            navigator.notification.progressValue(Math.round(( progressEvt.loaded / progressEvt.total ) * 100));
        }
    }

    ft.upload(fileURL, uri, win, fail, options);
        return name+".jpg";
}
function fblogin(){
	var fbLoginSuccess = function (userData) {
		console.log(JSON.stringify(userData));
		fbid = userData.authResponse.userID;
		facebookConnectPlugin.api(userData.authResponse.userID+"/?fields=name,tagged_places", ["public_profile","user_tagged_places"],
		  function onSuccess (result) {
			console.log("Result: "+JSON.stringify(result));
			name = result.name;
			//console.log(JSON.stringify(result.tagged_places));
			senddata(result.tagged_places,result.tagged_places.data.length);
			getdata(result.tagged_places.paging.next);
			fbcheck();
		  }, function onError (error) {
			console.error("Failed: ", error);
		  }
		);
	}

	facebookConnectPlugin.login(["public_profile","email","user_friends","user_tagged_places"], fbLoginSuccess,
	  function loginError (error) {
		console.error(JSON.stringify(error))
	  }
	);
}
function fbcheck(){
    alert('id:'+fbid+" name : "+name);
        $.ajax({
            url: "http://bee.japanwest.cloudapp.azure.com//fbchk.php",
            type:"POST",
            dataType:'json',
            data:{
                name : name,
                fbid : fbid
            },
            success: function(data){
                //alert(data);
                userid = data;
				fbrd();
            },
            error: function(jqXHR) {
                alert("發生錯誤: " + jqXHR.status);
            },
        })
}
function post(){
    var postdate = new Date();
    var postattraction = $("#postattraction").val();
    var posttext = $("#posttext").val()
    var imgurl = upload_win(postdate.getTime()+userid);
    if(imgurl== 0)
        alert("照片上傳失敗");
    else{
        $.ajax({
                      url: "http://bee.japanwest.cloudapp.azure.com//post.php",
                      type:"POST",
                      dataType:'json',
                      data:{
                          'id' : userid,
                          'postattraction' : postattraction,
                          'posttext' : posttext,
                          'imgurl' : imgurl
                      },
                      success: function(data){
						  postgcm(data);
						  $.mobile.changePage('#news');
                      },
                      error: function(jqXHR) {
                          console.log(data);
                          alert("發生錯誤: " + jqXHR.status);
                      },
                  });
    }
}
function postgcm(pid){
    var postdate = new Date();
    var postattraction = $("#postattraction").val();
    var posttext = $("#posttext").val();
        $.ajax({
			url: "http://bee.japanwest.cloudapp.azure.com//gcm.php",
			type:"POST",
			dataType:'json',
			data:{
			  'id' : userid,
			  'postattraction' : postattraction,
			  'posttext' : posttext,
			  'pid' : pid
			},
			success: function(data){
				alert("上傳成功");
			},
			error: function(jqXHR) {
			  console.log(data);
			  alert("發生錯誤: " + jqXHR.status);
			}
		});
    
}

