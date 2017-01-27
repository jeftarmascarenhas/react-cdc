import React, { Component } from 'react'

class ButtonCustomizado extends Component {
    render () {
        return (
            <div className="pure-control-group">
                <label></label>
                <button type={this.props.type} className={this.props.className}>{this.props.name}</button>
            </div>
        );
    }
}

export default ButtonCustomizado;