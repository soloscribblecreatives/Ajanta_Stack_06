//Code by android developers start here
var startLoc = null;
//var contentName = '152';
//step 1:
var contentName = parseInt(localStorage.getItem("currentbrand"));
var currentContentId  = parseInt(localStorage.getItem('currentcontent'));
//ends
var currentContentNSlide ='';

//custom slides changes begins here....

//alert("++++++++++++"+custcomslideflag1+"+++++++custcomslideid+++++++"+custcomslideid1);
if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' &&  localStorage.getItem("currentcustomslideflag") =='true'){
	var custcomslideid1=parseInt(localStorage.getItem("currentcontentcustomslideId"));
		//step 2:

		currentContentNSlide = currentContentId+"_"+contentName+"_"+custcomslideid1;
		//step 2 ends here
		localStorage.setItem("current",currentContentNSlide);
		localStorage.setItem("currentslide",custcomslideid1);
	}
	else{
		//step 3 :
		currentContentNSlide = currentContentId+"_"+contentName+"_"+'1';
		//step 3 ends here
		localStorage.setItem("current",currentContentNSlide);
		localStorage.setItem("currentslide",'1');
	}
	
//custom slides changes ends here....

//currentContentNSlide = contentName+"_"+'1';
//localStorage.setItem("current",currentContentNSlide);
//localStorage.setItem("currentslide",'1');

checkClickThrough();

document.getElementById("main_content").addEventListener("touchmove", touchHandler, false);
document.getElementById("main_content").addEventListener("touchstart", touchHandler, false);
function touchHandler(e) {

	if (e.type == "touchstart") {
		if( e.touches.length == 1 ) { // one finger touch
			var touch = e.touches[ 0 ];
			startLoc = { x : touch.pageX, y : touch.pageY };
		}
	}

	else if (e.type == "touchmove") {
		if( startLoc ) {
			var touch = e.touches[ 0 ];
			if( Math.abs( startLoc.x - touch.pageX ) > Math.abs( startLoc.y - touch.pageY ) )
			{
				e.preventDefault();
			}
			startLoc = null;
		}
	}
}

//Code by android developers ends here

$(document).ready(function(){
	var ua = navigator.userAgent;
	//var event = "touchstart";
	var event = (ua.match(/Ipad/i)) ? "touchstart" : "click";

	$(".left_arrow").click(function(event) {
		go_nav('b');
	});

	$(".right_arrow").click(function(event) {
		go_nav('f');
	});

	$(".slides").click(function(){
		var slideNum =	$(this).index()+1;
		console.log(slideNum);
		open_page("",slideNum);

	});

	$(".reference").removeClass("active");

	$('.reference').on('swipeleft swiperight', function(event) {
		event.stopPropagation();
	});

	$(".box_btn").bind("click",function(){
		$(".reference").toggleClass("active");
	});

	currentSlide();

	$("#main_content").swipe({
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
		//step 4:-
		console.log("swipeleft"+localStorage.getItem("currentslide"));
		localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
		//step 4 ends here
		//alert("swipeleft");
		//myconsole("swipeleft");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var last_page_id = $(".slides").length;
		var slide_jumper_open = $(".reference").hasClass("active");
		if(page_id == last_page_id+1)	{
			return
		} else{
			go_nav('f');
		}
	},

	swipeRight:function(event, direction, distance, duration, fingerCount) {
		//step 5:-
		console.log("swiperight"+localStorage.getItem("currentslide"));
		localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
		//step 5 ends here 
			//alert("swiperight");
		//myconsole("swiperight");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var slide_jumper_open = $(".reference").hasClass("active");

		if(page_id == 0){
			//console.log("First Slide");
			//myconsole("First Slide");
			return
		} else {
			go_nav('b');
		}

	},

        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:0
    });
});

