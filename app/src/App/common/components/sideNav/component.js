import React from 'react';

import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';

export default class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  selectTemplate(type, id) {
    this.props.history.push(`/${type}/${id}/edit`);
  }

  createTemplateNav(templates) {
    // Loop through templates and create <ListItems /> for each
    const templateNav = Object.keys(templates).map((templateKey, index) => {
      const template = this.props.templates[templateKey];
      const selected = (this.props.id === template.templateId) ? 'active' : '';
      return (
        <ListItem
          className={selected}
          key={index}
          onClick={() => this.selectTemplate('template', template.templateId)}
          primaryText={template.templateId}
        />
      );
    });

    // Add a Create Template option at the end of our list
    const create = (this.props.id == 'create') ? 'active' : '';
    templateNav.push((
      <ListItem
        className={create}
        key="sideNavCreateNewTemplate"
        onClick={() => this.selectTemplate('template', 'create')}
        primaryText="Create New Template"
      />
    ));

    return templateNav;
  }

  createLayoutNav(layouts) {
    // Loop through layouts and create <ListItems /> for each
    const layoutNav = Object.keys(layouts).map((layoutKey, index) => {
      const layout = this.props.layouts[layoutKey];
      const selected = (this.props.id === layout.layoutId) ? 'active' : '';
      return (
        <ListItem
          key={index}
          primaryText={layout.layoutId}
          onClick={() => this.selectTemplate('layout', layout.layoutId)}
          className={selected}
        />
      );
    });

    // Add a Create Layout option at the end of our list
    layoutNav.push((
      <ListItem
        key="sideNavCreateNewLayout"
        primaryText="Create New Layout"
        onClick={() => this.selectTemplate('layout', 'create')}
      />
    ));

    return layoutNav;
  }

  render() {
    const templates = this.createTemplateNav(this.props.templates);
    const layouts = this.createLayoutNav(this.props.layouts);

    const templateActive = (this.props.templateOrLayout == 'template') ? 'active' : '';
    const layoutActive = (this.props.templateOrLayout == 'layout') ? 'active' : '';

    return (
      <div className="navLeft">
        <List>
          <ListItem
            className={'column-head ' + templateActive}
            initiallyOpen={false}
            nestedItems={templates}
            primaryText="Templates"
            primaryTogglesNestedList
          />
          <Divider />
          <ListItem
            className={'column-head ' + layoutActive}
            initiallyOpen={false}
            nestedItems={layouts}
            primaryText="Layouts"
            primaryTogglesNestedList
          />
          <Divider />
        </List>
      </div>
    );
  }
}
