import '../styles/globals.css';
import '../styles/ckeditor.css';
import 'animate.css';
import 'bootstrap-4-grid';

import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import 'tippy.js/animations/shift-away.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import { context, useAction } from '@reatom/react';
import { createStore } from '@reatom/core';

import React from 'react';
import { ThemeContextProvider, TokenContext, UserContext } from '../components/contexts';
import { Header } from '../components/organisms/Header';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Notification } from '../components';
import App from 'next/app';
import { controller, notifyError } from '../core';
import { User } from '../components/types/User';
import { useTheme } from '@emotion/react';
import { Footer } from '../components/organisms/Footer';

const { Provider: StoreProvider } = context;

type State = {
  accessToken?: string;
  user?: User;
}

class MyApp extends App<{}, {}, State> {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      user: {}
    }
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("access_token");
    this.setState({ accessToken });
    if(accessToken && accessToken.length) {
      controller.get(`/user/readByToken?token=${accessToken}`)
        .then(res => {
          if (res.data) {
            this.setState({ user: res.data.data });
          }
        })
        .catch(err => {
          const errData = err.response;
          switch (errData.data.error) {
            case "not found":
              localStorage.removeItem('access_token')
              location.reload();
              break;
            default:
              notifyError('Ошибка сервера');
          }
        })
    }
  }

  render() {
    const store = createStore();
    const { Component, pageProps } = this.props;

    return (
      <StoreProvider value={store}>
        <ThemeContextProvider>
          <TokenContext.Provider value={this.state.accessToken}>
            <UserContext.Provider value={this.state.user}>
              <Header />
              <Notification />
              <Component accessToken={this.state.accessToken} {...pageProps} />
              <Footer />
            </UserContext.Provider>
          </TokenContext.Provider>
        </ThemeContextProvider>
      </StoreProvider>
    );
  }
}

export default MyApp;