//step 6:-
function toCaptureTime(page_id){	
	var currentSlideNo = page_id;
	var startTime = Date.now();
	var temp = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
	
	if(temp == null){		
		if (currentSlideNo!=0){
			localStorage.setItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo ,startTime);
			//to capture start time of slide in db format
			var startTimeInDBFormat = currentTimeInDatabaseFormat();
			//alert(startTimeInDBFormat);
			localStorage.setItem(currentContentId+"_"+contentName+"_StartTime_"+currentSlideNo ,startTimeInDBFormat);
		}
	}
	else
	{
		var existingTime = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
		var newTime = Date.now();
		var newSlideTime = (newTime - existingTime);
		// alert(currentSlideNo + " slide time : " + (newSlideTime/1000) );
		// time taken to view that particular slide
		//to capture end time of slide in db format
		var endTimeInDBFormat = currentTimeInDatabaseFormat();
		//alert(endTimeInDBFormat);
		//alert('do calculations and update time====else==_EndTime_======');

		var EndTimeNext = localStorage.getItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo);
		console.log("++++++++EndTimeNext++++++++"+EndTimeNext+"++++++currentContentId+++"+currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo);
		if(EndTimeNext == null){
		//this time for which the slide was viewed
		localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+currentSlideNo ,(newSlideTime/1000) );
		localStorage.setItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo ,endTimeInDBFormat);
	}

	if (typeof(localStorage.getItem('currentslide'))!='undefined' && localStorage.getItem('currentslide')!='' && localStorage.getItem('currentslide')>= currentSlideNo){
		var nextSlideNo = currentSlideNo;

	}
	else
	{
		var nextSlideNo = currentSlideNo + 1 ;	
	} 

	if(nextSlideNo <= 12){ //Total slides present
	// alert(nextSlideNo);
	var tempNext = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+nextSlideNo);

	if(tempNext == null){

		if (nextSlideNo!=0)	{
			var nextSlideStartTime =  Date.now();
			localStorage.setItem(currentContentId+"_"+contentName+"_slideNo_"+nextSlideNo ,nextSlideStartTime);
			localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+nextSlideNo ,0);



				//to capture start time of next slide in db format
				var startTimeNextInDBFormat = currentTimeInDatabaseFormat();
				//alert(startTimeNextInDBFormat);
				/* 
				alert("+++else++_StartTime_++++currentSlideNo++++"+nextSlideNo); */
				localStorage.setItem(currentContentId+"_"+contentName+"_StartTime_"+nextSlideNo ,startTimeNextInDBFormat);
			}
		}
	}
}

}
//step ends..

function go_nav(direction) {
	//alert("+++++++++go_nav++++++++++"+direction);
	//alert("+++++++++go_nav++++contentName++++++"+contentName);
	//go_nav('b');right
	//go_nav('f');left
	
//custom slide changes continues here....

if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' &&   localStorage.getItem("currentcustomslideflag") =='true') {		
	var custcomslideid=parseInt(localStorage.getItem("currentcontentcustomslideId"));
	var page_id =  custcomslideid;
}	
else
{			
	var page_id =  parseInt($("#wrapper").attr("rel"));
}	

	//custom slide changes ends here....

	//step 7:-
	//toCaptureTime(page_id);
	console.log("swipeleft"+localStorage.getItem("currentslide"));
	localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
	//step 7 ends here
	//localStorage.setItem(contentName+"_slideNo_"+currentSlideNo ,n);
	var flag=0;
	if(direction == 'b') {

	//custom slide changes continues here....

	//alert("+++++bhitor reee +++++++"+custcomslideflag+"+++++++custcomslideid+++++++"+custcomslideid);
	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' &&    localStorage.getItem("currentcustomslideflag") =='true'){
		flag==0
		localStorage.setItem("gotoNextPrevBrand" ,2);//if one than next if 2 than prev
		window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));


	}
	
	//custom slide changes ends here....

	else{
		if(page_id >= 0){
			page_id = page_id - 1;
		//alert(page_id);
		//console.log(page_id);
		if(page_id == 0){
			flag=2;
		}
	}
	if(flag == 2){
        localStorage.setItem("gotoNextPrevBrand" ,2);//if one than next if 2 than prev
        //flag == 0;
        window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }
    else{
    	localStorage.setItem("gotoNextPrevBrand" ,0);
    }
}
}

else {
	
	//custom slide changes continues here....

	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' && localStorage.getItem("currentcustomslideflag") =='true'){
		flag==0
		localStorage.setItem("gotoNextPrevBrand" ,1);//if one than next if 2 than prev

		window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
	}
	
	//custom slide changes ends here....

	else {
		if(page_id <= 12){
			page_id = page_id + 1;
		//alert(page_id);
		if(page_id == 13){
			flag=1;
		}
	}
	if(flag == 1){
        localStorage.setItem("gotoNextPrevBrand" ,1);//if one than next if 2 than prev
        flag == 0;
        window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }
    else{
    	localStorage.setItem("gotoNextPrevBrand" ,0);
    }
}
}

//step 8:
currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
//step 8 ends here
localStorage.setItem("current",currentContentNSlide);
localStorage.setItem("currentslide",page_id);

