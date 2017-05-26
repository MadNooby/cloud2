import React from "react";


export default class Header extends React.Component{





	logout(e){
		e.preventDefault();
		let xhr=new XMLHttpRequest();
		xhr.open("GET","logout.php",true);
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					location.reload();
				}
			}
		}
		xhr.send(null);
	}


	render(){
		return(
			<div className="w3-row w3-container" style={{height:"20vh"}}>
				<div className="w3-twothird">
						logo here
				</div>
				
				<div className="w3-third">
					<a href="#settings" className="w3-button w3-grey">Settings</a>
					<a href="#home" className="w3-button w3-grey">Home</a>
					<a className="w3-button w3-grey" onClick={this.logout.bind(this)}>LOG-OUT</a>

				</div>
			</div>
			);
	}


}