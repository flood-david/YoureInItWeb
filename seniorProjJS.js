
//opens left submission nav
function openNav() {
	    var i = arguments[0].replace(/9/g," ");
		document.getElementById("navHeader").innerHTML = i;
		document.getElementById("navHeader").name = arguments[1];
		document.getElementById("mySidenav").style.width = "250px";
}
	
//opens right info nav
function openNav2() { 
	$(".infoTable tr").remove();
	var i = arguments[0].replace(/9/g," ");
	var index;
	document.getElementById("navHeader2").innerHTML = i;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange=function() {
	if (this.readyState == 4 && this.status == 200) {
		response = JSON.parse(xhttp.responseText);
		if(response.bathroomDetails!=null){
			if(response.bathroomDetails.placeId!=null){
				document.getElementById("navHeader2").name = response.bathroomDetails.placeId;
			}
			if(response.bathroomDetails.mensRoom!=null){
				if(response.bathroomDetails.mensRoom.ratings!=null){
					for(index = 0; index < response.bathroomDetails.mensRoom.ratings.length;index++){
						var table = document.getElementById("navMR").getElementsByTagName('tbody')[0];;
						var row = table.insertRow(table.rows.length);
						var cell1 = row.insertCell(0);
						cell1.innerHTML = response.bathroomDetails.mensRoom.ratings[index];
					}
				}
				
				if(response.bathroomDetails.mensRoom.codes!=null){
					for(index = 0; index < response.bathroomDetails.mensRoom.codes.length;index++){
						var table = document.getElementById("navMC").getElementsByTagName('tbody')[0];;
						var row = table.insertRow(table.rows.length);
						var cell1 = row.insertCell(0);
						var cell2 = row.insertCell(1);
						cell1.innerHTML = response.bathroomDetails.mensRoom.codes[index].number;
						cell2.innerHTML = '<i class="glyphicon glyphicon-chevron-up" id ="up" onclick=sendVote("'+response.bathroomDetails.placeId+'","up","'+response.bathroomDetails.mensRoom.codes[index].number+'",'+ response.bathroomDetails.mensRoom.codes[index].votes+',"mens")></i> '+response.bathroomDetails.mensRoom.codes[index].votes+' <i class="glyphicon glyphicon-chevron-down" id="down" onclick=sendVote("'+response.bathroomDetails.placeId+'","down","'+response.bathroomDetails.mensRoom.codes[index].number+'",'+ response.bathroomDetails.mensRoom.codes[index].votes+',"mens")></i>';
					}				
				}
		
			}
		
			if(response.bathroomDetails.womensRoom!=null){
				if(response.bathroomDetails.mensRoom.ratings!=null){
					for(index = 0; index < response.bathroomDetails.womensRoom.ratings.length;index++){
						var table = document.getElementById("navWR").getElementsByTagName('tbody')[0];;
						var row = table.insertRow(table.rows.length);
						var cell1 = row.insertCell(0);
						cell1.innerHTML = response.bathroomDetails.womensRoom.ratings[index];
					}				}
				if(response.bathroomDetails.womensRoom.codes!=null){
					for(index = 0; index < response.bathroomDetails.womensRoom.codes.length;index++){
						var table = document.getElementById("navWC").getElementsByTagName('tbody')[0];;
						var row = table.insertRow(table.rows.length);
						var cell1 = row.insertCell(0);
						var cell2 = row.insertCell(1);
						cell1.innerHTML = response.bathroomDetails.womensRoom.codes[index].number;
						cell2.innerHTML =  '<i class="glyphicon glyphicon-chevron-up" id ="up" onclick=sendVote("'+response.bathroomDetails.placeId+'","up","'+response.bathroomDetails.womensRoom.codes[index].number+'",'+ response.bathroomDetails.womensRoom.codes[index].votes+',"womens")></i> '+response.bathroomDetails.womensRoom.codes[index].votes+' <i class="glyphicon glyphicon-chevron-down" id="down" onclick=sendVote("'+response.bathroomDetails.placeId+'","down","'+response.bathroomDetails.womensRoom.codes[index].number+'",'+ response.bathroomDetails.womensRoom.codes[index].votes+',"womens")></i>';
					}					
				}
			}
			
			if(response.bathroomDetails.genderNeutral!=null){
				if(response.bathroomDetails.genderNeutral.ratings!=null){
					for(index = 0; index < response.bathroomDetails.genderNeutral.ratings.length;index++){
						var table = document.getElementById("navGR").getElementsByTagName('tbody')[0];;
						var row = table.insertRow(table.rows.length);
						var cell1 = row.insertCell(0);
						cell1.innerHTML = response.bathroomDetails.genderNeutral.ratings[index];
					}				}
				if(response.bathroomDetails.genderNeutral.codes!=null){
					for(index = 0; index < response.bathroomDetails.genderNeutral.codes.length;index++){
						var table = document.getElementById("navGC").getElementsByTagName('tbody')[0];;
						var row = table.insertRow(table.rows.length);
						var cell1 = row.insertCell(0);
						var cell2 = row.insertCell(1);
						cell1.innerHTML = response.bathroomDetails.genderNeutral.codes[index].number;
						cell2.innerHTML =  '<i class="glyphicon glyphicon-chevron-up" onclick=sendVote("'+response.bathroomDetails.placeId+'","up","'+response.bathroomDetails.genderNeutral.codes[index].number+'",'+ response.bathroomDetails.genderNeutral.codes[index].votes+',"genderNeutral")></i> '+response.bathroomDetails.genderNeutral.codes[index].votes+' <i class="glyphicon glyphicon-chevron-down" id="down" onclick=sendVote("'+response.bathroomDetails.placeId+'","down","'+response.bathroomDetails.genderNeutral.codes[index].number+'",'+ response.bathroomDetails.genderNeutral.codes[index].votes+',"genderNeutral")></i>';
					}					
				}
			}
		
		document.getElementById("mySidenav2").style.width = "250px";		
			}
	}
		};
		xhttp.open("GET", "https://powerful-falls-22457.herokuapp.com/api/bathroom-details/findByPlaceId/ChIJN1t_tDeuEmsRUsoyG83frY4", true);
			xhttp.send();
}
	    

	//closes left nav
	function closeNav() {
		document.getElementById("mySidenav").style.width = "0";
	}

	//closes right nav
	function closeNav2() {
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
	   if(response.bathroomDetails.mensRoom.codes != null){
		 var mensCodes = response.bathroomDetails.mensRoom.codes;
		 //mensCodes = JSON.stringify(mensCodes);
	   }
	   if(response.bathroomDetails.womensRoom.codes != null){
		var womensCodes = response.bathroomDetails.womensRoom.codes;
		 //womensCodes = JSON.stringify(womensCodes);
	   }
	   if(response.bathroomDetails.genderNeutral.codes != null){
		var gnCodes = response.bathroomDetails.genderNeutral.codes;
		 //gnCodes = JSON.stringify(gnCodes);
	   }
	   var mensE = "", womensE = "", gNE ="",mensH = "", womensH = "", gNH ="";
	   if (response.bathroomDetails.mensRoom.exists){
		mensE="checked";
		}
	   if (response.bathroomDetails.womensRoom.exists){
		womensE="checked";
		}
		if (response.bathroomDetails.genderNeutral.exists){
			gNE="checked";
		}
		if (response.bathroomDetails.mensRoom.handicap){
		mensH="checked";
		}
	   if (response.bathroomDetails.womensRoom.handicap){
		womensH="checked";
		}
		if (response.bathroomDetails.genderNeutral.handicap){
			gNH="checked";
		}			
		var avg = avgRating/counter;
		if(avg == null){
			avg =0.0;
		}

		 var contentString = '<div id = "content">'+
			'<div id = placeName>'+
			'<h1 id = firstHeading">'+ place.name +'</h1>'+
			'</div>'+
			'<p> RestRooms Available: </p>'+
			'<form action ="">'+
			'<input type="checkbox" name="restroom" '+ mensE+' value="male" disabled>&nbsp;Mens&nbsp&nbsp&nbsp&nbsp&nbsp;'+
			'<input type="checkbox"  name="restroom" '+ womensE+' value="womens" disabled> &nbsp;Womens&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;'+
			'<input type="checkbox"  name="restroom" '+ gNE+'" value="genderneutral" disabled> &nbsp;GenderNeutral&nbsp&nbsp&nbsp&nbsp&nbsp;'+
			'<br></br>'+
			'<input type="checkbox" name="restroom" '+ mensH+' value="male" disabled>&nbsp;Handicap&nbsp;'+
			'<input type="checkbox"  name="restroom" '+ womensH+' value="womens" disabled> &nbsp;Handicap&nbsp;'+
			'<input type="checkbox"  name="restroom" '+ gNH+'" value="genderneutral" disabled> &nbsp;Handicap&nbsp;'+
			'</form>'+
			'<p></p>'+
			'<br></br>'+
			'<p>Average Rating: '+ avg.toFixed(1) +'</p>'+
			'<br></br>'+
			'<span style="font-size:12px;color:blue;cursor:pointer" onclick=openNav2("' + place.name.replace(/ /g, "9") +'","'+ place.id+'")>More Info</span>'+
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
			'<p> There Are No Reviews For This Location</p>'+
			'<span style="font-size:12px;color:blue;cursor:pointer" onclick=openNav("' + place.name.replace(/ /g, "9") +'","'+ place.id+'")>Add Review</span>'+
			'</div>';
		
         infoWindow.setContent(contentString);
          infoWindow.open(map, this);
        });
		}
	}
  };
  xhttp.open("GET", "https://powerful-falls-22457.herokuapp.com/api/bathroom-details/findByPlaceId/ChIJN1t_tDeuEmsRUsoyG83frY4", true);
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
	var mensC,womensC,gnC;
	if(arguments[4] == ""){
		mensC="";
	}
	else{
		mensC = '{'+
						'"number": "'+arguments[4]+'",'+
						'"votes": 0,'+
						'"date": null'+
						'}';
	}
	if(arguments[8] == ""){
		womensC="";
	}
	else{
		womensC = '{'+
						'"number": "'+arguments[8]+'",'+
						'"votes": 0,'+
						'"date": null'+
						'}';
	}
	if(arguments[12] == ""){
		gnC="";
	}
	else{
		gnC = '{'+
						'"number": "'+arguments[12]+'",'+
						'"votes": 0,'+
						'"date": null'+
						'}';
	}
	

	var body = '{'+
			'"placeId": "ChIJN1t_tDeuEmsRUsoyG83frY4",'+
			'"mensRoom": {'+
				'"exists": ' + arguments[1] +','+
				'"handicap": '+ arguments[2]+','+
				'"ratings": ['+
					arguments[3] + 
				'],'+
				'"codes": ['+
					mensC+
				']'+
			'},'+
			'"womensRoom": {'+
				'"exists":'+ arguments[5]+','+
				'"handicap": '+ arguments[6]+','+
				'"ratings": ['+
					arguments[7]+
				'],'+
				'"codes": ['+
					womensC+
				']'+
			'},'+
			'"genderNeutral": {'+
				'"exists": ' + arguments[9] + ','+
				'"handicap": '+ arguments[10]+','+
				'"ratings": ['+
					arguments[11]+
				'],'+
				'"codes": ['+
					gnC+
				']'+
			'}'+
		'}';
		xhttp.onreadystatechange=function() {
		if (this.readyState == 4 && this.status == 200) {


				$("#MensRoomExist").prop("checked",false);
				document.getElementById("mensbathroomRating").value="";
				document.getElementById("mensbathroomCode").value="";
				$(".WomensRoomExist").prop("checked",false);
				document.getElementById("womensbathroomRating").value="";
				document.getElementById("womensbathroomCode").value="";
				$(".GNRoomExist").prop("checked",false);
				document.getElementById("gnbathroomRating").value="";
				document.getElementById("gnbathroomCode").value="";
		}
		};
		xhttp.open("PUT", "https://powerful-falls-22457.herokuapp.com/api/bathroom-details/add-bathroom-details", true);
		xhttp.setRequestHeader('Content-type', 'application/json');
						console.log(body);
		xhttp.send(body);
}

