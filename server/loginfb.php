<!DOCTYPE html>
<html>
<head>
<title>Facebook Login JavaScript Example</title>
<meta charset="UTF-8">
<script src="//connect.facebook.net/en_US/all.js"></script> 
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script>
var dataset=0;
function senddata(data,len){
	for(i=0;i<len;i++){
			$.ajax({
			type:"post",
			url:"test_fbsdk.php",
			data:{
						'city':data.data[i].place.location.city,
						'latitude':data.data[i].place.location.latitude,
						'longitude':data.data[i].place.location.longitude,
						'address':data.data[i].place.location.street,
						'name':data.data[i].place.name

			},
			success:function(callback){
				document.getElementById('fe').innerHTML=dataset++;
				//console.log(callback);
			},
			error:function(){
				alert("error");
			}
		});
	}
}
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

	
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      //testAPI();
		test();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
    } else {

        document.getElementById('status').innerHTML = 'Please log ' +'into Facebook.';
		fbLogin();
/*		FB.login(
		  function(response) {
			console.log(response);
			location.reload();
		  },
		  {
			scope: 'public_profile,email,user_friends,user_about_me,user_tagged_places',
			auth_type: 'rerequest'
		  });*/
    }
  }
	function checkLoginState() {//	取得登入者登入的狀態
	FB.getLoginStatus(function(response) {
	  //statusChangeCallback(response);
	});
	}
	function testAPI() {
	console.log('Welcome!  Fetching your information.... ');
	FB.api('/me', function(response) {
	  console.log('Successful login for: ' + response.name);
	  document.getElementById('status').innerHTML =
		'Thanks for logging in, ' + response.name + '!';
		alert(response.id+"\n"+response.name);		
	});
	}  
	var tmp;
	var tnp;
	var number=0;
	function test(){
		
		FB.api('/me', 'GET',  {"fields":"id,name,birthday,email"},
		  function(response) {
			localStorage.setItem('name',response.name);
			localStorage.setItem('fbid',response.id);
			//alert("first:"+response.id+"\n"+response.name);
			//console.log(response);
			//document.getElementById("status").innerHTML="response="+response.id+"<br>"+response.name;
		  }
		);
		FB.api(
		  '/me',
		  'GET',
		   {"fields":"tagged_places"},
		  function(response) {
				console.log(response);
				tmp = response;
				tmp=getdata(response.tagged_places.paging.next);
				senddata(response.tagged_places.data,response.tagged_places.data.length)
		  });

		}	
		function getdata(t1){
					 console.log("t1",t1);
					 $.get(t1,function(t){
						 console.log("t",t);
						 //alert(number++);
						 senddata(t,t.data.length);
						 if((t.paging.next==undefined)||(number>11))
							return 1;
						 else
							getdata(t.paging.next);
					 })
		
	}
	function fbLogin() {
	var ref = window.open('https://www.facebook.com/dialog/oauth?scope=public_profile,email,user_friends,user_about_me,user_tagged_places&client_id=1651644911825387&redirect_uri=http://bee.japanwest.cloudapp.azure.com//loginfb.php', '_blank', 'location=no');
	 
	 ref.addEventListener('loadstop', function(event) { 
		ref.close();
	 });
	 ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });

};


</script>
</head>
<body>
<script>
  // This is called with the results from from FB.getLoginStatus().





  window.fbAsyncInit = function() {
  FB.init({
    appId      : '1651644911825387',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.6' // use version 2.2
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
	
  });

  };
	
//apptest();
  // Load the SDK  asynchronously
  (function asynchronously(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
	
</script>

x

<fb:login-button scope="public_profile,email,user_friends,user_about_me" onlogin="checkLoginState();">
</fb:login-button>

<div  id="status">
111111111
</div>
<div id="ff"></div>
<div id="fe">
0
</div>
</body>
</html>
