import logo from '@static/logo.png';
import React from 'react';
import { hot } from 'react-hot-loader';

interface AppProps {
  title?: string;
}

interface AppState {
  counter: number;
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

        <button
          onClick={(): void =>
            this.setState({ counter: this.state.counter + 1 })
          }
        >
          Counter &nbsp; <span>{this.state.counter}</span>
        </button>
        <p>
          <button id="open-second-window">Open Second Window</button>
        </p>
      </div>
    );
  }
}

export default hot(module)(App);
