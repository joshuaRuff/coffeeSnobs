import React from 'react';
import axios from 'axios';

import CircularProgress from 'material-ui/CircularProgress';

export default class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      message: '',
    };
  }

  componentDidMount() {
    axios({
      url: `${this.props.apiUrl}/pages/${this.props.accountId}/${this.props.templateOrLayout}/${this.props.id}`,
      method: 'delete',
      headers: { Authorization: this.props.token },
    }).then((res) => {
      this.setState({ message: res.data, loading: false });
      const deleteInfo = {};
      deleteInfo[this.props.templateOrLayout] = this.props.id;
      this.props.deleteTemplate(deleteInfo);
      this.props.history.push(`/${this.props.templateOrLayout}/create/edit`);
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
