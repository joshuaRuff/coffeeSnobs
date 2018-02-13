import React from 'react';
import _ from 'lodash';

import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

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
    const selectedTemplate = this.createTemplate(this.props.id, this.props.layouts);
    this.state = selectedTemplate;
  }

  componentDidMount() {
    // On first load, make sure codemirror gets formatted correctly
    const { codeMirrors } = this.state;
    for (let i = 0; i < codeMirrors.length; i += 1) {
      this.updateCodeMirror(codeMirrors[i].content, codeMirrors[i].ref);
    }
  }

  componentWillReceiveProps(nextProps) {
    // Pull the selected template from store and set to state to manipulate.
    const selectedTemplate = this.createTemplate(nextProps.id, nextProps.layouts);
    this.setState(selectedTemplate);
  }

  componentWillUnmount() {
    // Capture all of our data on this page into store
    const { codeMirrors, contentType } = this.state;
    const content = {};
    content[contentType] = {};

    if (codeMirrors.length > 1) {
      // Loop through all the codeMirrors, pull the content, and re-construct our object to pass to api for saving.
      for (let i = 0; i < codeMirrors.length; i += 1) {
        content[contentType][codeMirrors[i].title] = cleanContent(codeMirrors[i].content);
      }
    } else {
      content[contentType] = cleanContent(codeMirrors[0].content);
    }

    this.props.captureTemplate({
      accountId: this.state.accountId,
      layoutId: this.state.layoutId,
      content,
    });
  }

  createTemplate(id, layouts) {
    const selectedTemplate = layouts[id] || { content: { asset: null } };
    const contentType = Object.keys(selectedTemplate.content);
    let codeMirrors = [];
    const content = selectedTemplate.content[contentType] || ' ';

    // Check if our layout uses multiple keys or a single.
    if (typeof content == 'string') {
      codeMirrors = [{
        ref: 'codeMirror0',
        title: contentType[0],
        content: content,
      }];
      this.updateCodeMirror(content, 'codeMirror0');
    } else {
      const keys = Object.keys(content);
      for (let i = 0; i < keys.length; i += 1) {
        codeMirrors.push({
          ref: `codeMirror${i}`,
          title: keys[i],
          content: content[keys[i]],
        });
        this.updateCodeMirror(content[keys[i]], `codeMirror${i}`);
      }
    }

    return {
      accountId: selectedTemplate.accountId || this.props.accountId,
      codeMirrors,
      contentType: contentType[0],
      layoutId: selectedTemplate.layoutId || 'default',
    };
  }

  updateTemplateState(newValue, key) {
    const codeMirrors = _.cloneDeep(this.state.codeMirrors);
    codeMirrors[key].content = newValue;
    this.setState({ codeMirrors });
  }

  updateCodeMirror(content, ref) {
    if (content && ref && this.refs && this.refs[ref]) {
      const codeMirror = this.refs[ref].getCodeMirror();
      setAndIndentEditor(content, codeMirror);
    }
  }

  changeLayoutType(newValue) {
    let cm2, cm3;
    const cm1 = { ref: 'codeMirror0', title: newValue, content: ' ' };
    const codeMirrors = [cm1];
    if (newValue == 'schedule') {
      cm1.title = 'dayOpening';
      cm2 = { ref: 'codeMirror1', title: 'event', content: ' ' };
      cm3 = { ref: 'codeMirror2', title: 'dayEnding', content: ' ' };
      codeMirrors.push(cm2, cm3);
    }
    if (newValue == 'slider') {
      cm1.title = 'slide';
      cm2 = { ref: 'codeMirror1', title: 'hover', content: ' ' };
      cm3 = { ref: 'codeMirror2', title: 'expand', content: ' ' };
      codeMirrors.push(cm2, cm3);
    }
    this.setState({ contentType: newValue, codeMirrors });
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

    const createOrEdit = (this.props.id != 'create');

    const radioButtons = ['asset', 'list', 'schedule', 'slider'];
    const radioButtonsRendered = radioButtons.map((val, key) => (
      <RadioButton
        key = {key}
        disabled = {createOrEdit}
        value = {val}
        label = {val}
        style = {{ display: 'inline-block', width: 'auto', marginLeft: '20px' }}
      />
    ));

    const codeMirrorsRendered = this.state.codeMirrors.map((val, key) => (
      <div key={key}>
        <h4>{val.title}</h4>
        <CodeMirror
          ref={val.ref}
          value={val.content}
          onChange={newCode => this.updateTemplateState(newCode, key)}
          options={options}
          className='fullPage'
        />
      </div>
    ));

    return (
      <div className="templateSettings">
        <TextField
          disabled = {createOrEdit}
          floatingLabelFixed
          floatingLabelText = "Layout ID"
          floatingLabelStyle = {{ top: '0' }}
          inputStyle = {{ margin: '0' }}
          onChange={(e, val) => this.setState({ layoutId: val })}
          style = {{ height: '35px', margin: '25px 30px 0 0' }}
          value = {this.state.layoutId}
        />
        <span>Layout Type:</span>
        <RadioButtonGroup
          name = "layoutType"
          onChange = {(e, value) => { this.changeLayoutType(value); }}
          style = {{ display: 'inline-block', height: '35px' }}
          valueSelected = {this.state.contentType}
        >
          {radioButtonsRendered}
        </RadioButtonGroup>
        {codeMirrorsRendered}
      </div>
    );
  }
}
