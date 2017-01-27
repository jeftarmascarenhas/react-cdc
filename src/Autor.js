import React, { Component } from 'react'
import $ from 'jquery'
import InputCustomizado from './components/InputCustomizado'
import ButtonCustomizado from './components/ButtonCustomizado'
import PubSub from 'pubsub-js'
import TratadorErros from './TratadorErros'

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
    console.log({nome:this.state.nome, email:this.state.email, senha:this.state.senha});
    evento.preventDefault();
    $.ajax({
        url:'http://cdc-react.herokuapp.com/api/autores',
        contentType:'application/json',
        dataType: 'json',
        type:'post',
        data: JSON.stringify({nome:this.state.nome, email:this.state.email, senha:this.state.senha}),
        success: function (resp) {
            PubSub.publish('atualizar-lista-autores', resp);
            this.setState({nome:'', email:'', senha:''});

        }.bind(this),
        error: function (resp) {
                if(resp.status === 400) {
                    new TratadorErros().publicaErros(resp.responseJSON);
            }
        },
        beforeSend: function  () {
            PubSub.publish('limpa-erro', {});
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
        this.state = {lista: [], loading:false};
        this.atualizarLista = this.atualizarLista.bind(this);
    }

/*Poderia usar o componentWillMount porem ele é carregado antes do render como
  não tenho dados para mostrar antes do render() uso o componentDidMount que carrega após
  o componente ser renderizado*/
    componentDidMount () { // listagem
        console.log('DidMount');
        $.ajax({
        url:'http://cdc-react.herokuapp.com/api/autores',
        dataType: 'json',
        type: 'get',
        success: function  (resp) {
            console.log('Chegou a resposta o react vai atualizar, foda!!!!');
            this.setState({lista: resp, loading:false});
        }.bind(this)
        });

        PubSub.subscribe('atualizar-lista-autores', function (topico, resp) {
            this.setState({lista: resp});
        }.bind(this));
    }

    atualizarLista (resp) {
        if(resp) {
            this.setState({loading:true});
        }
        this.setState({lista: resp});
    }
    render () {
        return (
            <div>
                <FormAutorCustomizado/>
                <TabelaAutoresCustomizado lista={this.state.lista} loadingRefresh={this.state.loading}/>
            </div>
        );
    }
}