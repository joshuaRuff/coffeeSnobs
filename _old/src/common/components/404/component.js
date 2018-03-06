import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class FourOFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.props.updateTest('Gotcha');
  }
  
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <h1>404</h1>
        </div>
      </MuiThemeProvider>
    );
  }
}
