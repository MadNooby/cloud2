<?php 
	require_once('includes/config/config.php');
	require_once('functions.php');
	
	class MYSQLDataBase{
		//variables
		private $connection;

		//functions

		// open and close connection
		private function open_connection(){
			$this->connection=mysqli_connect(DBADDRESS,DBUSER,DBPASS,DBNAME);
			if(!$this->connection || mysqli_connect_errno()){echo "Sorry Site is under Maintainance(1).";die();exit();}
			}
		public function close_connection(){
			if(isset($this->connection)){
				mysqli_close($this->connection);
				unset($this->connection);
			}
			}

		//perform query and return result set
		public function query($sql){
			$result=mysqli_query($this->connection,$sql);
			if(!$result){return null;}
			else return $result;

			}

		//fetch result
		public function fetchSingle($res){
			if($res){return mysqli_fetch_assoc($res);}
			else{return false;}
		}
		//  get last inserted id
		public function lastId(){
			return mysqli_insert_id($this->connection);
			}
		//get escaped string 
		public function escape($r){
			return mysqli_real_escape_string($this->connection,$r);
			}
	
		public function getRows($r){
			if($r){return mysqli_num_rows($r);}
			// constructor
		}

		function __construct(){
			$this->open_connection();
		}



	}
	$db=new MYSQLDataBase();

 ?>