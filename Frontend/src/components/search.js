import React, { Component } from 'react';
import './style/search.css';
class SearchAPI extends Component {
    //state={}
    //To DO: Insert Links
    constructor(props) {
    	super();
		this.state={
			searching: props.searching
		};
    }
   	onHandleChangeForm(event) {
   		this.setState({
   			searching: event.target.value
   		});
        event.preventDefault();
   	}
    onChangeFormSearch(event) {
        event.preventDefault();
    	this.props.changeForm(this.state.searching);
    }
    render() {
    	var val=this.props.children;
        //const { name } = this.state;
        return (
            <div>
                <form>
                	<input value={this.props.initialSearch} onChange={(event)=>this.onHandleChangeForm(event)}/>
                	<button className="btn btn-light" onClick={this.onChangeFormSearch.bind(this)}>Search</button>
             </form>
            </div>
        )
    }
}
export default SearchAPI;