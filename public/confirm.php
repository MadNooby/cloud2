<?php 
	
	require_once("../private/functions.php");
	require_once("../private/db_connection.php");
	require_once("../private/user.php");
	require_once("../private/kari.php");
	session_start();

	$me=isset($_GET['me'])?$_GET['me']:NULL;
	$other=isset($_GET['other'])?$_GET['other']:NULL;
	$req=isset($_GET['req'])?$_GET['req']:NULL;

	if($req==10){
		echo "Other user returned. please try with other user";
		exit();
		die();
	}

	if( !(isset($me)) || !(isset($other)) || !(isset($req)) ){
		echo '0';
		exit();
		die();
	}

	if(checkDataExist($_SESSION['uname'])){
		if( $_SESSION['uname']!=$me){
			echo "Error in UserName  sorry";
			die();
			exit();	
		}
	}else{
		echo "Error in UserName  sorry";
			die();
			exit();	
	}
	$userinfo=$user->getUserByUname($me);
		if(count($userinfo)<2){
			echo "Error";
			unset($_SESSION['uname']);
			die();
			exit();

		};

	if($karioke->legitOpp($me,$other)){
		if($req==0){
			$karioke->setstatus($me);	
		}
		if($karioke->getStatus($other)){
			echo "1";
		}else{
			echo "0";
		}



		

	}else{
		echo "WRONG UserName/Opponent info";
		die();
		exit();	
	}