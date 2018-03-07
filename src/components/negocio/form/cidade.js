import React, { Component } from 'react';
import { lightBlue700, white } from 'material-ui/styles/colors';

import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class FormCidade extends Component {

  state = {
    cidade: {
      nome: '',
      estado: ''
    },
    cidades: [],
    pontuacao: '',
    dialog: false,
    carregando: false,
  };

  abrirPopup = (nomeCidade, qtdPontos) => {
    this.setState({carregando: false, dialog: true, pontuacao: 'A pontuação da Cidade ' + nomeCidade + ' é ' + qtdPontos});
  };

  fecharPopup = () => {
    this.setState({dialog: false});
  };

  onChange = (event) => {
    const cidadeAux = this.state.cidade;
    cidadeAux[event.target.name] = event.target.value;
    this.setState({ cidade: cidadeAux });
  }

  mostrarPontuacao = (cidade) => {
    this.setState({ carregando: true });
    fetch('http://localhost:9000/rank/v1/pontos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'Nome': cidade.nome, 'Estado': cidade.estado })
    }).then(response => response.text())
    .then(qtdPontos => this.abrirPopup(cidade.nome, qtdPontos))
    .catch(error => console.error(error));
  }
  
  buscarCidades = (event) => {
    event.preventDefault();
    if (this.state.cidade.nome && this.state.cidade.nome.trim().length > 0) {
      this.setState({ carregando: true });
      let url = 'http://localhost:9000/rank/v1/cidades?nome=' + this.state.cidade.nome;
      if (this.state.cidade.estado && this.state.cidade.estado.trim().length > 0) {
        url += '&estado=' + this.state.cidade.estado;
      }
      fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(response => response.json())
      .then(cidades => this.setState({ cidades: cidades, carregando: false }))
      .catch(error => console.error(error));
    }
  }

  render() {
    const cidade = this.state.cidade;

    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.fecharPopup}
      />,
    ];

    return <form ref="formPessoa" onSubmit={(event) => this.buscarCidades(event)}>
      <div className="campos">
        <div className="titulo">Pesquisa de Cidade</div>

        <div className="bread">
          <Link to="/">Home</Link>
          <i className="fa fa-chevron-circle-right"></i>
          <Link to="/cidade">Cidade</Link>
        </div>

        <div id="identificacao">
          <div className="linha" style={{ marginBottom: '20px' }}>
            <TextField className="campo" maxLength="120"
              floatingLabelFixed={true} floatingLabelText="Cidade"
              name="nome" style={{ width: '300px', marginRight: '20px' }} required
              onChange={this.onChange} value={cidade.nome} />
            <TextField className="campo" maxLength="120"
              floatingLabelFixed={true} floatingLabelText="Estado"
              name="estado" style={{ width: '300px', marginRight: '20px' }}
              onChange={this.onChange} value={cidade.estado} />
            <RaisedButton primary={true} className="botao" label={
              <span><i className="fa fa-save"></i> Buscar</span>
            } type="submit" />
          </div>
          <div style={{ borderWidth: '2px', borderStyle: 'solid', maxWidth: '760px' }}>
            <Table>
              <TableHeader displaySelectAll={false} enableSelectAll={false}
                adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn colSpan="3" tooltip='Cidades'
                      style={{ textAlign: 'center', background: lightBlue700, color: white }}>
                    Cidades
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>Nome</TableHeaderColumn>
                  <TableHeaderColumn>Estado</TableHeaderColumn>
                  <TableHeaderColumn>Pontos</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} stripedRows={true}
                showRowHover={true}>
                {this.state.cidades.map((cidade, index1) => (
                  <TableRow key={`linha-${index1}`} selectable={false}>
                    <TableRowColumn key={`coluna-${index1}-nome`}>
                      {cidade.nome}
                    </TableRowColumn>
                    <TableRowColumn key={`coluna-${index1}-estado`}>
                      {cidade.estado}
                    </TableRowColumn>
                    <TableRowColumn key={`coluna-${index1}-pontos`}>
                      <FlatButton key={`coluna-${index1}-link`} label="Ver Pontuação"
                        primary={true} onClick={() => this.mostrarPontuacao(cidade)} />
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Dialog title="Pontuação da Cidade"
              actions={actions}
              contentStyle={{ width: '500px' }}
              modal={true} open={this.state.dialog}
              onRequestClose={this.fecharPopup}>
              {this.state.pontuacao}
            </Dialog>
            <Dialog title="Carregando ..."
              contentStyle={{ width: '500px' }}
              modal={true} open={this.state.carregando}>
              <LinearProgress mode="indeterminate" />
            </Dialog>
          </div>
        </div>
      </div>

      {/* {this.state.cidades} */}
    </form>
  }
}