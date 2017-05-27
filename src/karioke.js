(function(){
	var checkpage=document.getElementById('me');
	if(checkpage){
		if(checkpage.value==="pageK"){

			var Peer=require("simple-peer");

			document.getElementById('play').addEventListener('click',function(){
				var vendorUrl	=		window.URL || window.webkitURL || window.msURL;
				let cat 		= 		document.getElementById('category');
				let category 	=	 	encodeURIComponent(cat.options[cat.selectedIndex].value);
				let uname		=		encodeURIComponent(document.getElementById('uname').value);
				let data		=		"category="+category+"&uname="+uname;
				let xhr 		=		new XMLHttpRequest();
				let xhr1 		=		new XMLHttpRequest();
				let disable		=		false;
				let peer 		=		null;
				var x 			=		0;
				var id 			=		0;
				var req 		= 		1;
				const requests 	=		10; // number of request to make
				var d 			=		0;	// status of request(1,2,3 or 4)
				var rtnRequest  =		""; //return Requestof xhr
				var otheruser	=		"";
				var num 		=		0;
				var connectionStatus=   0;
				var inter2 		=		null;
				var done 		= 		false;
				var done1 		= 		true;
				var xxx 		= 		false;
				var xhr2 		=  		null;
				var reqs		=  		0;
				var I2 			= 		null;
				navigator.getMedia =	navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
				document.getElementById('play').disabled=true;

				let xhrr=new XMLHttpRequest();
				xhrr.open("GET","unloadremove.php",true);
				window.onbeforeunload = function (event) {
          			xhrr.send(null);
			    	return message;
				};
				

				
					//navigator 
				navigator.getMedia({audio:true,video:false},function(stream){
					// sender
				var sender=setInterval(function(){
					
					
					if(x<requests){
						xhr.open("GET","playkarioke.php?number="+ encodeURIComponent(x++)+"&"+data,true);
						xhr.send(null);
					}
			        if(x==requests){
			            x=0;
			            clearInterval(sender);
			           
			            if(otheruser==""){
			            	document.getElementById('play').disabled=false;
			            	xhrr.send(null);
			            }
			            else{
			            	 if(d==3 || d==4){
			        		document.getElementById('show').innerHTML="CONNECTING";
			        		makeNewRequest();

			        		}
			        	}
			    	}
			        },requests*100);

				xhr.onreadystatechange=function(){
					if(xhr.readyState==4){
						if(xhr.status==200){
							rtnRequest=xhr.responseText;
			             	d=((rtnRequest).split(",")[0]);

			             	if(d==1){
			             		document.getElementById('show').innerHTML="TRYING";
			             	}
			             	else if(d==2){
			             		document.getElementById('show').innerHTML="NOT FOUND";
			             		xhrr.open("GET","unloadremove.php",true);
			             		xhrr.send(null);
			             	}
			             	else{
			             		x=requests;
			             		otheruser=encodeURIComponent((rtnRequest).split(",")[1]);
			             		document.getElementById('show').innerHTML="FOUND";

			             	}
						}
					}
				};

				function makeNewRequest(){

					if(d==3){ //rank 1
						//will make a new peer with initiator true
						xxx=true;
						peer=new Peer({initiator:true,trickle:false,stream:stream});
						done1=false;
					}
					else if(d==4){  //rank 2
						//just make request telling wht to get peerid of other
						peer=new Peer({initiator:false,trickle:false,stream:stream});
						done=true;

						inter2=setInterval(function(){
							xhr1.open("GET","playkari.php?&other="+encodeURIComponent(otheruser)+"&me="+encodeURIComponent(uname)+"&stats="+encodeURIComponent(d.toString())+"&number="+num++,true);
							xhr1.send(null);
						}.bind(this),1000);
						
					}


					peer.on('signal',function(ids){
							//request to set mypeer id
							xhr1.open("GET","playkari.php?mypeer="+encodeURIComponent(JSON.stringify(ids))+"&other="+encodeURIComponent(otheruser)+"&me="+encodeURIComponent(uname)+"&stats="+encodeURIComponent(d.toString()),true);
							xhr1.send(null);
							
					});


					peer.on('data',function(dis){
						// now i am here, make a button-> undisable it ->on click start voice move over
						// rank 2 ka data transfer wi avi baki hai
						console.log('data');
					});
					peer.on('stream',function(dis){
						// now i am here, make a button-> undisable it ->on click start voice move over
						// rank 2 ka data transfer wi avi baki hai
						document.getElementById('btn-sing').disabled=false;
						document.getElementById('btn-sing').addEventListener('click',function(){
							var aud=document.createElement('audio');
							document.body.appendChild(aud);
							aud.src=vendorUrl.createObjectURL(dis);
							aud.play();
						});
						
					});

					xhr1.onreadystatechange=function(){
						if(xhr1.readyState==4){
							if(xhr1.status==200){
								connectionStatus=xhr1.responseText;

								if(num==10){
									document.getElementById('show').innerHTML="OTHER PEER LEFT TRY AGAIN";
									document.getElementById('play').disabled=false;
									num=0;
									xhrr.send(null);

									clearInterval(inter2);

								}

								if(connectionStatus.toLowerCase().includes('error')){
									document.getElementById('show').innerHTML=connectionStatus;
									document.getElementById('play').disabled=false;
									num=0;
									xhrr.send(null);
									clearInterval(inter2);
								}else{

									// lets rock the status
									if(connectionStatus==9){
										// this 9 is a not found peer id
									}
									else if(connectionStatus==11){

										d=4;
										// this 11 is tht my peer id is set
										if(done){
											gimmeRes(uname,otheruser);
											clearInterval(inter2);
											//rank 2 ends here
											return;
										}
										inter2=setInterval(function(){
											xhr1.open("GET","playkari.php?&other="+encodeURIComponent(otheruser)+"&me="+encodeURIComponent(uname)+"&stats="+encodeURIComponent(d.toString())+"&number="+num++,true);
											xhr1.send(null);
										}.bind(this),1000);
									}
									else {
										// means i have recieved the other user peer id now
										num=0;
										clearInterval(inter2);
										//rank 1 ends here
										try{
											d=3; // beacause my turn next is to set my peer id
											done1=true;
											let ss="\r\n";
											let newStr = connectionStatus.split(ss).join(" ");
											peer.signal(newStr);
											if(xxx){
												gimmeRes(uname,otheruser);
											}
											
										}catch(e){
											document.getElementById('play').disabled=false;
											xhrr.send(null);
											document.getElementById('show').innerHTML="error in request";
											console.log(e);
										}

									}
								}
							}
						}


						

					}.bind(this);


					




				}

				function gimmeRes(me,other){
						// make my stats 1 and see if other is also 1 thn ready to rock.

						I2=setInterval(function(){
							xhr2=new XMLHttpRequest();
							xhr2.open("GET","confirm.php?me="+me+"&other="+other+"&req="+reqs++,true);
							xhr2.send();

							xhr2.onreadystatechange=function(){
								if(xhr2.readyState==4){
									if(xhr2.status==200){
										let nd=xhr2.responseText;

										if(reqs==requests){
											reqs=0;
											clearInterval(I2);
											document.getElementById('play').disabled=false;
											document.getElementById('show').innerHTML="Other User Left";
										}
										
										if(nd==1){
											reqs=0;
											clearInterval(I2);
											document.getElementById('play').disabled=false;
											document.getElementById('show').innerHTML="CONNECTED";
											// idhar aagye mtlb convo start
											peer.send(me);


										}
										else if(nd==0){document.getElementById('play').disabled=false;}
										else{	
												document.getElementById('play').disabled=false;
												document.getElementById('show').innerHTML=(nd);
										}
									}
								}
							};

						},1000);

						// peer.send("ambe");
						// peer.on('data',function(d){console.log(d)});
				}

				

					},function(err){});


				});


		}
	}
	

	
})();