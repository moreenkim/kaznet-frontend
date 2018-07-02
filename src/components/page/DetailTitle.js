// Renders the detail page title section
import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { Row, Col, Badge } from "reactstrap";
import { Link } from "react-router-dom";

import "./DetailTitle.css";

export default class DetailPageTitle extends Component {
  render() {
    return (
      <section className="detail-page-title">
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <div>
            <h1 className="kaznet-detail-title">
              <Link to={this.props.pageTarget} className="kaznet-header-link">
                {this.props.pageTitle}
              </Link>{" "}
              > {this.props.detailName}
              {this.props.status != null ? (
                <Badge className="kaznet-badge">{this.props.status}</Badge>
              ) : null}
            </h1>
            <p className="kaznet-creation-detail">
              By Jensen Nathan, 21 May 2018
            </p>
            <Col md="12">
              <Row className="kaznet-action-links">
                {/* Method maybe? to auto generate this links */}
                {this.props.actionLinks}

                <Link to="/" className="action-link archive-button">
                  <FontAwesomeIcon icon="folder-open" className="withspace" />
                  Archive
                </Link>
              </Row>
            </Col>
          </div>
        </Col>
      </section>
    );
  }
}
