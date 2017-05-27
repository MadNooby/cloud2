<?php 
	
	require_once("../private/functions.php");
	require_once("../private/db_connection.php");
	require_once("../private/user.php");
	require_once("../private/kari.php");
	session_start();

	$stats=isset($_GET['stats'])?$_GET['stats']:NULL;
	if( !isset($stats) || empty($stats) ){
		echo "Unexpected Error";
		redirectTo("karioke.php");
	}
	if($stats=='3' || $stats=='4'){
		$peer=isset($_GET['mypeer'])?$_GET['mypeer']:NULL;
		$othersname=isset($_GET['other'])?$_GET['other']:NULL;
		$username=isset($_GET['me'])?$_GET['me']:NULL;	
		if( !isset($othersname) ||  !(isset($username)) ){
			echo "Error, Not peer id/uname .";
			die();
			exit();
		}
		if($_SESSION['uname']!==$username){
			echo "Error in UserName  sorry";
			die();
			exit();	
		}
		
		$userinfo=$user->getUserByUname($username);
		if(count($userinfo)<2){
			echo "Error";
			unset($_SESSION['uname']);

		};

		$realstats=($karioke->getUserInfo($username));
		$realstats=$realstats['status'];
		if($realstats!=$stats){
			echo $realstats." ".$stats;
			echo "Error in sent status";
			exit();
			die();
		}

		//Full request control
		if(!isset($peer) && $stats==4){
			// see if othername peerid is set and if set return tht
			$ddr=$karioke->getIfOtherPeerIdSet($othersname);
			if($ddr){
				$karioke->setStats($username,3);
				echo ($ddr); // ye echoed will give signal to get new 
			}else{
				echo "9"; //9 means keeo looking
			}
			// make signal and get the peerid and set it in myid


		}else if(isset($peer) && $stats==3) {
			// set username peerid and return getotherid
			if($karioke->setId($peer,$username)){
				$karioke->setStats($username,4);
				echo "11"; // 11 means done seting id
			}
		}else{
			echo "ERROR ! Un PROCESSABLE REQUEST";
		}



	}
	else if ($stats=='11' || $stats=='9'){
		echo "Error ! Your are here now, wrong page";
	}
	
	
	
	

	





	?>