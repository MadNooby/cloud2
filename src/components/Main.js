import React from "react";

import Header from "./header/Header";
import Voices from "./voices/Voices";

export default class Main extends React.Component{



	render(){
		return(
			<div className="main">
				<Header/>
					{this.props.children}
				<Voices />
			</div>

			);
	}


}