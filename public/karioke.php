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
    
	
	<script src="js/vendor/modernizr-2.8.3.min.js"></script>
</head>
<body>
	<!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

    <div id="main" class="w3-blue w3-center">
    <div class="w3-black"><h2 style="margin:0"><?php echo $username ?></h2></div>
        <div id="show">
            
        </div>
        <div>
            
            <button class="w3-button w3-orange" id="play">Play</button>
            <input type="hidden" id="uname" value="<?php echo $username;?>">
            <input type="hidden" id="me" value="pageK">
            <br>
            Category :
            <select class="w3-black" id="category">
                <option value="rock">Rock</option>
                <option value="sad">Sad</option>
                <option value="hard">Hard Style</option>
            </select>
            
        </div>
        <div>
            <button class="w3-button" disabled id="btn-sing">CLICK AND SING</button>
        </div>
    </div>

    














        <script src="js/script.min.js"></script>
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