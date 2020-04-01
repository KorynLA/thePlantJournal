import React from 'react';
import PlantAPI from "./plantapi";
import SearchAPI from "./search";
import GetData from "./getPlantInfo";

class SearchRoot extends React.Component {
	constructor() {
		super();
		this.state = {
			searching: "",
			id: ""
		};
	}
	onChangeSearch(newName){
		this.setState({
			searching: newName
		});
	}
	onChangeID(newID){
		this.setState({
			id: newID
		});
	}
	render() {
		return (
			<div>
				<div>
					< SearchAPI changeForm={this.onChangeSearch.bind(this)}/>
					< PlantAPI 
						toSearch={this.state.searching}
						changeID={this.onChangeID.bind(this)}/>
					< GetData plantid={this.state.id}/>
				</div>
			</div>
		);
	}
}

export default SearchRoot; 