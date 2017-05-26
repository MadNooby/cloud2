import React from "react";


import LoginFront from "./LoginFront";

export default class LoginDisp extends React.Component{


	constructor(){
		super();
		this.patt = new RegExp("[</>~`\\!@#$%|}{^&*()-=+'\"?]");
		this.patt1 = new RegExp("[1-9]");
		this.error=[];

	}

	actualRequest(d,c){
		let xhr=new XMLHttpRequest();
		xhr.open("POST","processLogin.php",true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		console.log(d);
		xhr.send(d);


		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					if(xhr.responseText.includes("error")){this.error.push("Error! Invalid Credentials");this.displayError();}
					if(xhr.responseText.includes("reload")){location.reload();}
					if(c==0){document.getElementById('error-log').innerHTML=xhr.responseText;}
			}	}
		}.bind(this);
	}

	makeRequest(){
		if(this.error.length>0){
			this.displayError();
			return false;
		}else{
			return true;
		}
		}

	displayError(){
		this.error.map((v,i,a)=>{document.getElementById('error-log').innerHTML+="<li style='color:red'>"+v+"</li>";});
		}

	clean(){
			document.getElementById('error-log').innerHTML="";
			this.error=[];
		}



	//------------------------------ A new person 

	processRequest(e){
		e.preventDefault();
		this.clean();
		const fname=document.getElementById('fname').value;
		const lname=document.getElementById('lname').value;
		const uname=document.getElementById('uname').value;
		const numbr=document.getElementById('numbr').value.toString();
		const ppass=document.getElementById('ppass').value;
		const rpass=document.getElementById('rpass').value;
		
		if(this.patt.test(fname)){this.error.push("Error! Illegal character in First Name.");}
		if(this.patt.test(lname)){this.error.push("Error! Illegal character in Last Name.");}
		if(this.patt.test(uname)){this.error.push("Error! Illegal character in User Name.");}
		if(!this.patt1.test(numbr) || numbr.length<9 || numbr.length>13){this.error.push("Error! Illegal Mobile Number.");}

		if(fname.length<3 || lname.length<3 || uname.length<3){this.error.push("Error! Names lenght must be greater than 3");}
		if(ppass.length<5 || rpass.length<5){this.error.push("Error! Password length must be greater then 5 .");
		if(ppass!==rpass){this.error.push("Error! Password dont match");}}
		if(this.makeRequest()){
			let data={fname,lname,uname,ppass,rpass,numbr,'type':0};
			this.actualRequest(JSON.stringify(data),0);
		}
	}



	//------------------------------ SIGN IN
	processRequestLogin(e){
		e.preventDefault();
		this.clean();
		const uname=document.getElementById('usr-input').value;
		const ppass=document.getElementById('usr-passwd').value;
		if(uname.length<3){this.error.push("Error! Very short username."); }
		if(ppass.length<6){this.error.push("Error! Very short passowrd."); }
		if(this.patt.test(uname)){this.error.push("Error! Illegal character found.");}

		if(this.makeRequest()){
			let data={uname,ppass,'type':1};
			this.actualRequest(JSON.stringify(data),1);
		}

	}

	render(){
		
		
		return(
			<div>
				<LoginFront processRequest={this.processRequest.bind(this)} processRequestLogin={this.processRequestLogin.bind(this)} makeRequest={this.makeRequest.bind(this)} />
				<div id="error-log"></div>
			</div>

			);
	}


}