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
        center: { lat: 23.5, lng: 122},   /*台灣座標*/
        zoom: 8,
        streetViewControl: false,
        scaleControl: true,
        zoomControl: false,
        };
    var map ;
    var name = "";
    var fbid = "";



function onDeviceReady() {
    //fblogin();
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    map.setOptions({styles: stylesArray});
    $.mobile.changePage('#home');
}
function initialize() {
    var mapOptions = {
        center: { lat: 23.5, lng: 122},   /*台灣座標*/
        zoom: 8,
        streetViewControl: false,
        scaleControl: true,
        zoomControl: false,
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
        //addpoint(map);
        map.setOptions({styles: stylesArray});
        //setmap(22.0440905,121.515303)
};
function setmap(a,b) {
         $.mobile.changePage('#map');
         map.setCenter(new google.maps.LatLng(a,b));
         map.setZoom(11);
};
function loadScript() {
    var script = document.createElement("script");
    script.src = "http://maps.googleapis.com/maps/api/js?callback=initialize";
    document.body.appendChild(script);
}

function onPhotoDataSuccess(imageData) {

    var smallImage = document.getElementById('smallImage');

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
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality:50,
    destinationType: destinationType.DATA_URL });
}

function capturePhotoEdit() {
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 30, allowEdit: true,
    destinationType: destinationType.DATA_URL });
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
function addpoint(map){
    var markerid=1;
    var marker = new google.maps.Marker({
      position:new google.maps.LatLng(23.5,121),
      map:map,
      title: 'Hello World!'
    });
    google.maps.event.addListener(marker, 'click', function() {  //跳轉到景點
        $.mobile.changePage('#Attractions');
        clickmarker(markerid);
    });
    google.maps.event.addListener(marker, 'taphold', function() {   //跳轉到路線
                   $.mobile.changePage('#route');
               });
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
    alert("Upload Success");
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

function upload_win(fileURL) {
    var uri = encodeURI("http://bee.japanwest.cloudapp.azure.com//server_save.php");
    fileURL=imagesrc;
    var ft = new FileTransfer();
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName="image.jpg";
    options.mimeType="image/jpg";
    options.trustAllHosts=true;
    var headers={'headerParam':'headerValue'};

    options.headers = headers;

    ft.onprogress = function(progressEvent) {
        if (progressEvent.lengthComputable) {
          loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
        } else {
          loadingStatus.increment();
        }
    };
    ft.upload(fileURL, uri, win, fail, options);

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
                alert(data);
            },
            error: function(jqXHR) {
                alert("發生錯誤: " + jqXHR.status);
            },
        })
}

