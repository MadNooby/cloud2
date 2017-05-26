import React from "react";


export default class Home extends React.Component{




	notready(e){
		e.preventDefault();
	}

	render(){
		return(
			<div>
				<div className="w3-center w3-container">
					<a href="karioke.php" className="w3-button w3-blue" >KARIOKE APP</a>
					<a href="" onClick={this.notready.bind(this)}>Voice GAME[NOT READY]</a>
				</div>
			</div>

			);
	}


}