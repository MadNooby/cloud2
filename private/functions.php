<?php 
	require_once("includes/config/config.php");
	
	function secure($data){
		return sha1(crypt($data,SALT));
	}

	function cleanOrNot($data){

		$illegalchrs="/[`~!@#$\/\\%^&*|()_{}\[\]:\";'<>?,.]/";
		foreach ( $data as $v) {
			if(preg_match("{$illegalchrs}",$v))return false;
		}
		return true;
		}

	function redirectTo($data){
		if(isset($data) && !empty($data)){
			header("Location: ".$data);
			exit();
			die();
		}

	}


 ?>