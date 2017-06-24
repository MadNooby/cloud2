<?php 
	
	session_start();
	require_once('../private/functions.php');
	if(checkDataExist($_SESSION['uname'])){
		$_SESSION['uname']=null;
		unset($_SESSION);
	}


 ?>