$("#wrapper").attr("rel",page_id);

var content="";
if(flag==0){
	var pg_content = set_pg_content(page_id);

	$("#main_content").html(pg_content);
}
	//console.log("pg : "+page_id);
	if(page_id==4){
		$(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
			open_page("",7)
		});
		$(".box5").click(function(event) {
			open_page("",8)
		});
		$(".box6").click(function(event) {
			open_page("",9)
		});
		$(".box7").click(function(event) {
			open_page("",10)
		});
		$(".box8").click(function(event) {
			open_page("",11)
		});
		
	}
	checkClickThrough();
}

function set_pg_content(pg_id){
	//step 6:-	//console.log("++++++++pg_id++++"+pg_id+"+++++++currentslide++++++"+localStorage.getItem("currentslide")+"++++++previousslide++++++"+localStorage.getItem("previousslide"));
		 //check previous slide id end time capture...@bramha..
		 //check previous slide id end time capture...@bramha..
	//step 9:
	if (typeof(localStorage.getItem("previousslide"))!='undefined'){
		//to checked previous slide has god end time...
		var previousslideid=localStorage.getItem("previousslide");
		toCaptureTime(previousslideid);
		
	}
	
	toCaptureTime(pg_id);

	//step 9 ends here..
	//alert("++++++++++set_pg_content++++++++++"+pg_id);
	$(".reference").removeClass("active");
	currentSlide();
	var selectedContentPath='';
	
	switch(pg_id){
		case 1:
		content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="s1_1"><img src="slide1/s1_1.png" width="1366" height="1024" alt=""/></div><div class="s1_2"><img src="slide1/s1_2.png"/></div><div class="s1_3"><img src="slide1/s1_3.png"/></div><div class="s1_4"><img id="s1_4" src="slide1/s1_4.png"/></div><script>var $target = $("#s1_4");function explode() {$target.explodeRestore();setTimeout(function () {$target.explode({maxWidth: 40, minWidth: 5, radius: 500, release: false, recycle: false, explodeTime: 200, canvas: true, round: false, maxAngle: 360, gravity: 5, groundDistance: 270,});}, 4000)}explode();</script>';
		break;
		case 2:
		content='<link rel="stylesheet" type="text/css" href="slide2/slide2.css" media="screen"/><div class="s2_1"><img src="slide2/s2_1.png" width="1366" height="1024" alt=""/></div><div class="s2_2"><img src="slide2/s2_2.png"/></div><div class="s2_3"><img src="slide2/s2_3.png"/></div><div class="s2_4"><img src="slide2/s2_4.png"/></div><div class="s2_5"><img src="slide2/s2_5.png"/></div>';
		break;
		case 3:
		content='<link rel="stylesheet" type="text/css" href="slide3/slide3.css" media="screen"/><div class="s3_1"><img src="slide3/s3_1.png" width="1366" height="1024" alt=""/></div><div class="s3_2"><img src="slide3/s3_2.png"/></div><div class="s3_3"><img src="slide3/s3_3.png"/></div><div class="s3_4"><img src="slide3/s3_4.png"/></div><div class="s3_5"><img src="slide3/s3_5.png"/></div><div class="s3_6"><img src="slide3/s3_6.png"/></div><div class="s3_7"><img src="slide3/s3_7.png"/></div><div class="s3_8"><img src="slide3/s3_8.png"/></div>';
		break;
		case 4:
		content='<link rel="stylesheet" type="text/css" href="slide4/slide4.css" media="screen"/><div class="s4_1"><img src="slide4/s4_1.png" width="1366" height="1024" alt=""/></div><div class="s4_2"><img src="slide4/s4_2.png"/></div><div class="s4_3"><img src="slide4/s4_3.png"/></div><div class="s4_4"><img src="slide4/s4_4.png"/></div><div class="s4_5"><img src="slide4/s4_5.gif"/></div><div class="s4_6"><img src="slide4/s4_6.png"/></div>';
		break;
		case 5:
		content='<link rel="stylesheet" type="text/css" href="slide5/slide5.css" media="screen"/><div class="s5_1"><img src="slide5/s5_1.png" width="1366" height="1024" alt=""/></div><div class="s5_2"><img src="slide5/s5_2.png"/></div><div class="s5_3"><img src="slide5/s5_3.png"/></div><div class="s5_4"><img src="slide5/s5_4.png"/></div><div class="s5_5"><img src="slide5/s5_5.png"/></div><div class="s5_6"><img src="slide5/s5_6.png"/></div><div class="s5_7"><img src="slide5/s5_7.png"/></div><div class="s5_8"><img src="slide5/s5_8.png"/></div>';
		break;
		case 6:
		content='<link rel="stylesheet" type="text/css" href="slide6/slide6.css" media="screen"/><div class="s6_1"><img src="slide6/s6_1.png" width="1366" height="1024" alt=""/></div><div class="s6_2"><img src="slide6/s6_2.png"/></div><div class="s6_3"><img src="slide6/s6_3.png"/></div><div class="s6_4"><img src="slide6/s6_4.png"/></div><div class="s6_5"><img src="slide6/s6_5.png"/></div><div class="s6_6"><img src="slide6/s6_6.png"/></div><div class="s6_7"><img src="slide6/s6_7.png"/></div><div class="s6_8"><img src="slide6/s6_8.gif"/></div>';
		break;	
		case 7:
		content='<link rel="stylesheet" type="text/css" href="slide7/slide7.css" media="screen"/><div class="s7_1"><img src="slide7/s7_1.png" width="1366" height="1024" alt=""/></div><div class="s7_2"><img src="slide7/s7_2.png"/></div><div class="s7_3"><img src="slide7/s7_3.png"/></div><div class="s7_4"><img src="slide7/s7_4.png"/></div><div class="s7_5"><img src="slide7/s7_5.gif"/></div><div class="s7_6"><img src="slide7/s7_6.png"/></div>';
		break;
		case 8:
		content='<link rel="stylesheet" type="text/css" href="slide8/slide8.css" media="screen"/><div class="s8_1"><img src="slide8/s8_1.png" width="1366" height="1024" alt=""/></div><div class="s8_2"><img src="slide8/s8_2.png"/></div><div class="s8_3"><img src="slide8/s8_3.png"/></div><div class="s8_4"><img src="slide8/s8_4.png"/></div><div class="s8_5"><img src="slide8/s8_5.png"/></div><div class="s8_6"><img src="slide8/s8_6.png"/></div>';
		break;
		case 9:
		content='<link rel="stylesheet" type="text/css" href="slide9/slide9.css" media="screen"/><div class="s9_1"><img src="slide9/s9_1.png" width="1366" height="1024" alt=""/></div><div class="s9_2"><img src="slide9/s9_2.png"/></div><div class="s9_3"><img src="slide9/s9_3.png"/></div><div class="s9_4"><img src="slide9/s9_4.png"/></div><div class="s9_5"><img src="slide9/s9_5.gif"/></div><div class="s9_6"><img src="slide9/s9_6.png"/></div>';
		break;
		case 10:
		content='<link rel="stylesheet" type="text/css" href="slide10/slide10.css" media="screen"/><div class="s10_1"><img src="slide10/s10_1.png" width="1366" height="1024" alt=""/></div><div class="s10_2"><img src="slide10/s10_2.png"/></div><div class="s10_3"><img src="slide10/s10_3.png"/></div><div class="s10_4"><img src="slide10/s10_4.png"/></div><div class="s10_5"><img src="slide10/s10_5.gif"/></div><div class="s10_6"><img src="slide10/s10_6.gif"/></div>';
		break;
		case 11:
		content='<link rel="stylesheet" type="text/css" href="slide11/slide11.css" media="screen"/><div class="s11_1"><img src="slide11/s11_1.png" width="1366" height="1024" alt=""/></div><div class="s11_2"><img src="slide11/s11_2.png"/></div><div class="s11_3"><img src="slide11/s11_3.png"/></div><div class="s11_4"><img src="slide11/s11_4.png"/></div><div class="s11_5"><img src="slide11/s11_5.png"/></div><div class="s11_6"><img src="slide11/s11_6.png"/></div><div class="s11_7"><img src="slide11/s11_7.png"/></div><div class="s11_8"><img src="slide11/s11_8.png"/></div><div class="s11_9"><img src="slide11/s11_9.png"/></div>';
		break;
		case 12:
		content='<link rel="stylesheet" type="text/css" href="slide12/slide12.css" media="screen"/><div class="s12_1"><img src="slide12/s12_1.png" width="1366" height="1024" alt=""/></div><div class="s12_2"><img src="slide12/s12_2.png"/></div><div class="s12_3"><img src="slide12/s12_3.png"/></div><div class="s12_4"><img src="slide12/s12_4.png"/></div><div class="s12_5"><img src="slide12/s12_5.png"/></div><div class="s12_6"><img src="slide12/s12_6.png"/></div><div class="s12_7"><img src="slide12/s12_7.png"/></div><div class="s12_8"><img src="slide12/s12_8.png"/></div><div class="s12_9"><img src="slide12/s12_9.png"/></div>';
		break;
	}

	return content;

}

