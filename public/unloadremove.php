<?php 
	
	require_once("../private/functions.php");
	require_once("../private/kari.php");
	session_start();


	$username=isset($_SESSION['uname'])?$_SESSION['uname']:null;
	$karioke->makeUnDiscoverable($username);

?>