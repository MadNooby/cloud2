<?php 
	require_once('includes/config/config.php');
	require_once('functions.php');
	require_once("db_connection.php");


	class User{

		public $username;

		// returns the info of logged in user
		function loginUser($username,$pass){
			global $db;
			$username=$db->escape($username);
			$pass=secure($db->escape($pass));
			$query="SELECT * FROM userinfo where username='{$username}' and password='{$pass}' LIMIT 1";
			$result=$db->query($query);
			$res=$db->fetchSingle($result);
			if(isset($res)){$this->username=$res['username'];}
			return $res;
		}

		function insertUser($fn,$ln,$p,$u,$num){
			global $db;
			$fn=$db->escape($fn);
			$ln=$db->escape($ln);
			$p=$db->escape($p);
			$u=$db->escape($u);
			$num=$db->escape($num);
			$query="INSERT  INTO userinfo(username,firstname,lastname,password,mobile) values('{$u}','{$fn}','{$ln}','{$p}','{$num}')";
			if($this->getUserByUname($u)){
				return false;
			}else{
				$r=$db->query($query);

				if($r) {$this->username=$u;return true;};
			}

		}

		function getUserByUname($uname){
			global $db;
			$db->escape($uname);
			$query="SELECT * from userinfo where username='{$uname}' LIMIT 1";
			return $db->fetchSingle($db->query($query));
		}
		function getUserById($id){
			global $db;
			$db->escape($id);
			$query="SELECT * from userinfo where sno={$id} LIMIT 1";
			return $db->fetchSingle($db->query($query));
		}

	}


	$user=new User()	
 ?>