function showDiv() {
	document.getElementById('welcomeDiv').style.display = "block";
}
function showDiv2() {
	document.getElementById('welcomeDiv2').style.display = "block";
}

function open_page(url,page_id){
	// alert(page_id);
	//step 10:
	if (typeof(localStorage.getItem("currentslide"))!='undefined'){
		//to checked previous slide has god end time...
		var slideid=localStorage.getItem("currentslide");
		toCaptureTime(slideid);	
	}
	
	// toCaptureTime(page_id);
	localStorage.setItem("currentslide",page_id);
	currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
	localStorage.setItem("current",currentContentNSlide);
	//step 10 ends here

	$("#wrapper").attr("rel",page_id);
	var content="";
	var pg_content = set_pg_content(page_id);

	$("#main_content").html(pg_content);

	if(page_id==4){
		$(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
			open_page("",7)
		});
		$(".box5").click(function(event) {
			open_page("",8)
		});
		$(".box6").click(function(event) {
			open_page("",9)
		});
		$(".box7").click(function(event) {
			open_page("",10)
		});
		$(".box8").click(function(event) {
			open_page("",11)
		});
	}
	checkClickThrough();
}

function checkClickThrough(){
	var currentslide=localStorage.getItem("currentslide");
	//alert(currentslide);
	document.getElementById("click_through").innerHTML='';

	if(currentslide == 1){
		document.getElementById("click_through").innerHTML='';
	}
	if(currentslide == 2){
		document.getElementById("click_through").innerHTML='<div id="buttons"><button name="button" style="opacity: 0.0;position:absolute; left:53px; top:270px; z-index:105; width:310px; height:360px;" value="OK" onclick="checkBtns(1)"></button><div id="buttons"><button name="button" style="opacity: 0.0;position:absolute; left:373px; top:270px; z-index:105; width:310px; height:360px;" value="OK" onclick="checkBtns(2)"></button><button name="button" style="opacity: 0.0;position:absolute; left:693px; top:270px; z-index:105; width:310px; height:360px;" value="OK" onclick="checkBtns(3)"></button><button name="button" style="opacity: 0.0;position:absolute; left:1013px; top:270px; z-index:105; width:310px; height:360px;" value="OK" onclick="checkBtns(4)"></button>';
	}
	if(currentslide == 3){
		document.getElementById("click_through").innerHTML='<div id="buttons"><button name="button" style="opacity: 0.0;position:absolute; right:0px; bottom:0px; z-index:105; width:150px; height:150px;" value="OK" onclick="checkBtns(5)"></button>';
	}
	if(currentslide == 4){
		document.getElementById("click_through").innerHTML='<div id="buttons"><button name="button" style="opacity: 0.0;position:absolute; right:0px; bottom:0px; z-index:105; width:150px; height:150px;" value="OK" onclick="checkBtns(6)"></button>';
	}
	if(currentslide == 5){
		document.getElementById("click_through").innerHTML='<div id="buttons"><button name="button" style="opacity: 0.0;position:absolute; right:0px; bottom:0px; z-index:105; width:150px; height:150px;" value="OK" onclick="checkBtns(7)"></button>';
	}
	if(currentslide == 6){
		document.getElementById("click_through").innerHTML='<div id="buttons"><button name="button" style="opacity: 0.0;position:absolute; right:0px; bottom:0px; z-index:105; width:150px; height:150px;" value="OK" onclick="checkBtns(8)"></button>';
	}
	if(currentslide == 7){
		document.getElementById("click_through").innerHTML='<div id="buttons"><button name="button" style="opacity: 0.0;position:absolute; right:0px; bottom:0px; z-index:105; width:150px; height:150px;" value="OK" onclick="checkBtns(9)"></button>';
	}
	if(currentslide == 8){
		document.getElementById("click_through").innerHTML='<div id="buttons"><button name="button" style="opacity: 0.0;position:absolute; right:0px; bottom:0px; z-index:105; width:150px; height:150px;" value="OK" onclick="checkBtns(10)"></button>';
	}
	if(currentslide == 9){
		document.getElementById("click_through").innerHTML='<div id="buttons"><button name="button" style="opacity: 0.0;position:absolute; right:0px; bottom:0px; z-index:105; width:150px; height:150px;" value="OK" onclick="checkBtns(11)"></button>';
	}
}

