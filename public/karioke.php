<?php 
    session_start();
    if(isset($_SESSION['uname'])){
        $username=$_SESSION['uname'];
    }else{
        header("Location: index.php");
        exit();
        die();
    }

?>
<!DOCTYPE html>
<html class="no-js" lang="en">
<head>
	<meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

	<title>VoiceBook</title>
    <link rel="stylesheet" type="text/css" href="css/normalize.css">
    <link rel="stylesheet" type="text/css" href="css/w3.css">
    <link rel="stylesheet" type="text/css" href="css/main1.css">
    <script src="js/logger.js" type="text/javascript" charset="utf-8" async defer></script>
    <script src="js/Recorder.js" type="text/javascript" charset="utf-8" async defer></script>
    <script>
        function dropEnd(e){
            e.preventDefault();
            console.log(e.dataTransfer.files[0]);
            e.target.innerHTML="UPLOADING(Functionality comming soon)";
        }
        function startanim(){
                    lower_place=document.getElementById('btn-sing');
                    top_place=document.getElementById('play');
                    lower_place.className+=" circle-up-anim";
                    top_place.className+=" circular-anim";
                   
                }
        function retanim(){
            top_place=document.getElementById('btn-sing');
            if(top_place.className.includes('circle-up-anim')){
                top_place.className=top_place.className.replace('circle-up-anim','');
            }
            lower_place=document.getElementById('play');
            if(lower_place.className.includes('circular-anim')){
                lower_place.className=lower_place.className.replace('circular-anim','');
            }

        }

        function subDate(d1,d2){
            try{
                date1=d1.split(":");
                date2=d2.split(":");
                x=Math.abs(parseInt(date1[0])-parseInt(date2[0]));
                y=Math.abs(parseInt(date1[1])-parseInt(date2[1]));
                z=Math.abs(parseInt(date1[2])-parseInt(date2[2]));
                return([x,y,z]);
            }catch(e){

            }
        }

    </script>
	
	<script src="js/vendor/modernizr-2.8.3.min.js"></script>
</head>
<body>
	<!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <div id="main" class=" w3-center">
            
            <!-- User Navigation  -->
            <div class=" w3-container" id="usr-nav">
                <div class="w3-row">
                    
                    <div class="w3-col l4 m6 s3 w3-third w3-large w3-container">
                        <div id="logo">
                            <a href="/"><h2 style="text-align: left">VoiceBook</h2></a>
                        </div>
                    </div>

                    <div class="w3-col l8 m6 s9" style="text-align: right;padding-right:20%;">
                        <div class="w3-container">
                            <h2 style="margin:0"><?php echo $username ?></h2>    
                        </div>
                    </div>
                    
                </div>
                
            </div>
                
            <!-- LOG the Output of async request  -->
            <div id="show"></div>
            <!-- static page functionality -->
            
            <div>
                
                <button class="w3-button w3-orange w3-circle btn-circle" id="play">Play</button>
                <input type="hidden" id="uname" value="<?php echo $username;?>">
                <input type="hidden" id="me" value="pageK">
                
                <div class="w3-container " id="category-div" >
                    <h2 style="display:inline">Category : </h2>
                     <select class="w3-black" id="category">
                        <option value="rock">Rock</option>
                        <option value="sad">Sad</option>
                        <option value="hard">Hard Style</option>
                    </select>
                </div>
               
                
            </div><!-- Singing Button  -->
            
            
            <div>
                <button class="w3-button w3-indigo w3-circle btn-circle" disabled id="btn-sing">CLICK AND SING</button>
            </div><!-- REcording -->
            
            
            <div class="w3-row w3-container w3-light-grey hidden" id="after-rcd" style="width:90vw;margin:0 auto;margin-top:50px" >

                <div class="w3-half" >
                    <div class="upload-area w3-container w3-center" ondragover="return false" ondrop="dropEnd(event)" style="padding-top: 24px"><strong>Upload Your Audio By draggin Here</strong></div>
                </div>
                
                 <div class="w3-half" style="margin-top: 24px;">
                    <ul id="after-record"></ul>
                </div>
                
            </div>

            
            <div class="w3-card-4" id="error_log" style="width:60vw;margin:0 auto;">
                <div class="w3-red w3-container" id="error" >Error :</div>
            </div><!-- Basic error Logger -->
            
           
            
        </div><!-- ENd of main -->
            
        <script src="js/script.min.js" type="text/javascript" charset="utf-8" async defer></script>


        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='https://www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X','auto');ga('send','pageview');
        </script>
</body>
</html>