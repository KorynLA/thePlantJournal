import React, { Component }  from "react";
import "./style/error.css";
class errorPage extends Component {
	render() {
		return (
    		<div className="error">
      			<h2>404 error</h2>
      			<h3>Page not found!</h3>
    		</div>
  		);
	}
}
export default errorPage;