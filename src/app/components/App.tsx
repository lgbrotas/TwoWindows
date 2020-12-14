import logo from '@static/logo.png';
import React from 'react';
import { hot } from 'react-hot-loader';

interface AppProps {
  title?: string;
}

interface AppState {
  counter: number;
}

declare global {
  interface Window {
    api: any,
  }
}

class App extends React.Component<AppProps, AppState> {
  readonly state: AppState = { counter: 0 };

  render(): JSX.Element {
    return (
      <div className='container'>
        <h2 className='heading'>
          <img src={logo} width='32' title='Codesbiome' /> &nbsp;
            Two Windows Communication
        </h2>
        <p>
          <button id="open-second-window" onClick={() => {
            window.api.send('open-second-window', '');
          }}>Open Second Window</button>
        </p>
      </div>
    );
  }
}

export default hot(module)(App);
