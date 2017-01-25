import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import ButtonCustomizado from './components/ButtonCustomizado';

class FormAutorCustomizado extends Component {

    constructor (){
        super();
        this.state = {nome:'', email:'', senha: ''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

enviaForm (evento) {
    console.log({nome:this.state.name, email:this.state.email, senha:this.state.senha});
    evento.preventDefault();
    $.ajax({
        url:'http://cdc-react.herokuapp.com/api/autores',
        contentType:'application/json',
        dataType: 'json',
        type:'post',
        data: JSON.stringify({nome:this.state.nome, email:this.state.email, senha:this.state.senha}),
        success: function (resp) {
            this.props.callBackAtualizarLista(resp);
            this.setState({nome:'', email:'', senha:''});
            console.log('Dados enviado com sucesso', resp);
        }.bind(this),
            error: function (resp) {
            console.log('Erro de envio tipo do erro:', resp);
        }
    });
}

  setNome (evento) {
    this.setState({nome: evento.target.value});
  }

  setEmail (evento) {
    this.setState({email: evento.target.value});
  }

  setSenha (evento) {
    this.setState({senha: evento.target.value});
  }

    render () {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                  <InputCustomizado label="Nome" id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} />
                  <InputCustomizado label="Email" id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} />
                  <InputCustomizado label="Senha" id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} />
                  <ButtonCustomizado type="submit" name="Gravar" className="pure-button pure-button-primary"/>
                </form>
              </div>
        );
    }
}

class TabelaAutoresCustomizado extends  Component {

    render () {
        return (
            <div>
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        this.props.lista.map(function(autor) {
                          return (
                            <tr key={autor.id}>
                              <td>{autor.nome}</td>
                              <td>{autor.email}</td>
                            </tr>
                          );
                        })
                      }
                  </tbody>
                </table>
              </div>
        );
    }
}

export default class AutorBox extends Component {

    constructor () {
        super();
        this.state = {lista: []};
        this.atualizarLista = this.atualizarLista.bind(this);
    }

/*Poderia usar o componentWillMount porem ele é carregado antes do render como
  não tenho dados para mostrar antes do render() uso o componentDidMount que carrega após
  o componente ser renderizado*/
    componentDidMount() {
        console.log('WillMount');
        $.ajax({
        url:'http://cdc-react.herokuapp.com/api/autores',
        dataType: 'json',
        success: function  (resposta) {
            console.log('Chegou a resposta o react vai atualizar, foda!!!!');
            this.setState({lista: resposta});
        }.bind(this)
        });
    }

    atualizarLista (novaLista) {
        this.setState({lista: novaLista});
    }
    render () {
        return (
            <div>
                <FormAutorCustomizado callBackAtualizarLista={this.atualizarLista}/>
                <TabelaAutoresCustomizado lista={this.state.lista}/>
            </div>
        );
    }
}