//put http request
function sendVote(){
	if(arguments[4] =="mens"){
		var mensCode =  '{'+
                '"number":"'+arguments[2]+'",'+
                '"votes":'+arguments[3]+','+
                '"date": null'+
            '}';
	}
	else{
		var mensCode =  "";
	}
	if(arguments[4] == "womens"){
		var womensCode =  '{'+
                '"number":"'+arguments[2]+'",'+
                '"votes":'+arguments[3]+','+
                '"date": null'+
            '}';
	}
	else{
		var womensCode =  "";
	}
	if(arguments[4] == "genderNeutral"){
		var gnCode =  '{'+
                '"number":"'+arguments[2]+'",'+
                '"votes":'+arguments[3]+','+
                '"date": null'+
            '}';
	}
	else{
		var gnCode =  "";
	}
	var xhttp = new XMLHttpRequest();
	var body = '{'+
			'"placeId": "'+ arguments[0] + '",'+
			'"mensRoom": {'+
				'"exists": false,'+
				'"handicap": false,'+
				'"ratings": ['+
				'],'+
				'"codes": ['+
					mensCode+
				']'+
			'},'+
			'"womensRoom": {'+
				'"exists": false,'+
				'"handicap": false,'+
				'"ratings": ['+
				'],'+
				'"codes": ['+
					womensCode+
				']'+
			'},'+
			'"genderNeutral": {'+
				'"exists": false,'+
				'"handicap": false,'+
				'"ratings": ['+
				'],'+
				'"codes": ['+
					gnCode+
				']'+
			'}'+
		'}';
		xhttp.onreadystatechange=function() {
		if (this.readyState == 4 && this.status == 200) {
		}
		};
		xhttp.open("PUT", "https://powerful-falls-22457.herokuapp.com/api/bathroom-details/vote/"+arguments[1], true);
		xhttp.setRequestHeader('Content-type', 'application/json');
		xhttp.send(body);
}
