import React from 'react';
import axios from 'axios';

import CircularProgress from 'material-ui/CircularProgress';

export default class Save extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTemplate && nextProps.selectedTemplate.accountId && this.state.message == '') {
      this.setState({ loading: true });
      const data = nextProps.selectedTemplate;

      // Create url based on if we are creating a template or updating one
      const baseUrl = `${this.props.apiUrl}/pages/${data.accountId}`;
      const endUrl = (nextProps.id == 'create') ? this.props.templateOrLayout : `${this.props.templateOrLayout}/${this.props.id}`;

      axios({
        url: `${baseUrl}/${endUrl}`,
        method: 'post',
        headers: { Authorization: this.props.token },
        data,
      }).then((res) => {
        this.setState({ message: res.data, loading: false });
        this.props.updateTemplate(data);
        if (nextProps.id == 'create') {
          const id = data.templateId || data.layoutId;
          this.props.history.push(`/${this.props.templateOrLayout}/${id}/edit`);
        }
      }).catch((err) => {
        this.setState({ message: err.response.data, loading: false });
      });
    }
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
