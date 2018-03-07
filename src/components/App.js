import 'roboto-npm-webfont';

import React, { Component } from 'react';

import Layout from './layout';

import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import FormCidade from './negocio/form/cidade';

injectTapEventPlugin();

export default class App extends Component {
  render = () => <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/" component={FormCidade} />
        <Route path="/cidade" component={FormCidade} />
      </Switch>
    </Layout>
  </BrowserRouter>
}