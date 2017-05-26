<?php 
	


	require_once("../private/functions.php");
	require_once("../private/db_connection.php");
	require_once("../private/user.php");
	require_once("../private/kari.php");
	session_start();

	$category=isset($_GET['category'])?$_GET['category']:NULL;
	$username=isset($_GET['uname'])?$_GET['uname']:NULL;
	$number=isset($_GET['number'])?$_GET['number']:NULL;

	//some securit checks
	if(!(isset($category)) || !(isset($username)) || !(isset($number)) ){
		echo "Error, Not set Username/category .";
		die();
		exit();
	}
	if($_SESSION['uname']!==$username){
		echo "Error UserName Error sorry";
		die();
		exit();	
	}
	
	
	$userinfo=$user->getUserByUname($username);
	if(count($userinfo)<2){
		echo "Error";
		$_SESSION['uname']=null;
		unset($_SESSION['uname']);

	};


	//Full request control


	if($number!=9 && $number>=0 && $number<9){
		if($number==0){
			$karioke->makeUnDiscoverable($username);
			$karioke->makeDiscoverable($username,$category);
		}
			$status=$karioke->search($category,$username);
			echo $status;
		
	}else if ($number==9) {
	 	$karioke->makeUnDiscoverable($username);
		echo "2";
	}else{
		echo "ERROR in REQUEST".$number;
	
	}




	
		
	

 ?>
