import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

export default class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  selectAction(type) {
    this.props.history.push(`/${this.props.templateOrLayout}/${this.props.id}/${type}`);
  }

  setAlert(state) { this.setState({ open: state }); }

  render() {
    const editSelected = (this.props.action == 'edit');
    const saveSelected = (this.props.action === 'save');
    const liveSelected = (this.props.action === 'live');
    const deleteSelected = (this.props.action === 'delete');
    const createOrEdit = (this.props.id != 'create');

    const editButton = (this.props.hide != 'edit') ?
      <RaisedButton
        label="Edit"
        onClick={() => this.selectAction('edit')}
        primary
        disabled={editSelected}
      /> : '';

    const saveButton = (this.props.hide != 'save') ?
      <RaisedButton
        label="Save"
        onClick={() => this.selectAction('save')}
        labelColor="#fff"
        backgroundColor="#4CAF50"
        disabled={saveSelected}
      /> : '';

    const liveButton = (this.props.hide != 'live' && createOrEdit) ?
      <RaisedButton
        label="Live Update"
        onClick={() => this.selectAction('live')}
        labelColor="#fff"
        backgroundColor="rgb(135, 206, 235)"
        disabled={liveSelected}
      /> : '';

    const deleteButton = (this.props.hide != 'delete' && createOrEdit) ?
      <RaisedButton
        label="Delete"
        onClick={() => this.setAlert(true)}
        labelColor="#fff"
        backgroundColor="rgb(229, 57, 53)"
        disabled={deleteSelected}
      /> : '';

    const dialogActions = [
      <RaisedButton
        key = "deleteCancelButton"
        label = "Cancel"
        onClick = {() => { this.setAlert(false); }}
      />,
      <RaisedButton
        key = "deleteConfirmButton"
        label = "Delete"
        labelColor = "#fff"
        backgroundColor = "rgb(229, 57, 53)"
        onClick = {() => { this.setAlert(false); this.selectAction('delete'); }}
      />,
    ];

    return (
      <div className="topNav">
        {editButton}
        {saveButton}
        {liveButton}
        {deleteButton}
        <Dialog
          actions = {dialogActions}
          modal = {false}
          open = {this.state.open}
          onRequestClose = {(clicked) => { if (!clicked) { this.setAlert(false); } }}
        >
          Are you sure you want to delete? There is no way to undo this
        </Dialog>
      </div>
    );
  }
}
