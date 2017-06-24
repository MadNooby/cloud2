(function(){
	var checkpage=document.getElementById('me');

	if(checkpage){
		if(checkpage.value==="pageK"){
			var Peer=require("simple-peer");

			document.getElementById('play').addEventListener('click',function(){
				var vendorUrl	=		window.URL || window.webkitURL || window.msURL || navigator.mozGetUserMedia;
				let cat 		= 		document.getElementById('category');
				let category 	=	 	encodeURIComponent(cat.options[cat.selectedIndex].value);
				let uname		=		encodeURIComponent(document.getElementById('uname').value);
				let data		=		"category="+category+"&uname="+uname;
				let xhr 		=		new XMLHttpRequest();
				let xhr1 		=		new XMLHttpRequest();
				let error_here	=		document.getElementById('error');
				let normal_log	=		document.getElementById('show');
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
				var lateSinger 	=		false;
				var firstSinger;
				var inter2 		=		null;
				var done 		= 		false;
				var done1 		= 		true;
				var xxx 		= 		false;
				var xhr2 		=  		null;
				var reqs		=  		0;
				var song		= 		null;
				var I2 			= 		null;
				var timetosing 	=		90*1000;
				var audio_context= 		null;
				var input 		=		null;
				var recorder;
				let xhrr 		=		new XMLHttpRequest();
				var working 	=		true;
				var singerReady	= 		false;
				var singClick	=		false;
				try{
					navigator.getMedia =	navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia || navigator.msGetUserMedia;
					AudioContext = window.AudioContext || window.webkitAudioContext;
					audio_context = new AudioContext;
				}catch(e){
					working=false;
					error_logger(error_here,"Unable to get Media Content");
				}
				
				// variables end 

				error_here.style.display="none";
				error_here.innerHTML="Error :<br>";
				document.getElementById('play').disabled=true;

				//  user request unwind
				
				xhrr.open("GET","unloadremove.php",true);
				window.onbeforeunload = function (event) {xhrr.send(null);return message;};
				
				
					//navigator 
				navigator.getMedia({audio:true,video:false},function(stream){
					
					// getting stream to audioContext
					try{
						input = audio_context.createMediaStreamSource(stream);
						recorder = new Recorder(input);
					}catch(e){
						error_logger(error_here,"AUDIO Context Un available, use new browser");
						working=false;
					}
					

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
			            	 if((d==3 || d==4) && working){
			             		__log(normal_log,"CONNECTING");
			        			makeNewRequest();
			        		}else{
			        			error_logger(error_here,"There was error in Request");
			        		}
			        	}
			    	}
			    	if(x>requests){
			    		 x=0;
			            clearInterval(sender);
			    	}
			        },requests*100);

				xhr.onreadystatechange=function(){
					if(xhr.readyState==4){
						if(xhr.status==200){
							rtnRequest=xhr.responseText;
							try{
								d=((rtnRequest).split(",")[0]);	
							}catch(e){
								working=false;
								error_logger(error_here,"There was error in Request");
							}
			             	


			             	if(x==1){
			             		song=document.createElement('audio');
			             		let to_get=parseInt(rtnRequest.split(',').pop());
			             		let fileToPlay=Math.floor((Math.random() * to_get + 1).toString());
			             		song.src="sounds/rock/"+fileToPlay+".mp4";

			             	}

			             	if(d==1){
			             		__log(normal_log,"TRYING");
			             		
			             	}
			             	else if(d==2){
			             		error_logger(error_here,"Unable to Find any Partner ");
			             		__log(normal_log,"Try Again");
			             		xhrr.open("GET","unloadremove.php",true);
			             		xhrr.send(null);
			             	}
			             	else if(rtnRequest.toLowerCase().includes('error')){
			             		error_logger(error_here,rtnRequest);
			             		x=requests;
			             		xhrr.send();
			             		working=false;
			             	}
			             	else{
			             		x=requests;
			             		try{
			             			otheruser=encodeURIComponent((rtnRequest).split(",")[1]);	
			             		}catch(e){
			             			error_logger(error_here,"There was error in Request");
			             			working=false;
			             		}
			             		
			             		__log(normal_log,"FOUND");

			             	}
						}
					}
				};

				function makeNewRequest(){

					if(d==3 && working){ //rank 1
						//will make a new peer with initiator true and xxx for rank1
						xxx=true;
						try{
							peer=new Peer({initiator:true,trickle:false,stream:stream});
							done1=false;
						}catch(e){
							working=false;
							error_logger(error_here,"Uable to set Peer ");
						}
						
						
					}
					else if(d==4 && working){  //rank 2
						//just make request telling wht to get peerid of other
						try{
							peer=new Peer({initiator:false,trickle:false,stream:stream});
							done=true;
						}catch(e){
							working=false;
							error_logger(error_here,"Uable to set Peer ");
						}
						

						inter2=setInterval(function(){
							xhr1.open("GET","playkari.php?&other="+encodeURIComponent(otheruser)+"&me="+encodeURIComponent(uname)+"&stats="+encodeURIComponent(d.toString())+"&number="+num++,true);
							xhr1.send(null);
						}.bind(this),1000);
						
					}
					else{
						error_logger(error_here,"Uable to set Peer ");
						working=false;
					}

					peer.on('signal',function(ids){
							//request to set mypeer id
							xhr1.open("GET","playkari.php?mypeer="+encodeURIComponent(JSON.stringify(ids))+"&other="+encodeURIComponent(otheruser)+"&me="+encodeURIComponent(uname)+"&stats="+encodeURIComponent(d.toString()),true);
							xhr1.send(null);
							
					});


					peer.on('data',function(dis){
						// now i am here, make a button-> undisable it ->on click start voice move over

						let afterData=dis.toString();
						if(afterData.split(",")[0]==otheruser && !singClick){
							lateSinger=true;
							firstSinger=afterData.split(",")[1];
							
						}
						// aab idhar code krna hai ki other user has started you should too and sync bhi idhr sei hai
						// dis.split(',')[1] is time 
					});
					peer.on('stream',function(dis){
						// now i am here, make a button-> undisable it ->on click start voice move over
						document.getElementById('btn-sing').addEventListener('click',function(){
							if(!singClick){
								var aud=document.createElement('audio');
								if(lateSinger){
									song.play();
									let durationLate=subDate(new Date().toTimeString().split(" ")[0],firstSinger);
									if(durationLate[0]==0 && (durationLate[1]>=0 && durationLate[1]<=2 ) ){
										let lateInTimeSec=durationLate[2];
										let lateInTimeMin=durationLate[1];
										let totalLate=lateInTimeMin*60+lateInTimeSec;
										song.currentTime=totalLate;
									}

								}else{
									song.play();	
								}
								
								try{
									peer.send(uname+","+new Date().toTimeString().split(" ")[0]);
								}catch(e){
									console.log(e);
									working=false;
								}
								document.body.appendChild(aud);
								if(singerReady && working){
									singClick=true;
									aud.src=vendorUrl.createObjectURL(dis);
									aud.play();
									recorder && recorder.record();	
								}
							}
							
							
						});
						
						
						
					});


					peer.on('close',function(){
						// ab sara code yha aaega
						document.getElementById('btn-sing').disabled=true;
						if(working){
							working=false;
							song=null;
							recorder && recorder.stop();
							singerReady=false;
							if(singClick){ createDownloadLink();}
							singClick=false;
							retanim();
						}
    					recorder.clear();
						rtnRequest="",otheruser="",connectionStatus=0;
						xhrr.send();

					});

					xhr1.onreadystatechange=function(){
						if(xhr1.readyState==4){
							if(xhr1.status==200){
								connectionStatus=xhr1.responseText;
								if(num==10){
									error_logger(error_here,"OTHER PEER LEFT TRY AGAIN");
									document.getElementById('play').disabled=false;
									num=0;
									xhrr.send(null);
									clearInterval(inter2);
								}

								if(connectionStatus.toLowerCase().includes('error')){
									error_logger(error_here,connectionStatus);

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
											working=false;
											error_logger(error_here,"error in request");
										}

									}
								}
							}
						}


						

					}.bind(this);



				}

				function createDownloadLink() {
    				recorder && recorder.exportWAV(function(blob) {
    					try{
    					  var url = URL.createObjectURL(blob);
					      var li = document.createElement('li');
					      var au = document.createElement('audio');
					      var hf = document.createElement('a');
					      au.setAttribute('class','w3-button');

					      au.controls = true;
					      au.draggable=true;
					      au.src = url;
					      hf.href = url;
					      hf.download =  'Download_audio.wav';
					      hf.innerHTML = hf.download;
					      li.appendChild(au);
					      li.appendChild(hf);
					      document.getElementById("after-record").appendChild(li);
					      document.getElementById("after-rcd").style.display="block";

    					}catch(e){
    						working=false;
    						error_logger(error_here,"Unable to Produce song");
    					}
				     
				    });
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
											error_logger(error_here,"Other User Left");

										}
										
										if(nd==1 && working){
											reqs=0;
											clearInterval(I2);
											document.getElementById('play').disabled=false;
											__log(normal_log,"CONNECTED");
											singerReady=true;
											setTimeout(function(){
												try{
													peer.destroy();	
												}catch(e){
													working=false;
													console.log("Stopped");
												}
												
											},timetosing);
											// idhar aagye mtlb convo start
											try{
												document.getElementById('btn-sing').disabled=false;
												startanim();
											}catch(e){
												working=false;
												__log(normal_log,"Try Again");
												error_logger(error_here,"Data communication error.(Try with new version of Google Chrome)");

											}
												


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

				

					},function(err){
						error_logger(error_here,"Unable to get the Stream");
					});


				});


		}
	}
	

	
})();