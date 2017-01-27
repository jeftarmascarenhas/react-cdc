import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class InputCustomizado extends Component {
    constructor(){
        super();
        this.state ={msgErro:''};
    }
    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id="nome" type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange}/>
                <span className="erros">{this.state.msgErro}</span>
            </div>
        );
    }

    componentDidMount() {
        PubSub.subscribe('erro-validacao', function  (topico, erro) {
            this.setState({msgErro: erro});
        }.bind(this));
    }

}

export default InputCustomizado;

