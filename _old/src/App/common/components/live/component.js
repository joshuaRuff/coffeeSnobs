import React from 'react';
import axios from 'axios';

import CircularProgress from 'material-ui/CircularProgress';

export default class Live extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      message: '',
    };
  }

  componentDidMount() {
    axios({
      url: `${this.props.apiUrl}/pages/${this.props.accountId}/template/${this.props.id}/liveUpdate`,
      method: 'get',
      headers: { Authorization: this.props.token },
    }).then((res) => {
      this.setState({ message: res.data, loading: false });
    }).catch((err) => {
      this.setState({ message: err.response.data, loading: false });
    });
  }

  render() {
    const loading = (this.state.loading) ? <CircularProgress size={80} thickness={5} /> : this.state.message;
    return (
      <div className="templateSettings">
        {loading}
      </div>
    );
  }
}
