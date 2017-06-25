<?php 
	require_once("../private/functions.php");
	require_once("../private/db_connection.php");
	require_once("../private/user.php");
	session_start();
	$data = file_get_contents('php://input');
	if(!isset($data)|| empty($data)){
		echo "INVALID REQUEST";
		redirectTo("index.php");
	}
	$data= json_decode($data);
	$username=isset($data->uname)?$data->uname:null;
	$type=isset($data->type)?$data->type:null;
	if($type==1){
		//login
		$pass=isset($data->ppass)?$data->ppass:null;
		if( isset($username) && isset($pass) && !empty($username) && !empty($pass) ){
			$userdata=$user->loginUser($username,$pass);
			if($userdata){$_SESSION['uname']=$userdata['username'];echo "reload";}	
			else{ echo "error";}
		}
		
		else{ echo "error";}

	}
	else{
		//signup
		// checking for data to be appropriate to be done
		$error=[];
		$pass=isset($data->ppass)?$data->ppass:null;
		$rpass=isset($data->rpass)?$data->rpass:null;
		$fname=isset($data->fname)?$data->fname:null;
		$lname=isset($data->lname)?$data->lname:null;
		$mobile=isset($data->numbr)?$data->numbr:null;
		if( isset($pass) && isset($rpass) && isset($fname) && isset($lname) && isset($mobile) && !empty($pass) && !empty($rpass) && !empty($fname) && !empty($lname) && !empty($mobile) ){
			if(cleanOrNot([$fname,$lname,$mobile])){
				if($fname===$lname){array_push($error,"Firname and last Name same");}
				if($rpass!==$pass){array_push($error,"Password dont match");}
				if(strlen($pass)<6 || strlen($fname)<3 || strlen($lname)<3||strlen($mobile)<9||strlen($mobile)>13){array_push($error,"names must be length greater than 3 and password must be greater than 5");}
				if(count($error)==0){
					$inserted=$user->insertUser($fname,$lname,secure($pass),$username,$mobile);
					if($inserted){$_SESSION['uname']=$user->username;echo "reload";}
					else {array_push($error,"UserName Already Exist");}
				}
			}else{
				array_push($error,"Illegal character found in Username/lastname");
			}
			
			foreach ($error as $value) {echo $value;}
		}else{
			echo "Values are incomplete";
		}		
	}

 ?>