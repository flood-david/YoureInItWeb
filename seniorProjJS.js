
//opens left submission nav
function openNav() {
	    var i = arguments[0].replace(/9/g," ");
		document.getElementById("navHeader").innerHTML = i;
		document.getElementById("navHeader").name = arguments[1];
		document.getElementById("mySidenav").style.width = "250px";
}
	
//opens right info nav
function openNav2() {
	    var i = arguments[0].replace(/9/g," ");
		document.getElementById("navHeader2").innerHTML = i;
		document.getElementById("navHeader2").name = arguments[1];
		
		document.getElementById("navMR").innerHTML = arguments[2].replace(",","<br></br>");
		document.getElementById("navMC").innerHTML = arguments[3];
		document.getElementById("navWR").innerHTML = arguments[4];
		document.getElementById("navWC").innerHTML = arguments[5];
		document.getElementById("navGR").innerHTML = arguments[6];
		document.getElementById("navGC").innerHTML = arguments[7];
		
		document.getElementById("mySidenav2").style.width = "250px";
	}
	//closes left nav
	function closeNav() {
		document.getElementById("mySidenav").style.width = "0";
	}

	//closes right nav
	function closeNav() {
		document.getElementById("mySidenav2").style.width = "0";
	}
	
//get http request
function loadDoc(marker, place) {
  var xhttp = new XMLHttpRequest();
  var response;
  xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
	  response = JSON.parse(xhttp.responseText);
	  if(response.bathroomDetails != null){
	  infoWindow = new google.maps.InfoWindow();
       google.maps.event.addListener(marker, 'click', function() {
	   var h, avgRating=0, counter=0;
	   if(response.bathroomDetails.mensRoom.ratings != null){
		for(h = 0; h <response.bathroomDetails.mensRoom.ratings.length;h++){
	         avgRating += response.bathroomDetails.mensRoom.ratings[h];
			 counter++;
		}
	   }
	   if(response.bathroomDetails.womensRoom.ratings != null){
		for(h = 0; h <response.bathroomDetails.womensRoom.ratings.length;h++){
	         avgRating += response.bathroomDetails.womensRoom.ratings[h];
			 counter++;
		}
	   }
	   if(response.bathroomDetails.genderNeutral.ratings != null){
		for(h = 0; h <response.bathroomDetails.genderNeutral.ratings.length;h++){
	         avgRating += response.bathroomDetails.genderNeutral.ratings[h];
			 counter++;
		}
	   }
	   var mensE = "", womensE = "", gNE ="";
	   if (response.bathroomDetails.mensRoom.exists){
		mensE="checked";
		}
	   if (response.bathroomDetails.womensRoom.exists){
		womensE="checked";
		}
		if (response.bathroomDetails.genderNeutral.exists){
			gNE="checked";
		}
		 var contentString = '<div id = "content">'+
			'<div id = placeName>'+
			'<h1 id = firstHeading">'+ place.name +'</h1>'+
			'</div>'+
			'<p> RestRooms Available: </p>'+
			'<form action ="">'+
			'<input type="checkbox" name="restroom" '+ mensE+' value="male" disabled>&nbsp;Male&nbsp;'+
			'<input type="checkbox"  name="restroom" '+ womensE+' value="womens" disabled> &nbsp;Womens&nbsp;'+
			'<input type="checkbox"  name="restroom" '+ gNE+'" value="genderneutral" disabled> &nbsp;GenderNeutral&nbsp;'+
			'</form>'+
			'<p></p>'+
			'<p>Average Rating: '+ avgRating/counter +'</p>'+
			'<br></br>'+
			'<span style="font-size:12px;color:blue;cursor:pointer" onclick=openNav2("' + place.name.replace(/ /g, "9") +'","'+ place.id+'","'+ response.bathroomDetails.mensRoom.ratings+'","'+ response.bathroomDetails.mensRoom.codes +'","'+ response.bathroomDetails.womensRoom.ratings+'","'+ response.bathroomDetails.womensRoom.codes +'","'+ response.bathroomDetails.genderNeutral.ratings+'","'+ response.bathroomDetails.genderNeutral.codes+'")>More Info</span>'+
			'<br></br>'+
			'<span style="font-size:12px;color:blue;cursor:pointer" onclick=openNav("' + place.name.replace(/ /g, "9") +'","'+ place.id+'")>Add Review</span>'+
			'</div>';
		
         infoWindow.setContent(contentString);
          infoWindow.open(map, this);
        });
		}
		else{
		//if there is no info for this location
		 infoWindow = new google.maps.InfoWindow();
		google.maps.event.addListener(marker, 'click', function() {
		 var contentString = '<div id = "content">'+
			'<div id = placeName>'+
			'<h1 id = firstHeading">'+ place.name +'</h1>'+
			'</div>'+
			'<span style="font-size:12px;color:blue;cursor:pointer" onclick=openNav("' + place.name.replace(/ /g, "9") +'","'+ place.id+'")>Add Review</span>'+
			'</div>';
		
         infoWindow.setContent(contentString);
          infoWindow.open(map, this);
        });
		}
	}
  };
  xhttp.open("GET", "https://powerful-falls-22457.herokuapp.com/api/bathroom-details/findByPlaceId/" + place.id, true);
  xhttp.send();
}

//put http request
function sendDoc(){
	var xhttp = new XMLHttpRequest();
			//make sure not to submit a null value
	for(var i = 0; i < arguments.length;i++){
		if(arguments[i] != null && arguments[1] != undefined){
		
		}
		else{
			arguments[i]="";
		}
	}

	var body = '{'+
			'"placeId": "'+ arguments[0] + '",'+
			'"mensRoom": {'+
				'"exists": ' + arguments[1] +','+
				'"handicap": '+ arguments[2]+','+
				'"ratings": ['+
					arguments[3] + 
				'],'+
				'"codes": ['+
					arguments[4]+
				']'+
			'},'+
			'"womensRoom": {'+
				'"exists":'+ arguments[5]+','+
				'"handicap": '+ arguments[6]+','+
				'"ratings": ['+
					arguments[7]+
				'],'+
				'"codes": ['+
					arguments[8]+
				']'+
			'},'+
			'"genderNeutral": {'+
				'"exists": ' + arguments[9] + ','+
				'"handicap": '+ arguments[10]+','+
				'"ratings": ['+
					arguments[11]+
				'],'+
				'"codes": ['+
					arguments[12]+
				']'+
			'}'+
		'}';
		console.log(body);
		xhttp.onreadystatechange=function() {
		if (this.readyState == 4 && this.status == 200) {


				document.getElementById("MensRoomExist").removeAttr('checked');
				document.getElementById("mensbathroomRating").value="";
				document.getElementById("mensbathroomCode").value="";
				document.getElementById("WomensRoomExist").removeAttr('checked');
				document.getElementById("womensbathroomRating").value="";
				document.getElementById("womensbathroomCode").value="";
				document.getElementById("GNRoomExist").removeAttr('checked');
				document.getElementById("gnbathroomRating").value="";
				document.getElementById("gnbathroomCode").value="";
		}
		};
		xhttp.open("PUT", "https://powerful-falls-22457.herokuapp.com/api/bathroom-details/add-bathroom-details", true);
		xhttp.setRequestHeader('Content-type', 'application/json');
		xhttp.send(body);
}