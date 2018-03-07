import React, { Component } from 'react';

import '../../assets/css/geral.css';
import 'font-awesome/css/font-awesome.min.css';

import Badge from 'material-ui/Badge';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';

import * as Colors from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Icone = (props) => (
  <i className={`fa fa-lg fa-${props.className}`}></i>
);

const IconeButton = (props) => (
  <IconButton tooltip={props.tooltip} onClick={props.onClick}
    tooltipPosition={props.tooltipPosition}>
    <Icone className={props.className} />
  </IconButton>
);

const MenuBar = (props) => (
  <Drawer className='menuBar' docked={false} open={props.menuAberto}
    onRequestChange={(estado) => props.mudarEstado(estado)}>
    <List>
      <ListItem primaryText='Cidade' href='/cidade'
        leftIcon={<Icone className='money iconMenu' />} />
    </List>
  </Drawer>
);

const NotificationBar = (props) => (
  <div className='menuLateralDireito'>
    <Badge className='balao' secondary={true} badgeContent={props.notificacoes ? props.notificacoes.length : 0} />
    <IconMenu iconButtonElement={<IconButton tooltip='Notificações'><Icone className='bell' /></IconButton>}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      className='notificacoes'>
      <MenuItem primaryText='Esta é uma notificação'
          leftIcon={<Icone className='info-circle iconMenu' />} className='notificacao' />
    </IconMenu>
    <div className='sair'><IconeButton tooltip='Sair' className='power-off' /></div>
  </div>
);

const TopoBar = (props) => (
  <div className='topo'>
    <AppBar title={<span className='tituloAplicacao'>Ranking de Cidades</span>}
      iconElementLeft={<IconeButton tooltip='Menu Principal'
        className='bars iconeMenuPrincipal'
        tooltipPosition='bottom-right'
        onClick={props.acionarMenuBar} />}
      iconElementRight={props.notificacoes} />
  </div>
);

const customTheme = {
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.lightBlue700,
    primary2Color: Colors.lightBlue500,
    accent1Color: Colors.orange900,
  },
  textField: {
    borderColor: Colors.grey500,
    floatingLabelColor: Colors.lightBlue800
  }
}

const RodapeBar = () => (
  <div className='rodape' style={{ backgroundColor: customTheme.palette.primary1Color }}>
    <div className='infoSistema'>
      <p>Desenvolvido por Igor Queiroz @ 2018</p>
    </div>
  </div>
);

class Layout extends Component {

  state = {
    menuAberto: false,
  }

  acionarMenuBar = () => this.setState({menuAberto: !this.state.menuAberto});

  render = () => <MuiThemeProvider muiTheme={getMuiTheme(baseTheme, customTheme)}>
    <div className='tudo'>
      <MenuBar menuAberto={this.state.menuAberto} mudarEstado={(estado) => this.setState({menuAberto: estado})} />
      <TopoBar acionarMenuBar={this.acionarMenuBar} notificacoes={<NotificationBar notificacoes={this.props.notificacoes} />} />
      <div className='conteudo'>
        {this.props.children}
      </div>
      <RodapeBar />
    </div>
  </MuiThemeProvider>
}

export default Layout;