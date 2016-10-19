var pointid;
var imagesrc="ppp1.jpg";
var stylesArray = [
                      {
                          "featureType": "water",
                          "stylers": [
                              {
                                  "visibility": "on"
                              },
                              {
                                  "color": "#b5cbe4"
                              }
                          ]
                      },
                      {
                          "featureType": "landscape",
                          "stylers": [
                              {
                                  "color": "#efefef"
                              }
                          ]
                      },
                      {
                          "featureType": "road.highway",
                          "elementType": "geometry",
                          "stylers": [
                              {
                                  "color": "#83a5b0"
                              }
                          ]
                      },
                      {
                          "featureType": "road.arterial",
                          "elementType": "geometry",
                          "stylers": [
                              {
                                  "color": "#bdcdd3"
                              }
                          ]
                      },
                      {
                          "featureType": "road.local",
                          "elementType": "geometry",
                          "stylers": [
                              {
                                  "color": "#ffffff"
                              }
                          ]
                      },
                      {
                          "featureType": "poi.park",
                          "elementType": "geometry",
                          "stylers": [
                              {
                                  "color": "#e3eed3"
                              }
                          ]
                      },
                      {
                          "featureType": "administrative",
                          "stylers": [
                              {
                                  "visibility": "on"
                              },
                              {
                                  "lightness": 33
                              }
                          ]
                      },
                      {
                          "featureType": "road"
                      },
                      {
                          "featureType": "poi.park",
                          "elementType": "labels",
                          "stylers": [
                              {
                                  "visibility": "on"
                              },
                              {
                                  "lightness": 20
                              }
                          ]
                      },
                      {},
                      {
                          "featureType": "road",
                          "stylers": [
                              {
                                  "lightness": 20
                              }
                          ]
                      }
                  ]   /*地圖樣式變更(改)*/
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


function onDeviceReady() {//裝置啟動的設定
    //fblogin();
    //pictureSource=navigator.camera.PictureSourceType;
    //destinationType=navigator.camera.DestinationType;
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    map.setOptions({styles: stylesArray});	
	//get_attraction();
	//polling();
    $.mobile.changePage('#map');

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
			//alert(this.id);
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
		url: "http://192.168.1.103//fbsdk/marker.php",
		type:"GET",
		dataType:'json',

		success: function(data){
		  attraction = data;
		  mset(data);
		},
		error: function(jqXHR) {
		  console.log(data);
		  alert("發生錯誤: " + jqXHR.status);
		},
	})	
}
function polling(){
	$.ajax({
			url: "http://192.168.1.103//fbsdk/notice.php",
			type:"GET",
			dataType:'json',
			success: function(data){
				console.log(data);
				if(data!="0"){
					for(i=0;i<data.length;i++){
						if(data[i].class == "post")
							pset(data[i]);
					}
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
}
function onPhotoDataSuccess(imageData) {

    var smallImage = document.getElementById('photoimg');

    smallImage.style.display = 'block';

    smallImage.src = "data:image/jpeg;base64," + imageData;

    imagesrc="data:image/jpeg;base64," + imageData;

    //upload_win(imagescr);

}


function onPhotoURISuccess(imageURI) {

  var largeImage = document.getElementById('largeImage');

  largeImage.style.display = 'block';


  largeImage.src = imageURI;
}

function capturePhoto() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality:30,
    destinationType: destinationType.DATA_URL });
}

function capturePhotoEdit() {
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, allowEdit: true,
    destinationType: destinationType.DATA_URL });
}

function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 100,
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}

function onFail(message) {
  alert('Failed because: ' + message);
}

function clickmarker(val){//跳轉道景點頁面
    pointid=val;
    $.ajax({
        url: "http://bee.japanwest.cloudapp.azure.com//get_attraction_data.php",
        type:"POST",
        dataType:'json',
        data:{
            attraction_id: val
        },

        success: function(data){
            console.log(data);
            $("#titlename").html(data[0]["name"]);
            $("#attraction").html(data[0]["introduction"]);
            $("#addr").html(data[0]["addr"]);
            $("#phone").html(data[0]["phone"]);
            $("#time").html(data[0]["time"]);
        },
        error: function(jqXHR) {
            alert("發生錯誤: " + jqXHR.status);
        },
    })
}

function autocomp(){
	$.ajax({
	url: "http://bee.japanwest.cloudapp.azure.com//routename.php",
	type:"GET",
	dataType:'json',
	success: function(data){
		console.log(data);
			$( function() {
			$( "#postattraction" ).autocomplete({
				source: data
			});
		});
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
    var ref = cordova.InAppBrowser.open('http://bee.japanwest.cloudapp.azure.com/loginfb.php', '_blank', 'location=yes','clearcache=yes');

    ref.addEventListener('loadstop', function()
        {
            ref.executeScript(
                {code: "window.localStorage.getItem('name');"},
                function(values){
                    name = values[0];
                }
            );
            ref.executeScript(
                {code: "window.localStorage.getItem('fbid');"},
                function(values){
                    fbid = values[0];
                    ref.close();
                }
            );

        });
    ref.addEventListener('exit',fbcheck);
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
                          alert(data);
                      },
                      error: function(jqXHR) {
                          console.log(data);
                          alert("發生錯誤: " + jqXHR.status);
                      },
                  })
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
			  console.log(jqXHR.status);
			  alert("發生錯誤: " + jqXHR.status);
			}
		});
    
}

