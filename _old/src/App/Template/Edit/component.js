import React from 'react';
import _ from 'lodash';

import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Delete from 'material-ui/svg-icons/action/delete';

import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/css/css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';

import { setAndIndentEditor, cleanContent } from '../../common/functions';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    // Pull the selected tempalte from store and set to state to manipulate.
    const selectedTemplate = this.createTemplate(this.props.id, this.props.templates);
    this.state = selectedTemplate;
  }

  componentDidMount() {
    // On first load, make sure codemirror gets formatted correctly
    this.updateCodeMirror(this.state.content);
  }

  componentWillReceiveProps(nextProps) {
    // Pull the selected template from store and set to state to manipulate.
    const selectedTemplate = this.createTemplate(nextProps.id, nextProps.templates);
    this.setState(selectedTemplate);
  }

  componentWillUnmount() {
    // Capture all of our data on this page into store
    const content = cleanContent(this.state.content);
    const settings = _.cloneDeep(this.state.settings);
    settings.data = this.state.data;

    this.props.captureTemplate({
      accountId: this.state.accountId,
      templateId: this.state.templateId,
      content,
      restricted: this.state.restricted,
      settings,
    });
  }

  createTemplate(id, templates) {
    const selectedTemplate = templates[id] || { settings: {} };
    const content = selectedTemplate.content || ' ';
    this.updateCodeMirror(content);
    return {
      accountId: selectedTemplate.accountId || this.props.accountId,
      restricted: selectedTemplate.restricted || false,
      content: selectedTemplate.content || '',
      templateId: selectedTemplate.templateId || 'default',
      settings: selectedTemplate.settings || {},
      data: selectedTemplate.settings.data || [],
    };
  }

  updateCodeMirror(content) {
    if (content && this.refs && this.refs.CodeMirror) {
      const codeMirror = this.refs.CodeMirror.getCodeMirror();
      setAndIndentEditor(content, codeMirror);
    }
  }

  updateDataSrc(index, key, value) {
    const data = _.cloneDeep(this.state.data);
    const keys = Object.keys(data[index]);
    // If the name was updated, remove the old key and set the new key.
    // If not, change the correct value
    if (key == 'name') {
      data[index][value] = data[index][keys[0]];
      delete data[index][keys[0]];
    } else {
      data[index][keys[0]][key] = value;
    }
    this.setState({ data });
  }

  removeDataSrc(index) {
    const data = _.cloneDeep(this.state.data);
    data.splice(index, 1);
    this.setState({ data });
  }

  addDataSrc(e) {
    const data = _.cloneDeep(this.state.data);
    data.push({ name: { feed: '', feedId: '', query: '' } });
    this.setState({ data });
  }

  render() {
    const options = {
      mode: 'text/html',
      lineNumbers: true,
      lineWrapping: true,
      matchBrackets: true,
      matchTags: { bothTags: true },
      autoCloseBrackets: true,
      autoCloseTags: true,
      indentWithTabs: true,
      readOnly: false,
      tabSize: 2,
    };

    const dataSources = this.state.data.map((data, index) => {
      const keys = Object.keys(data);
      const style = { height: '35px', margin: '25px 30px 0 0', width: '100px' };
      return (
        <div key={index}>
          <TextField
            floatingLabelFixed
            floatingLabelText = "Name"
            floatingLabelStyle = {{ top: '0' }}
            inputStyle = {{ margin: '0' }}
            onChange = {(e, val) => { this.updateDataSrc(index, 'name', val); }}
            style = {style}
            value = {keys[0]}
          />
          <TextField
            floatingLabelFixed
            floatingLabelText = "feed"
            floatingLabelStyle = {{ top: '0' }}
            inputStyle = {{ margin: '0' }}
            onChange = {(e, val) => { this.updateDataSrc(index, 'feed', val); }}
            style = {style}
            value = {data[keys[0]].feed}
          />
          <TextField
            floatingLabelFixed
            floatingLabelText = "feedId"
            floatingLabelStyle = {{ top: '0' }}
            inputStyle = {{ margin: '0' }}
            onChange = {(e, val) => { this.updateDataSrc(index, 'feedId', val); }}
            style = {style}
            value = {data[keys[0]].feedId}
          />
          <TextField
            floatingLabelFixed
            floatingLabelText = "query"
            floatingLabelStyle = {{ top: '0' }}
            inputStyle = {{ margin: '0' }}
            onChange = {(e, val) => { this.updateDataSrc(index, 'query', val); }}
            style = {style}
            value = {data[keys[0]].query}
          />
          <FloatingActionButton
            onClick={(e) => { this.removeDataSrc(index); }}
            mini
            secondary
            iconStyle={{ width: '25px', height: '25px' }}
          >
            <Delete />
          </FloatingActionButton>
        </div>
      );
    });

    const createOrEdit = (this.props.id != 'create');

    return (
      <div className="templateSettings">
        <TextField
          disabled = {createOrEdit}
          floatingLabelFixed
          floatingLabelText = "Template ID"
          floatingLabelStyle = {{ top: '0' }}
          inputStyle = {{ margin: '0' }}
          onChange={(e, val) => this.setState({ templateId: val })}
          style = {{ height: '35px', margin: '25px 30px 0 0' }}
          value = {this.state.templateId}
        />
        <div className="restricted">
          <Toggle
            label="Restricted"
            onToggle={(e, isToggled) => { this.setState({ restricted: isToggled }); }}
            toggled={this.state.restricted}
          />
        </div>
        <h5>Data Sources:</h5>
        <div className="dataSrcUrls">
          {dataSources}
          <FloatingActionButton onClick={(e) => { this.addDataSrc(); }} mini>
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <h5>Content:</h5>
        <CodeMirror
          ref="CodeMirror"
          value={this.state.content}
          onChange={newCode => this.setState({ content: newCode })}
          options={options}
        />
      </div>
    );
  }
}
