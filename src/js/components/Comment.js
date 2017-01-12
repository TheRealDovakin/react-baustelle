//js
import React from "react";
//own files
import DateUtils from '../utils/DateUtils';
/**
 * @author Kasper Nadrajkowski
 *
 */
export default class Comment extends React.Component{

	constructor(props){
		super();
	}

	/**
	 * opens a processView for a given id
	 * @param {string} id			process id
	 */

	render(){
    const { commentor, body, createdAt } = this.props;
    const date = new Date(createdAt);
    const readebleDate = DateUtils.getDateAndTimeAsString(date);
    const glyphStyle = { color: '#ffffff', };
    const spanStyle = { marginLeft: '10px', };

    // TODO: replace _ with space
    return(
      <li class="list-group-item">
        <h4>
          <span class="label label-default">
            <a><i style={glyphStyle} class="glyphicon glyphicon-user"></i></a>
            <span style={spanStyle}>{commentor}</span>
          </span>
          <span class="label label-primary">
            <a><i style={glyphStyle} class="glyphicon glyphicon-time"></i></a>
            <span style={spanStyle}>{readebleDate}</span>
          </span>
        </h4>
        <p>{body}</p>
      </li>
    );
  }
}
