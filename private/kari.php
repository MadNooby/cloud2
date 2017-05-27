<?php 
	
	//functions - search,makeUnDiscoverable,makeDiscoverable,getUserInfo

	require_once('includes/config/config.php');
	require_once('functions.php');
	require_once("db_connection.php");

	class Karioke{

		function search($c,$u){
			global $db;
			$c=$db->escape($c);
			$u=$db->escape($u);

			$checkQuery="SELECT other_uname from karioke where name='{$u}'";
			$checkData=$db->fetchSingle($db->query($checkQuery))['other_uname'];

			if($checkData!='n'){
				if( $u[0]<$checkData[0] ){
					$stats=4;	
				}else{
					$stats=3;
				}

				$query="UPDATE karioke SET status={$stats} , other_uname='{$checkData}' WHERE   name='{$u}'";
				$result1=$db->query($query);

				return $stats.",".$checkData;
			}

			$query="SELECT * from karioke where  name!='{$u}' and category='{$c}' and status=0 LIMIT 1";
			$result=$db->query($query);
			if(mysqli_num_rows($result)==0)return "1";
			else {
				$stats=0;
				$otheruserdata=$db->fetchSingle($result);
				$othername=$otheruserdata['name'];
				
				if( $u[0]<$othername[0] ){
					$stats=4;	
				}else{
					$stats=3;
				}

				$rr=$db->query("UPDATE karioke set other_uname='{$u}' where name='{$othername}'");

				$query="UPDATE karioke SET status={$stats} , other_uname='{$othername}' WHERE   name='{$u}'";
				$result1=$db->query($query);

				return $stats.",".$othername;
				

			}
		}


		// Make the Username u undiscoverable 

		function makeUnDiscoverable($u){
			global $db;
			$u=$db->escape($u);
			$query1="SELECT * FROM karioke where name='{$u}' LIMIT 1";
			if( $db->getRows($db->query($query1))!=0 ){
				$q="DELETE from karioke where name='{$u}'";
				$result=$db->query($q);
			}
		}


		// make a user u with category c discoverable

		function makeDiscoverable($u,$c){
			global $db;
			$u=$db->escape($u);
			$c=$db->escape($c);
			$query1="SELECT * FROM karioke where name='{$u}' LIMIT 1";
			if( $db->getRows($db->query($query1))==0 ){
				$query2="INSERT INTO karioke(name,category,status,my_peerid,other_uname) VALUES('{$u}','{$c}','0','0','n')";
				$db->query($query2);
			}	
		}


		//get all user u information 



		function setstatus($me){
			global $db;
			$me=$db->escape($me);
			$query="UPDATE karioke set done=1 where name='{$me}'";
			$r=$db->query($query);
			return ;
		}

		function getStatus($other){
			global $db;
			$other=$db->escape($other);
			$query="SELECT done from karioke  where name='{$other}'";
			$r=$db->query($query);
			if($r){
				$rr= ($db->fetchSingle($r));
				if($rr['done']==1){return true;}
				else return false;
				
			}
			else return "Database error";
		}


		function legitOpp($me,$other){
			global $db;
			$me=$db->escape($me);
			$other=$db->escape($other);
			$myself=$this->getUserInfo($me);
			if(!$myself){
				return false;
			}
			else if($myself['name']==$me && $myself['other_uname']==$other){
				return true;
			}
		}


		function setStats($u,$s){
			global $db;
			$u=$db->escape($u);
			$s=$db->escape($s);
			$query="UPDATE karioke set status='{$s}' where name='{$u}'";
			$r=$db->query($query);
			if($r){return true;}

		}

		function getUserInfo($u){
			global $db;
			$u=$db->escape($u);
			$query="SELECT * from karioke WHERE name='{$u}' LIMIT 1";
			$result=$db->query($query);
			if(mysqli_num_rows($result)==0) return false;
			else return $db->fetchSingle($result);
		}

		function setId($p,$u){
			global $db;
			$p=$db->escape($p);
			$u=$db->escape($u);
			$query="UPDATE karioke set my_peerid='{$p}' where name='{$u}'";
			$r=$db->query($query);
			if($r){return true;}
		}

		function getIfOtherPeerIdSet($u){
			global $db;
			$db->escape($u);
			$query="SELECT my_peerid from  karioke where name='{$u}'";
			$r=$db->query($query);
			if($r){return $db->fetchSingle($r)['my_peerid'];}
			else return false;
		}
	}

	$karioke=new Karioke();

// INSERT INTO karioke(name,myid,mystats,status) VLAUES({$u},123,0,0)


 ?>