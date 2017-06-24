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
	if(!checkDataExist($category) || !checkDataExist($username) || !isset($number)){
		echo "Error, Not set Username/category .";
		die();
		exit();
	}
	if($_SESSION['uname']!==$username){
		echo "Error In UserName ! sorry";
		die();
		exit();	
	}
	
	if(!cleanOrNot([$username,$category,$number]) || !(is_numeric($number))){
		echo "Error , Illegal character in Request";
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
			if($number==0){
				echo ",";
				$category=explode(" ",$category)[0];
				if(cleanOrNot([$category]) && ctype_alnum($category)){
					$total_in_category=(int)shell_exec("ls sounds/".$category." | wc -l");
					if(is_numeric($total_in_category) && $total_in_category!=0)echo $total_in_category;
					else echo 1; 
				}
			}
		
	}else if ($number==9) {
	 	$karioke->makeUnDiscoverable($username);
		echo "2";
	}else{
		echo "ERROR in REQUEST".$number;
	
	}




	
		
	

 ?>