function checkBtns(refNum){
	switch(refNum){
		case 1:
		open_page('',3);
		break;
		case 2:
		open_page('',5);
		break;
		case 3:
		open_page('',6);
		break;
		case 4:
		open_page('',8);
		break;
		case 5:
		open_page('',2);
		break;
		case 6:
		open_page('',2);
		break;
		case 7:
		open_page('',2);
		break;
		case 8:
		open_page('',2);
		break;
		case 9:
		open_page('',2);
		break;
		case 10:
		open_page('',2);
		break;
		case 11:
		open_page('',2);
		break;
	}
}

function currentSlide(){
	var curr_id =  parseInt($("#wrapper").attr("rel"));
	$(".slides").removeClass("active");
	$(".slides:nth-child("+curr_id+")").addClass("active");
}

var ln = 0;
function myconsole(msg){

	var oldMsg = "</br>"+ln+". "+$("#myconsole").html();
	ln++
	$("#myconsole").html(msg+oldMsg);
}

function currentTimeInDatabaseFormat(){//to get current time in dd-mm-yyyy hh:mm:ss
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
	month = parseInt(month)+1;
	if(month.toString().length==1){
		month="0"+month;
	}

	var date = new Date().getDate();
	if(date.toString().length==1){
		date="0"+date;
	}

	var hour = new Date().getHours();
	if(hour.toString().length==1){
		hour="0"+hour;
	}

	var minutes = new Date().getMinutes();
	if(minutes.toString().length==1){
		minutes="0"+minutes;
	}

	var seconds = new Date().getSeconds();
	if(seconds.toString().length==1){
		seconds="0"+seconds;
	}

	var duration= year+"-"+month+"-"+date+"-"+hour + ":" + minutes + ":" + seconds;
	return duration;
}

