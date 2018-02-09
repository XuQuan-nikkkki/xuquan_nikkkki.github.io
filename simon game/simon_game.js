var dashboard=$(".dashboard");
var aPlayDiv=$(".quarter");
var order = [];
var round = 0;


$("button").attr("disabled","disabled");
aPlayDiv.off("click");

$("#slider").on("click",function() {
	if(!dashboard.hasClass('on')) {
		dashboard.addClass('on');
		$("button").removeAttr('disabled');
		$("#square").css("left","20px");
		$("#countScreen").find("span").text("--");
	} else {
		dashboard.removeClass('on');
		$("button").attr('disabled',"disabled");
		$("#square").css("left",0);
	}
})

$("#start").on("click",function() {
	$("#countScreen").find("span").addClass("twinkling");
	setTimeout(function(){
		round = 1;
		startGame(round);
	},2000);
})

$("#strict").on("click",function(){
	if($("#strict_on").hasClass('on')) {
		$("#strict_on").removeClass('on');
	} else {
		$("#strict_on").addClass('on');
	}
	
})

function startGame(round) 
{
	var order = [];
	
	$("#countScreen").find("span").text(numToStr(round)).removeClass('twinkling');
	aPlayDiv.off("click");

	for(var i = 0; i < round; i ++) 
	{
		order[i]=Math.floor(Math.random()*round);
	}
	
	playSet(order);
	huPlay(order);

	if(!huPlay(order)) {
		playSet(order);
		huPlay(order);
	} else {
		round+=1;
		startGame(round);
	}
	
	/*if(!huPlay(order)) {
		aPlayDiv.off("click");
		playWrong(order);
	} else 
	{
		if(playOrder.length === order.length) 
		{
			round+=1;
			setTimeout(function()
			{
				startGame(round);
			},1500);
		}
	}*/
}



function playSet(order) 
{
	var timer = null;
	var num = 0;

	clearInterval(timer);
	timer = setInterval(function() 
	{
		play(order[num]);
		num ++;
		if(num == order.length) 
		{
			clearInterval(timer);
		}
	},1500);
}

function huPlay (order) {
	var playOrder = [];

	aPlayDiv.on("click");

	for(var i = 0; i < aPlayDiv.length; i ++) 
	{
		aPlayDiv.eq(i).on("click",function()
		{
			play(i);
			playOrder.push(i);
			console.log(playOrder);
			
		})
	}
	checkOrder(order,playOrder);

	/*$.each(aPlayDiv, function(index) 
	{
		$(this).on("click",function()
		{
			play(index);
			playOrder.push(index);
			console.log("playorder:"+playOrder);
			checkOrder(order,playOrder);
		})
	})
	console.log("order:"+order);*/
}
	
	

function play(index) 
{
	aPlayDiv.eq(index).addClass('clicked');
	setTimeout(function()
	{
		aPlayDiv.eq(index).removeClass('clicked');
	},1000)
}

function numToStr(num) 
{
	if(num < 10) 
	{
		 return "0" + num;
	} else {
		return num;
	}
}

function checkOrder(order1, order2) 
{
	for(var i = 0; i < order2.length; i ++) 
	{
		if(order2[i] === order1[i]) 
		{
			if(order1.length === order2.length) {
				round+=1;
				console.log("check:"+round);
				startGame(round);
			}
		} else 
		{
			aPlayDiv.off("click");
			playWrong(order1);
		}
	}
}

function playWrong(order) {
	if($("#strict_on").hasClass('on')){
		setTimeout(function(){

			round = 1;
			console.log("wrong:"+round);
			startGame(round);
		},1500);
	} else {
		setTimeout(function(){
			playSet(order);
			huPlay(order);
		},2000)
		
	}
}


