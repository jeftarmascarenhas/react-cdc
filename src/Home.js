import React, { Component } from 'react'


export default  class Home  extends Component{
    render() {
        return(
            <div>
                <div className="header">
                    <h1>Bem vindo ao sistema de estudos em React</h1>
                    <h2>By Jeftar Mascarenhas</h2>
                </div>
                <div className="content" id="content">
                </div>
            </div>
        );
    }
}