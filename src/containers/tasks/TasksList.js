// Smart component that renders the Task list view
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import Moment from "react-moment";

import * as taskActions from "../../store/tasks/actions";
import * as globalActions from "../../store/global/actions";
import * as taskSelectors from "../../store/tasks/reducer";

import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";

export class TasksList extends Component {
  componentDidMount() {
    this.props.showListTitle();
    this.props.fetchTasks();
    this.props.changePageTitle("Tasks");
    this.props.changePageTitleButton("+ Create Task");
    this.props.changePageTarget("/tasks/new");
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="TasksList">
        <ListView
          renderHeaders={this.renderHeaders}
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow}
        />
      </div>
    );
  }

  renderLoading() {
    return <p>Loading...</p>;
  }

  renderHeaders() {
    const headerItems = [
      "Status",
      "Name",
      "Need Review",
      "Created",
      "Expires",
      "Form"
    ];
    return <ElementMap items={headerItems} HTMLTag="th" />;
  }

  renderRow(row) {
    const rowItems = [
      row.attributes.status_display,
      <Link to={`/tasks/${row.id}`} key="link_to">
        {row.attributes.name}
      </Link>,
      row.attributes.pending_submissions_count +
        "/" +
        row.attributes.submission_count,
      <Moment key={row.id} format="DD-MM-YYYY">
        {row.attributes.start}
      </Moment>,
      <Moment key={row.id} format="DD-MM-YYYY">
        {row.attributes.end}
      </Moment>,
      row.attributes.xform_title
    ];
    return <ElementMap items={rowItems} HTMLTag="td" />;
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    rowsById: taskSelectors.getTasksById(state),
    rowsIdArray: taskSelectors.getTasksIdArray(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTasks: taskActions.fetchTasks,
      changePageTitle: globalActions.changePageTitle,
      changePageTitleButton: globalActions.changePageTitleButton,
      changePageTarget: globalActions.changePageTarget,
      showListTitle: globalActions.toggleDetailTitleOff
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList);
