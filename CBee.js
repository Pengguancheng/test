var pointid;
var imagesrc="ppp1.jpg";
var stylesArray =  [
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
                  ]    /*地圖樣式變更*/
    var mapOptions = {
        center: { lat: 23.5, lng: 121},   /*台灣座標*/
        zoom: 8,
        streetViewControl: false,
        scaleControl: true,
        zoomControl: false,
        };
    var map ={} ;
    var name = "peng";
    var fbid = "100011";
    var userid=0;
	var userpurl ="";
    var uploadrs =1;
	var attraction;// 不同地方都不能通用
	var markers = [];
	var markerCluster;	
	var push = {};
	var actmarker = [];	
	var actnum = 0;
	var dataset=0;
	var number = 1;
	var album = {};
	var friend_album = {};
	var likealbum = {};
	var time = 2;//要改


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
	}, 5000);
    $.mobile.changePage('#map');	
}
function mapreload(){
	markers.length = 0;
	markerCluster.length = 0;	
	map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);//test
    map.setOptions({styles: stylesArray});
	get_attraction();
	setInterval("polling();", 5000);
	setInterval(function(){
		if(actmarker.length>0){
			actnum = actnum % actmarker.length;
			//console.log(actnum);
			actmarker[actnum].setMap(null);
			actmarker[actnum] = actmarker[actmarker.length - 1];
			actmarker.pop();
			actnum++;
		}
	}, 5000);
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
					alert("setgcm發生錯誤: " + jqXHR.status);
				},
			})		
		});
	push.on('notification', function(data) {
		console.log(JSON.stringify(data));		 
		//alert(data.additionalData.add);
		$.mobile.changePage('#news_picture');
		news_picture_load(id);
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
		url: "http://bee.japanwest.cloudapp.azure.com//marker.php",
		type:"GET",
		dataType:'json',

		success: function(data){
		  attraction = data;
		  mset(data);
		},
		error: function(jqXHR) {
			//console.log(data);
		  alert("get_attraction發生錯誤: " + jqXHR.status);
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
				if(data!="0"){
					for(i=0;i<data.length;i++){
						if(data[i].class == "post")
							pset(data[i]);
					}
				}	
			},
			error: function(jqXHR) {
			alert("polling發生錯誤: " + jqXHR.status);
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
	// $.mobile.changePage('#news_picture');
	// news_picture_load(id);
	google.maps.event.addListener(marker, 'click', function() {  //跳轉到景點
		//alert(this.id);
		$.mobile.changePage('#news_picture');
		news_picture_load(this.pid);
	});		
}
function onPhotoDataSuccess(imageData) {
	
    var smallImage = document.getElementById('photoimg');

    smallImage.style.display = 'block';

    smallImage.src = "data:image/jpeg;base64," + imageData;

    imagesrc="data:image/jpeg;base64," + imageData;
	
	autocomp();
	$.mobile.changePage('#photo');
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
    destinationType: destinationType.DATA_URL});
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
			$("#goroute").html("<p id='changer' onclick='goroute("+val+")' style=''>路線</p>")
        },
        error: function(jqXHR) {
            alert("clickmarker發生錯誤: " + jqXHR.status);
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
	alert("autocomp發生錯誤: " + jqXHR.status);
	},
})
}
function goroute(id){
    $.ajax({
        url: "http://bee.japanwest.cloudapp.azure.com//goroute.php",
        type:"POST",
        dataType:'json',
        data:{
            route_id: id
        },
        success: function(data){
			likealbum =data;
			$.mobile.changePage('#attroute');
			$("#routelist").empty();
            console.log(data);
			for(i=0;i<data.albumdata.length;i++){
				alert(i);
				var j = i%2;
				if(j==0){
					var rname = "<tr style='background-color:#baeeee;'onclick='like_route("+i+");'><td align='center' width='5%'>"+(i+1)+"</td><td width='70%'>"+data.albumdata[i].user.name+"</td></tr>";
					$("#routelist").append(rname);
				}
				else{					
					var rname="<tr onclick='like_route("+i+");'><td align='center' width='5%'>"+i+"</td><td width='70%'>"+data.albumdata[i].user.name+"</td></tr>";
					$("#routelist").append(rname);
				}
			}
        },
        error: function(jqXHR){
            alert("goroute發生錯誤: " + jqXHR.status);
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
		facebookConnectPlugin.api(userData.authResponse.userID+"/?fields=name,picture,tagged_places", ["public_profile","user_tagged_places"],
		  function onSuccess (result) {
			console.log("Result: "+JSON.stringify(result));
			name = result.name;
			userpurl = result.picture.data.url;
			$(".img_pro").attr({"src":userpurl});
			$(".proname").html(name);
			console.log(JSON.stringify(result.tagged_places));
			senddata(result.tagged_places,result.tagged_places.data.length);
			getdata(result.tagged_places.paging.next);
			fbcheck();
		  }, function onError (error) {
			console.error("Fblogin Failed: ", error);
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
    //alert('id:'+fbid+" name : "+name);
        $.ajax({
            url: "http://bee.japanwest.cloudapp.azure.com//fbchk.php",
            type:"POST",
            dataType:'json',
            data:{
                name : name,
                fbid : fbid,
				userpurl : userpurl
            },
            success: function(data){
                //alert(data);
                userid = data;
				if(userid != 0)
				fbrd();
            },
            error: function(jqXHR) {
                alert("fbcheck發生錯誤: " + jqXHR.status);
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
                          alert("post發生錯誤: " + jqXHR.status);
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
			  console.log(jqXHR.status);
			  alert("postgcm發生錯誤: " + jqXHR.status);
			}
		});
    
}
function routeset(attid) {
  var items = $('#'+attid).width();
  var itemSelected = document.getElementsByClassName('countrySelection-item');
  var backgroundColours = [];
  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    var scrolling = false;

    function scrollContent(direction) {
        var amount = (direction === "left" ? "-=3px" : "+=3px");
        $("#"+attid).animate({
            scrollLeft: amount
        }, 1, function() {
            if (scrolling) {
                scrollContent(direction);
            }
        });
    }
  }  
  $('.countrySelection-item').click(function () {
		$('.countrySelection').find('.active').removeClass('active');
		$(this).addClass("active");
    //newBackgroundColour(backgroundColours)
	});
}
function changeatt(num,alnum){
	$('#gallery-container').empty();
	var i = 1;
	while(1){
		if(album.albumdata[alnum][i] == null)
		break;
		if((album.albumdata[alnum][i][4] != null) && (album.routedata[alnum][num] == album.albumdata[alnum][i][3])){
			var purl =  "<li><img src='http://bee.japanwest.cloudapp.azure.com/img/"+album.albumdata[alnum][i][4]+"' /></li>"
			$('#gallery-container').append(purl);
		}
		i++;			
	}
		$('#gallery-container').snapGallery({
			minWidth: 3,
			maxCols: 3,
			margin: 10
		});
}
function getalbum(){
	$.ajax({
		url: "http://bee.japanwest.cloudapp.azure.com//album.php",
		type:"POST",
		dataType:'json',
		data:{
			'id':userid
		},
		success: function(data){
			console.log(data);
			album = data;
			$("#fans").text(album.userdata.fansnum);
			$("#albumnum").text(album.albumdata.length);
			set_album();
			getlikealbum();
		},
		error: function(jqXHR) {
		  console.log(jqXHR.status);
		  alert("getalbum發生錯誤: " + jqXHR.status);
		}
	});	
}
function set_album(){
	$('#Album').empty();
	for(i=0;i<album.routedata.length;i++){
		var rname = "<div class='alb' onclick='picture_route("+i+")'><img src='jquery-mobile/images/river_101.jpg' width='300' height='200'><div class='desc'>~"+album.albumdata[i].user.name+"~</div></div>" 
		$('#Album').append(rname);
	}	
}
function picture_route(num){	
	$('#countrySelection-items').empty();
	$.mobile.changePage('#Album_route');
	for(i=0;i<album.routedata[num].length;i++){
		var rname = "<li class='countrySelection-item'><a onclick='changeatt("+i+","+num+");' href='#'>"+album.routedata[num][i]+"</a></li>" 
		$('#countrySelection-items').append(rname);
	}	
	routeset('countrySelection-items');	
	for(i=0;i<album.routedata[num].length;i++){
		changeatt(i,num);
	}
	changeatt(0,num);	
}
function friend_getalbum(uid){
	$.ajax({
		url: "http://bee.japanwest.cloudapp.azure.com//album.php",
		type:"POST",
		dataType:'json',
		data:{
			'id':uid
		},
		success: function(data){
			console.log(JSON.stringify(data));
			friend_album = data;
			$("#firend_proname").html(friend_album.userdata.name);
			$("#friend_personpicture").attr({"src":userpurl});
			$("#friend_fans").text(friend_album.userdata.fansnum);
			$("#friend_albumnum").text(friend_album.albumdata.length);
			friend_set_album();
		},
		error: function(jqXHR) {
		  console.log(jqXHR.status);
		  alert("getalbum發生錯誤: " + jqXHR.status);
		}
	});	
}
function friend_set_album(){
	$('#friends_Album').empty();
	for(i=0;i<friend_album.routedata.length;i++){
		var rname = "<div class='alb' onclick='friend_picture_route("+i+")'><img src='jquery-mobile/images/river_101.jpg' width='300' height='200'><div class='desc'>~"+friend_album.albumdata[i].user.name+"~</div></div>" 
		$('#friends_Album').append(rname);
	}	
}
function friend_picture_route(num){	
	$('#countrySelection-items').empty();
	$.mobile.changePage('#Album_route');
	for(i=0;i<friend_album.routedata[num].length;i++){
		var rname = "<li class='countrySelection-item'><a onclick='friend_changeatt("+i+","+num+");' href='#'>"+friend_album.routedata[num][i]+"</a></li>" 
		$('#countrySelection-items').append(rname);
	}	
	routeset('countrySelection-items');
	friend_picture_load(num);	
}
function friend_changeatt(num,alnum){
	$('#gallery-container').empty();
	var i = 1;
	while(1){
		if(friend_album.albumdata[alnum][i] == null)
		break;
		if((friend_album.albumdata[alnum][i][4] != null) && (friend_album.routedata[alnum][num] == friend_album.albumdata[alnum][i][3])){
			var purl =  "<li><img src='http://bee.japanwest.cloudapp.azure.com/img/"+friend_album.albumdata[alnum][i][4]+"' /></li>"
			$('#gallery-container').append(purl);
		}
		i++;			
	}
		$('#gallery-container').snapGallery({
			minWidth: 3,
			maxCols: 3,
			margin: 10
		});
	
}
function friend_picture_load(num){	
	for(i=0;i<friend_album.routedata[num].length;i++){
		friend_changeatt(i,num);
	}
	friend_changeatt(0,num);
}
function getlikealbum(){
	$.ajax({
		url: "http://bee.japanwest.cloudapp.azure.com//like_album.php",
		type:"POST",
		dataType:'JSON',
		data:{
			'id':userid
		},
		success: function(data){
			console.log(JSON.stringify(data));
			likealbum = data;
			$('#likeroute').empty();
			for(i=0;i<likealbum.albumdata.length;i++){
				var rname = "<div class='route' onclick='like_route("+i+");'><b>"+likealbum.albumdata[i].user.name+"</b></div>";
				$('#likeroute').append(rname);
			}
		},
		error: function(jqXHR) {
		  console.log(jqXHR.status);
		  alert("getalbum發生錯誤: " + jqXHR.status);
		}
	});	
}
function like_route(num){	
	$('#countrySelection-items').empty();
	$.mobile.changePage('#Album_route');
	for(i=0;i<likealbum.routedata[num].length;i++){
		var rname = "<li class='countrySelection-item'><a onclick='like_changeatt("+i+","+num+");' href='#'>"+likealbum.routedata[num][i]+"</a></li>" 
		$('#countrySelection-items').append(rname);
	}	
	routeset('countrySelection-items');
}
function like_changeatt(num,alnum){
	$('#gallery-container').empty();
	var i = 1;
	while(1){
		if(likealbum.albumdata[alnum][i] == null)
		break;
		if((likealbum.albumdata[alnum][i][4] != null) && (likealbum.routedata[alnum][num] == likealbum.albumdata[alnum][i][3])){
			var purl =  "<li><img src='http://bee.japanwest.cloudapp.azure.com/img/"+likealbum.albumdata[alnum][i][4]+"' /></li>"
			$('#gallery-container').append(purl);
		}
		i++;			
	}
		$('#gallery-container').snapGallery({
			minWidth: 3,
			maxCols: 3,
			margin: 10
		});
	
}
function getsearchdata(){
$.ajax({
	url: "http://bee.japanwest.cloudapp.azure.com//get_follower_data.php",
	type:"POST",
	dataType:'JSON',
	data:{
		search:$("#search_id").val(),
		user_id: 3,
	},


	success: function(getdata){
		$('#searchtable').empty();
		console.log(getdata);
		var friendlist = getdata['friendlist'];
		var searchdata= getdata['searchdata'];
		
		var getLength = function(obj) {
			var a = 0, key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)){a++;}
			}
			return a;
		};
		var jsonNum = getLength(searchdata); //搜尋結果長度
		var jsonnum = getLength(friendlist); //好友人數
		
		if(jsonNum <= 0){
			alert("查無資料!!");
		}
		else{
			for(var i = 0; i < jsonNum; i++){
				if(check_same(i)==1){
					var text2="<tr id='tr"+i+"'><td align='center' width='10%' onclick='$.mobile.changePage('#friends_pro');'><img src='"+searchdata[i+1]["purl"]+"' width='40px' /></td><td width='80%' onclick='$.mobile.changePage('#friends_pro');'>"+searchdata[i+1]["name"]+"</td><td width='10%'><button id='follow"+(i+1)+"'>FOLLOWED</button></td></tr>";
					$("#searchtable").append(text2);
				}
				else{
					var text3="<tr id='tr"+i+"'><td align='center' width='10%' onclick='$.mobile.changePage('#friends_pro');'><img src='"+searchdata[i+1]["purl"]+"' width='40px' /></td><td width='80%' onclick='$.mobile.changePage('#friends_pro');'>"+searchdata[i+1]["name"]+"</td><td width='10%'><button id='follow"+(i+1)+"'>FOLLOW</button></td></tr>";
						$("#searchtable").append(text3);
				}
			}
			function check_same(i){
				for (var j =0; j < jsonnum; j++){
					if(searchdata[i+1]["id"]==friendlist[j]){
						return 1;
					}
				}
				return 0;
			}
		}
		
		//點擊follow按鈕進行追蹤
		for(var i = 0; i < jsonNum; i++){
			document.getElementById("follow"+(i+1)).addEventListener("click",function(){followuser(this.id)});
		}
		function followuser(id){
			var j = id.slice(6);
			$.ajax({
			url: "http://bee.japanwest.cloudapp.azure.com//make_friend.php",
			type:"POST",
			dataType:'text',
			data:{
				friend_id: searchdata[j]['id'],
				user_id: userid,
			},


			success: function(getdata){
				alert(getdata);
			},

			error: function(jqXHR) {
				alert("發生錯誤: " + jqXHR.status);
			},
			})
		}
	},

	error: function(jqXHR) {
		console.log(JSON.stringify(jqXHR));
		alert("發生錯誤: " + jqXHR.status);
	},
});	
}
function news_laod(){
//$.mobile.changePage('#news');
$.ajax({
	url: "http://bee.japanwest.cloudapp.azure.com//get_friend_data.php",
	type:"POST",
	dataType:'json',
	data:{
		user_id:userid,
		time:1,
	},


	success: function(getdata){
			$("#newblock").empty();
			var time = '1';
			//console.log(getdata);
		   if(getdata==0){
			var nofriend="<div>您沒有追蹤者</div>"
			$("#newblock").append(nofriend);
		   }
		   else if (getdata==1){
			var nopost="<div>沒有新貼文了</div>"
			$("#newblock").append(nopost);
		   }
		   else{
			var data = getdata['albumdata'];
			var msg = getdata['message'];
			var route = getdata['routedata'];
			var txtId = 1;
			var jsonNum = data.length; //json的長度
			
			var getLength = function(obj) {
				var a = 0, key;
				for (key in obj) {
					if (obj.hasOwnProperty(key)){a++;}
				}
				return a;
			};
			
			for (var i = 0; i < jsonNum; i++) {
				//動態產生整篇貼文
				var txt="<div class='card w3-round w3-container' id='showBlock"+time+i+"'><div><br><table><tr><td width='20%'><img class='w3-left w3-circle w3-margin-right' src='"+data[i]["user"][3]+"' style='width:100%;' align='center'/></td><td width='30%' align='left'><h4><b>"+data[i]["user"][1]+"</b></h4></td><td class='w3-right w3-opacity'><span>"+data[i]["time"]+"</span></td></tr></table><hr class='w3-clear'></div><br><br><div class='contactUs'><div class='countrySelection'><div class='countrySelection-wrapper'><ul id='countrySelection-items"+time+i+"'class='countrySelection-items' style=''></ul></div></div></div><br><div id='Glide"+time+i+"' class='glide'><div class='glide__wrapper'><ul style='padding-left:0;' class='glide__track' id='ul"+time+i+"'></ul></div></div><div class='container'><br><table><td><button id='like"+time+i+"' type='button' class='w3-btn w3-theme-d1 w3-margin-bottom'><i class='fa fa-heart'></i>  Like</button></td><td><button id='save"+time+i+"' type='button' class='w3-btn w3-theme-d2 w3-margin-bottom'><i class='fa fa-comment'></i>  SAVE</button></td></table></div></div><br>";
				$("#newblock").append(txt);
				var data1 = data[i];
				var jsonnum = getLength(data1);
				for(var j = 0; j < jsonnum-5; j++){
					//動態產生照片
					var text="<li id='li"+time+" "+i+" "+j+"' class='glide__slide'><p>"+data[i][j+1][1]+"</p><br><img src='http://bee.japanwest.cloudapp.azure.com/img/"+data[i][j+1][4]+"' alt='montain' style='width:100%' onclick="+data[i][j+1][0]+"></li>";
					$("#ul"+time+i).append(text);
					
					var num = getLength(msg[i][j+1]);
					if(num>=2){
						//動態產生留言
						var text1="<div><img src='"+msg[i][j+1][3]+"'><br><p>name: "+msg[i][j+1][2]+"</p><br><p>"+msg[i][j+1][4]+"</p></div><div><img src='http://bee.japanwest.cloudapp.azure.com//"+msg[i][j+1][3]+"'><br><p>name: "+msg[i][j+1][6]+"</p><br><p>"+msg[i][j+1][8]+"</p></div>";
						$("#li"+time+" "+i+" "+j).append(text1);
					}
				}
				for(var j = 0; j < jsonnum-5; j++){
					//動態產生路線
					var text2="<li id='rd"+time+i+" "+j+"' class='countrySelection-item'><a href='#'>"+route[i][j]+"</a></li>";
					$("#countrySelection-items"+time+i).append(text2);
				}
				routeset("countrySelection-items"+time+i);
			}
			
			//讓相片滑動可以執行的code (別刪)
				for (var i = 0; i < jsonNum; i++) {
					$("#Glide"+time+i).glide({
						type: "slider"
					});		
				}
			
			
			//點擊button喜歡相簿 (寫入資料庫)
			for (var i = 0; i < jsonNum; i++) {
				document.getElementById("like"+time+i).addEventListener("click",function(){addlike(this.id,time,i)});
			}
			function addlike(id,time,i) {
				var tl = time.length;
				var j = id.slice(4+tl);
				//alert(j);
				
				$.ajax({
				url: "http://bee.japanwest.cloudapp.azure.com//write_like_album.php",
				type:"POST",
				dataType:'text',
				data:{
					user_id: userid,
					album_id: data[j]["id"],
				},


				success: function(getdata){
					if(getdata==1){
						alert("已經按過讚!!");
					}
					else{
						alert("寫入成功!!");
					}
				},

				error: function(jqXHR) {
					alert("發生錯誤844: " + jqXHR.status);
				},
				})
			}
			
			//點擊button收藏相簿 (寫入資料庫)
			for (var i = 0; i < jsonNum; i++) {
				document.getElementById("save"+time+i).addEventListener("click",function(){addsave(this.id,time,i)});
			}
			function addsave(id,time,i) {
				var tl = time.length;
				var j = id.slice(4+tl);
				//alert(j);
				
				$.ajax({
				url: "http://bee.japanwest.cloudapp.azure.com//write_save_album.php",
				type:"POST",
				dataType:'text',
				data:{
					user_id: userid,
					album_id: data[j]["id"],
				},


				success: function(getdata){
					if(getdata==1){
						alert("已經收藏過囉!!");
					}
					else{
						alert("寫入成功!!");
					}
				},

				error: function(jqXHR) {
					alert("發生錯誤878: " + jqXHR.status);
				},
				})
			}
			
			//點擊照片，跳轉頁面
			for (var i = 0; i < jsonNum; i++) {
				var data1 = data[i];
				var jsonnum = getLength(data1);
				for(var j = 0; j < jsonnum-5; j++){
					document.getElementById("li"+time+" "+i+" "+j).addEventListener("click",function(){jump(this.id,time)});
				}
			}
			function jump(id,time,i){
				var newid1 = id.toString();
				var Newarray = new Array();
				var Newarray = newid1.split(" ");
				var i1 = Newarray[1];
				var j1 = Newarray[2];
				var i = parseInt(i1);
				var j = parseInt(j1);
				//alert(i+" "+j);
				var pic_id = data[i][j+1][0];
				//alert(pic_id);
				$.mobile.changePage('#news_picture');
				news_picture_load(pic_id);
			}

			
			//點選路線名稱跳到相對應的照片
			for (var i = 0; i < jsonNum; i++) {
				var data1 = data[i];
				var jsonnum = getLength(data1);
				for(var j = 0; j < jsonnum-5; j++){
					document.getElementById("rd"+time+i+" "+j).addEventListener("click",function(){add(this.id,time)});
				}
			}
			function add(id,time,i){
				var newid1 = id.toString();
				var Newarray = new Array();
				var Newarray = newid1.split(" ");
				var j = Newarray[1];
				//alert(j);
				for (var i = 0; i < jsonNum; i++) {
					var glide_api = $("#Glide"+time+i).glide().data('glide_api');
					var data1 = data[i];
					var jsonnum = getLength(data1);						
					for(var k = 0; k < jsonnum-5; k++){
						if(route[i][j]==data[i][k+1][3]){
							glide_api.jump('='+(k+1));
						}
					}
				}
			}			
		   }
			
		},

	error: function(jqXHR) {
			alert("發生錯誤931: " + jqXHR.status);
		},
	})	
}
function new_data() {
	//console.log(time);
	$.ajax({
		url: "http://bee.japanwest.cloudapp.azure.com//get_friend_data.php",
		type:"POST",
		dataType:'json',
		data:{
			user_id:userid,
			time:time,
		},


		success: function(getdata){
		   if(getdata==0){
			var nofriend="<div>您沒有追蹤者</div>"
			$("#newblock").append(nofriend);
		   }
		   else if (getdata==1){
			var nopost="<div>沒有新貼文了</div>"
			$("#newblock").append(nopost);
		   }
		   else{
			var data = getdata['albumdata'];
			var msg = getdata['message'];
			var route = getdata['routedata'];
			var txtId = 1;
			var jsonNum = data.length; //json的長度
			
			var getLength = function(obj) {
				var a = 0, key;
				for (key in obj) {
					if (obj.hasOwnProperty(key)){a++;}
				}
				return a;
			};
			
			for (var i = 0; i < jsonNum; i++) {
				//動態產生整篇貼文
				var txt="<div class='card w3-round w3-container' id='showBlock"+time+i+"'><div><br><table><tr><td width='20%'><img class='w3-left w3-circle w3-margin-right' src='"+data[i]["user"][3]+"' style='width:100%;' align='center'/></td><td width='30%' align='left'><h4><b>"+data[i]["user"][1]+"</b></h4></td><td class='w3-right w3-opacity'><span>"+data[i]["time"]+"</span></td></tr></table><hr class='w3-clear'></div><br><br><div class='contactUs'><div class='countrySelection'><div class='countrySelection-wrapper'><ul id='countrySelection-items"+time+i+"'class='countrySelection-items' style=''></ul></div></div></div><br><div id='Glide"+time+i+"' class='glide'><div class='glide__wrapper'><ul style='padding-left:0;' class='glide__track' id='ul"+time+i+"'></ul></div></div><div class='container'><br><table><td><button id='like"+time+i+"' type='button' class='w3-btn w3-theme-d1 w3-margin-bottom'><i class='fa fa-heart'></i>  Like</button></td><td><button id='save"+time+i+"' type='button' class='w3-btn w3-theme-d2 w3-margin-bottom'><i class='fa fa-comment'></i>  SAVE</button></td></table></div></div><br>";
				$("#newblock").append(txt);
				var data1 = data[i];
				var jsonnum = getLength(data1);
				for(var j = 0; j < jsonnum-5; j++){
					//動態產生照片
					var text="<li id='li"+time+i+j+"' class='glide__slide'><p>"+data[i][j+1][1]+"</p><br><img src='http://bee.japanwest.cloudapp.azure.com/img/"+data[i][j+1][4]+"' alt='montain' style='width:100%' onclick="+data[i][j+1][0]+"></li>";
					$("#ul"+time+i).append(text);
					
					var num = getLength(msg[i][j+1]);
					if(num>=2){
						//動態產生留言
						var text1="<div><img src='"+msg[i][j+1][3]+"'><br><p>name: "+msg[i][j+1][2]+"</p><br><p>"+msg[i][j+1][4]+"</p></div><div><img src='http://bee.japanwest.cloudapp.azure.com//"+msg[i][j+1][3]+"'><br><p>name: "+msg[i][j+1][6]+"</p><br><p>"+msg[i][j+1][8]+"</p></div>";
						$("#li"+time+i+j).append(text1);
					}
				}
				for(var j = 0; j < jsonnum-5; j++){
					//動態產生路線
					var text2="<li id='rd"+time+i+j+"' class='countrySelection-item'><a href='#'>"+route[i][j]+"</a></li>";
					$("#countrySelection-items"+time+i).append(text2);
				}
				routeset("countrySelection-items"+time+i);
			}
			
			//讓相片滑動可以執行的code (別刪)
			for (var i = 0; i < jsonNum; i++) {
				$("#Glide"+time+i).glide({
					type: "slider"
				});		
			}
			
			//點選路線名稱跳到相對應的照片
			for (var i = 0; i < jsonNum; i++) {
				var data1 = data[i];
				var jsonnum = getLength(data1);
				for(var j = 0; j < jsonnum-5; j++){
					document.getElementById("rd"+time+i+j).addEventListener("click",function(){add(this.id,time,i)});
				}
			}
			function add(id,time,i){
				var tl = time.length;
				var is = i.toString();
				var il = is.length;
				var j = id.slice(2+tl+il);
				for (var i = 0; i < jsonNum; i++) {
					var glide_api = $("#Glide"+time+i).glide().data('glide_api');
					var data1 = data[i];
					var jsonnum = getLength(data1);						
					for(var k = 0; k < jsonnum-5; k++){
						if(route[i][j]==data[i][k+1][3]){
							glide_api.jump('='+(k+1));
						}
					}
				}
			}
			
			//點擊button喜歡相簿 (寫入資料庫)
			for (var i = 0; i < jsonNum; i++) {
				document.getElementById("like"+time+i).addEventListener("click",function(){addlike(this.id,time,i)});
			}
			function addlike(id,time,i) {
				var tl = time.length;
				var j = id.slice(4+tl);
				//alert(j);
				
				$.ajax({
				url: "http://bee.japanwest.cloudapp.azure.com//write_like_album.php",
				type:"POST",
				dataType:'text',
				data:{
					user_id: userid,
					album_id: data[j]["id"],
				},


				success: function(getdata){
					if(getdata==1){
						alert("已經按過讚!!");
					}
					else{
						alert("寫入成功!!");
					}
				},

				error: function(jqXHR) {
					alert("發生錯誤:1058 " + jqXHR.status);
				},
				})
			}
			
			//點擊button收藏相簿 (寫入資料庫)
			for (var i = 0; i < jsonNum; i++) {
				document.getElementById("save"+time+i).addEventListener("click",function(){addsave(this.id,time,i)});
			}
			function addsave(id,time,i) {
				var tl = time.length;
				var j = id.slice(4+tl);
				//alert(j);
				
				$.ajax({
				url: "http://bee.japanwest.cloudapp.azure.com//write_save_album.php",
				type:"POST",
				dataType:'text',
				data:{
					user_id: userid,
					album_id: data[j]["id"],
				},


				success: function(getdata){
					if(getdata==1){
						alert("已經收藏過囉!!");
					}
					else{
						alert("寫入成功!!");
					}
				},

				error: function(jqXHR) {
					alert("發生錯誤:1092 " + jqXHR.status);
				},
				})
			}
			
			//點擊照片，跳轉頁面
			for (var i = 0; i < jsonNum; i++) {
				var data1 = data[i];
				var jsonnum = getLength(data1);
				for(var j = 0; j < jsonnum-5; j++){
					document.getElementById("li"+time+i+j).addEventListener("click",function(){jump(this.id,time,i)});
				}
			}
			function jump(id,time,i){
				$.mobile.changePage('#news_picture');
				news_picture_load(id);
			}		
		   }
		   
		},

		error: function(jqXHR) {
			alert("發生錯誤:1114 " + jqXHR.status);
		},
	})	
}
function news_picture_load(pid){
$.ajax({
	url: "http://bee.japanwest.cloudapp.azure.com//get_picture_data.php",
	type:"POST",
	dataType:'json',
	data:{
		pic_id:pid,
		user_id: userid, //要改成讀取使用者Id
	},


	success: function(getdata){		
		$("#newpicblock").empty();
		console.log(getdata);		
		var picdata = getdata['picturedata'];
		var msg = getdata['msg'];
		var user = getdata['user'];
		
		var getLength = function(obj) {
			var a = 0, key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)){a++;}
			}
			return a;
		};
		var jsonNum = getLength(msg); //json的長度
		
		console.log(jsonNum);
		
		var txt1="<div class='card w3-round w3-container' id='showBlock'><div><br><table><tr><td width='20%'><img class='w3-left w3-circle w3-margin-right' src='"+picdata["user"][3]+"' style='width:100%;' align='center'/></td><td width='30%' align='left'><h4><b>"+picdata["user"][1]+"</b></h4></td><td class='w3-right w3-opacity'><span></span></td></tr></table><hr class='w3-clear'></div><br><div id='pic'><p>"+picdata["context"]+"</p><br><img src='http://bee.japanwest.cloudapp.azure.com/img/"+picdata["purl"]+"' alt='montain' style='width:100%'><hr class='w3-clear'><div id='msg'></div></div><div class='container'><div id='picmsg"+i+"'><img src='"+user[3]+"'><br><p>name: "+user[1]+"</p><br><input type='text' id='leave_massage'><button id='message_context'>留言</button></div><br></div></div>";
		$("#newpicblock").append(txt1);
		
		if(jsonNum <= 0){
			var text1="<div><p>快來成為第一個留言的人喔!</p></div>";
				$("#msg").append(text1);
		}
		else{
			for(var i = 0; i < jsonNum; i++){
				var text2="<div id='picmsg"+i+"'><img src='"+msg[i+1][4]+"'><br><p>name: "+msg[i+1][1]+"</p><br><p>"+msg[i+1][3]+"</p></div>";
				$("#msg").append(text2);
			}
		}
		
		//點擊button喜歡相簿 (寫入資料庫)
		document.getElementById("message_context").addEventListener("click",function(){addusermsg(jsonNum)});
		
		function addusermsg(jsonNum) {		
			var num = 0;
			//alert($("#leave_massage").val());
			$.ajax({
			url: "http://bee.japanwest.cloudapp.azure.com//write_picture_context.php",
			type:"POST",
			dataType:'json',
			data:{
				context: $("#leave_massage").val(),
				pic_id: picdata["id"],
				user_id: userid,
			},


			success: function(getdata){
				//console.log(getdata);
				var text3 = "<div id='picmsg"+(jsonNum+num)+"'><img src='"+getdata[3]+"'><br><p>name: "+getdata[1]+"</p><br><p>"+getdata[2]+"</p></div>";
				$("#msg").append(text3);
				num++;
			},

			error: function(jqXHR) {
				alert("發生錯誤:1186 " + jqXHR.status);
			},
			})
		}
	},

	error: function(jqXHR) {
		alert("發生錯誤:1193 " + jqXHR.status);
	},
})	
}
function gorank(){
	$("#showBlock").empty();
	$.ajax({
		url: "http://bee.japanwest.cloudapp.azure.com//get_leaderboard_data.php",
		type:"POST",
		dataType:'json',
		
		success: function(data){
			console.log(data);
			var txtId = 1;
			var jsonNum = data.length; //json的長度
			for (var i = 0; i < jsonNum; i++) {
				if ((txtId%2)==1){
					var text1 = "<tr id='div"+ txtId +"' style='background-color:#baeeee;' onclick='$.mobile.changePage('#Attractions');clickmarker("+data[i]["id"]+");'><td align='center' width='10%'>"+ txtId +"</td><td width='75%'>"+data[i]["name"]+"</td><td width='5%'><img src='jquery-mobile/images/hearts.png' width='15px'/></td><td width='10%' align='center'>"+data[i]["likenumber"]+ "</td></tr>";
					$("#showBlock").append(text1);
					txtId++;
				}
				else{
					var text2 = "<tr id='div"+ txtId +"' onclick='$.mobile.changePage('#Attractions');clickmarker("+data[i]["id"]+");'><td align='center' width='10%'>"+ txtId +"</td><td width='75%'>"+data[i]["name"]+"</td><td width='5%'><img src='jquery-mobile/images/hearts.png' width='15px'/></td><td width='10%' align='center'>"+data[i]["likenumber"]+ "</td></tr>";
					$("#showBlock").append(text2);
					txtId++;
				}
			}
		},

		error: function(jqXHR) {
			alert("發生錯誤: " + jqXHR.status);
		},
	})
}