// new js

$(document).ready(function(){
	$('body').on('click','.touchbtn',function(){
		$('.right_arrow').trigger( "click");
	})

	$(document).on('click','.btnshow',function(){
//alert('hi')
$('.touchbtn').css("display","block");
})
})


/*--------------------- animation javascript -----------------------*/

function s4_pop1() {
	$('.s4_5').css("display","block");
	$('.s4_c1ose1').css("display","block");
	$('.s4_pop1').css("display","none");
}

function s4_close1() {
	$('.s4_5').css("display","none");
	$('.s4_c1ose1').css("display","none");
	$('.s4_pop1').css("display","block");
}

/*---------------------Particlize-----------------------*/

"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){var a="explode-wrapper";return t?(t.fn.explodeRestore=function(){this.each(function(){var e=t(this),o=e.prop(a);o&&(o.replaceWith(e),e.prop(a,null))})},void(t.fn.explode=function(e){function o(t,a){console.warn("Unsupported "+t+" style:"+a[t])}function i(t){function a(){var i=Date.now(),n=i-e;ct.clearRect(0,0,at,et),rt.forEach(function(t){ct.save();var a=t.width,e=t.height;ct.translate(t.biasx,t.biasy),ct.rotate(t.lastAngle||t.finalAngleRad),j&&(ct.beginPath(),ct.arc(0,0,a/2,0,2*Math.PI,!1),ct.closePath(),ct.clip());var i=void 0;i=n<t.time1?1:n>t.time2?0:1-(n-t.time1)/I,0!==i||t.released||(t.released=!0,o--),ct.globalAlpha=i,ct.drawImage(dt[0],t.left,t.top,t.width,t.height,-a/2,-e/2,a,e),ct.restore()}),o?window.requestAnimationFrame(a):t&&t()}var e=Date.now(),o=rt.length;rt.forEach(function(t){t.time1=1e3/(t.ratio*(_+1-t.width)/_+.1),t.time2=t.time1+I}),a()}function n(){setTimeout(function(){r(function(){B.explodeRestore()},!0)},Y)}function r(t,a){function e(){var r=Date.now(),s=void 0,d=void 0;if(s=(r-i)/1e3,d=(r-o)/C,a&&(d=1-d),W)At+=W*s*300;else{if(d>1||d<0)return void(t&&t());s*=Math.cos(d*Math.PI/2)*Math.PI/2}a&&(s=-s),i=r,ct.clearRect(0,0,at,et),rt.forEach(function(t){ct.save();var a=t.width,e=t.height;t.land||(t.biasx+=t.vx*s,t.biasy+=(t.vy+At)*s,W&&(Q&&Q(t)||t.biasy>t.transYMax||t.biasy<t.height/2)&&(n--,t.land=!0,t.lastAngle=t.finalAngleRad*d,N?t.biasy=W>0?t.transYMax:t.height/2:t.biasy=2*t.transYMax)),ct.translate(t.biasx,t.biasy),t.lastAngle?ct.rotate(t.lastAngle):ct.rotate(t.finalAngleRad*d),j&&(ct.beginPath(),ct.arc(0,0,a/2,0,2*Math.PI,!1),ct.closePath(),ct.clip()),ct.drawImage(dt[0],t.left,t.top,t.width,t.height,-a/2,-e/2,a,e),ct.restore()}),W&&!n?t():window.requestAnimationFrame(e)}var o=Date.now(),i=o,n=rt.length;a||rt.forEach(function(t){t.vx=t.translateX/C*1e3,t.vy=t.translateY/C*1e3,t.biasx=t.translateX0,t.biasy=t.translateY0,W&&(t.transYMax=et/2+G-t.height/2)}),e()}function s(t,a){return parseInt(Math.random()*(a+1-t),10)+t}function d(t){for(var a=t.length,e=void 0,o=void 0;a;)o=Math.floor(Math.random()*a),a-=1,e=t[a],t[a]=t[o],t[o]=e;return t}function c(){rt.forEach(function(t,a){var e=(Math.random()*z*2-z)/((Math.random()+2)*t.width)*10,o=t.left+t.width/2-J/2,i=t.top+t.width/2-K/2;0===o&&(o=a%2?-1:1),0===i&&(i=a%4<2?-1:1);var n=Math.sqrt(o*o+i*i),r=((1-nt)*(1-(t.width-p)/(_-p))+nt)*Math.random();r=1-(1-r)*(1-y/b);var s=(b-n)*r+n,d=n*n,c={finalDistance:s,ratio:r,x:o,y:i,distance:n,translateX:(s-n)*Math.sqrt((d-i*i)/d)*(o>0?1:-1),translateY:(s-n)*Math.sqrt((d-o*o)/d)*(i>0?1:-1),translateX0:(at-J)/2+t.left+t.width/2,translateY0:(et-K)/2+t.top+t.height/2,finalAngle:e,finalAngleRad:e*(Math.PI/180)};for(var h in c)t[h]=c[h]})}function h(){function t(t,a){return!(t<tt[0]&&a>K-tt[0]||t>J-tt[1]&&a>K-tt[1]||t>J-tt[2]&&a<tt[2]||t<tt[3]&&a<tt[3])}function a(t,a,e,o,i){return(t-e)*(t-e)+(a-o)*(a-o)<i*i}function e(e){var o=e.left,i=e.top,s=e.width,d=e.height,h=o+s/2,l=K-i-d/2;(c||t(h,l)||tt.some(function(t,e){return a(h,l,n[e][0]*J+2*(.5-n[e][0])*t,n[e][1]*K+2*(.5-n[e][1])*t,t)}))&&r.push({left:o,top:i,width:s,height:d})}function o(t){function a(t){var a=o;if(o+=t,e({left:a,top:i,width:t,height:t}),E)for(var n=1;n<parseInt(_/t);n++)e({left:a,top:i+n*t,width:t,height:t})}var o=0,i=t*_,n=void 0;do n&&a(n),n=s(p,_);while(J>o+n);J-o>=p&&a(J-o)}var i=void 0,n=[[0,1],[1,1],[1,0],[0,0]];i=v?Math.floor(K/_):Math.ceil(K/_);for(var r=[],c=tt.every(function(t){return 0===t}),h=0;h<i;h++)o(h);return d(r),r}function l(){var t=["border-top-left-radius","border-top-right-radius","border-bottom-right-radius","border-bottom-left-radius"],a=B.width();return t=t.map(function(t){var e=B.css(t);return e.match(/px$/)?1*e.match(/^\d+/)[0]:e.match(/%$/)?e.match(/^\d+/)[0]/100*a:e}),t=t.map(function(t){return t>a/2&&(t=a/2),t})}e&&"object"===("undefined"==typeof e?"undefined":_typeof(e))||(e={});var f=e,u=f.minWidth,p=void 0===u?3:u,g=f.omitLastLine,v=void 0!==g&&g,m=f.radius,b=void 0===m?80:m,w=f.minRadius,y=void 0===w?0:w,M=f.release,x=void 0===M||M,k=f.fadeTime,I=void 0===k?300:k,A=f.recycle,P=void 0===A||A,R=f.recycleDelay,Y=void 0===R?500:R,D=f.fill,E=void 0===D||D,S=f.explodeTime,C=void 0===S?300:S,q=f.maxAngle,z=void 0===q?360:q,T=f.gravity,W=void 0===T?0:T,X=f.round,j=void 0!==X&&X,F=f.groundDistance,G=void 0===F?400:F,L=f.land,N=void 0===L||L,Q=f.checkOutBound,Z=f.finish,$=e,_=$.maxWidth,B=this,H=void 0,O=arguments;if(B.length>1)return void B.each(function(){var a=t(this);a.explode.apply(a,O)});if(B.length&&t.contains(document,B[0])){if("IMG"===B.prop("tagName")){if(!B.prop("complete"))return void B.on("load",function(){B.explode.apply(B,O)});H=B}else if("none"!==B.css("backgroundImage")){var U=B.css("backgroundImage").match(/url\(\"([\S\s]*)\"\)/)[1];if(H=t("<img/>",{src:U}),!e.ignoreCompelete)return void H.on("load",function(){e.ignoreCompelete=!0,B.explode.apply(B,[e])})}var J=B.width(),K=B.height(),V=Math.min(J,K),tt=l(),at=Math.max(J,2*b),et=Math.max(K,2*b,2*G);_||(_=V/4);var ot=t("<div></div>",{class:a}),it=["width","height","margin-top","margin-right","margin-bottom","margin-left","position","top","right","bottom","left","float","display"];it.forEach(function(t){ot.css(t,B.css(t))}),"static"===ot.css("position")&&ot.css("position","relative");var nt=.3,rt=h();c();var st=t("<canvas></canvas>"),dt=t("<canvas></canvas>");dt.css({width:J,height:K}),dt.attr({width:J,height:K}),st.css({position:"absolute",left:(J-at)/2,right:(J-at)/2,top:(K-et)/2,bottom:(K-et)/2,margin:"auto",width:at+43,height:et}),st.attr({width:at,height:et}),ot.append(st);var ct=st[0].getContext("2d"),ht=dt[0].getContext("2d"),lt=H?H[0]:{},ft=lt.naturalWidth,ut=lt.naturalHeight;if("IMG"===B.prop("tagName"))ht.drawImage(H[0],0,0,ft,ut,0,0,J,K);else if("none"!==B.css("backgroundImage")){var pt=0,gt=0,vt=ft,mt=ut,bt={"background-repeat":B.css("background-repeat"),"background-size":B.css("background-size"),"background-position-x":B.css("background-position-x"),"background-position-y":B.css("background-position-y")},wt=J/ft,yt=K/ut;if("cover"===bt["background-size"]){var Mt=Math.max(wt,yt);vt=ft*Mt,mt=ut*Mt}else if("contain"===bt["background-size"]){var xt=Math.min(wt,yt);vt=ft*xt,mt=ut*xt}else o("background-size",bt);if(pt=parseInt(bt["background-position-x"])/100*(J-vt),gt=parseInt(bt["background-position-y"])/100*(K-mt),"repeat"===bt["background-repeat"])for(var kt=0-Math.ceil(pt/vt);kt<J/vt+Math.ceil(-pt/vt);kt++)for(var It=0-Math.ceil(gt/mt);It<K/mt+Math.ceil(-gt/mt);It++)ht.drawImage(H[0],0,0,ft,ut,pt+kt*vt,gt+It*mt,vt,mt);else"no-repeat"===bt["background-repeat"]?ht.drawImage(H[0],0,0,ft,ut,pt,gt,vt,mt):o("background-repeat",bt)}else"rgba(0, 0, 0, 0)"!==B.css("backgroundColor")?(ht.fillStyle=B.css("backgroundColor"),ht.fillRect(0,0,J,K)):console.warn("There's nothing to explode.");rt.forEach(function(t){var a=t.left,e=t.top,o=t.width,i=t.height;t.naturalParams=[a,e,o,i]}),B.after(ot),B.prop(a,ot),B.detach();var At=0;r(function(){x?i():P?n():Z&&Z()})}})):void console.error("jQuery or Zepto is needed.")}(window.jQuery||window.Zepto);