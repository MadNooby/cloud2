<?php 
	
	session_start();
	$username=isset($_SESSION['uname'])?$_SESSION['uname']:null;

	if(isset($username) && !empty($username) ){
		$_SESSION['uname']=null;
		unset($_SESSION);

	}


 ?>