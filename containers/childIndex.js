import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'


const Calendar = React.createClass({
  render() {
    return (
      <div> 
        {this.props.children}
      </div>
    );
  },
});
export default connect()(Calendar)
