import React from "react";

export default class LoginFront extends React.Component{

	render(){
		let headStyle = {
			   textAlign: 'left',
			   margin:'0'
			  };

		return(
			<div className="w3-row" style={{width:"70vw"}}>

				<div className="w3-half w3-card-2">
					<h3 style={headStyle} className="w3-blue">Login</h3>
					<div className="w3-container" style={{marginBottom: "10px"}}>
						<form action="" method="post" acceptCharset="utf-8" className="w3-container ">
							<label for="usr-input">User Name</label>
							<input type="text" name='username' className="w3-input" id="usr-input" /><br />
							<label for="usr-passwd">Password</label>
							<input type="password" name="" className="w3-input" id="usr-passwd" />
							<input type="submit" name="submitLgn" value="LOGIN" className="w3-button" onClick={this.props.processRequestLogin.bind(this)} style={{width:"100%",marginTop:"10px"}} />
						</form>
					</div>
				</div>
			
				<div className="w3-half w3-card-2">
					<h3 style={headStyle} className="w3-blue">Sign-Up</h3>
					<div className="w3-container" style={{marginBottom: "10px"}}>
						<form action="" method="post" acceptCharset="utf-8">
							<label for="">First Name</label>
							<input type="text" className="w3-input" name="fname" id="fname" />
							<label for="">Last Name</label>
							<input type="text" className="w3-input" name="lname" id="lname" />	
							<label for="">UserName</label>
							<input type="text" className="w3-input" name="uname" id="uname" />	
							<label for="">Mobile Number</label>
							<input type="number" className="w3-input" name="numbr" id="numbr" />	
							<label for="">Password</label>
							<input type="password" className="w3-input" name="ppass" id="ppass"/>
							<label for="">Re-Type Password </label>
							<input type="password" className="w3-input" name="rpass" id="rpass" />
							<input type="submit" name="submitsgn" value="SIGN UP" className="w3-button" onClick={this.props.processRequest.bind(this)} style={{width:"100%",marginTop:"10px"}}  />
						</form>
					</div>
				</div>
				
			</div>


			);
	}

}