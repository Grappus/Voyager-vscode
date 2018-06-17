import React, { Component } from "react";
import "./PackageDetail.css";
import npmService from "../../services/npms.service";
import hljs from "highlight.js";
import "highlight.js/styles/darcula.css";
var Markdown = require("react-remarkable");

const highlight = (str, lang = "javascript") => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (err) {
      console.error(err);
    }
  }

  try {
    return hljs.highlightAuto(str).value;
  } catch (err) {
    console.error(err);
  }

  return "";
};

const LeftAngle = () => (
  <div>
    <svg
      aria-hidden="true"
      fill="#fff"
      width="30"
      height="65"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 608 1280"
    >
      <path
        d="M595 288q0 13-10 23L192 704l393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10L23 727q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z"
        fill="#fff"
      />
    </svg>
  </div>
);

class PackageDetail extends Component {
  state = {
    pkg: null
  };

  onFocus() {
    debugger;
    this.setState({
      pkg: { readme: "<h4> Loading... </h4>" }
    });
    let pkg = this.props.pkg;

    if (pkg && !pkg.readme) {
      npmService
        .getPackageDetail(pkg.name)
        .then(res => {
          this.setState({
            pkg: res.data
          });
        })
        .catch(err => {
          this.setState({
            pkg: "Something went wrong..."
          });
        });
    }
  }

  onClose = () => {
    this.setState({
      pkg: null
    });
    this.props.onClose();
  };

  formatCount = count => {
    if (count > 1000) return parseInt(count / 1000, 10) + " K+";
    return count;
  };

  render() {
    const pkg =
      this.state.pkg && this.state.pkg.collected
        ? this.state.pkg.collected.metadata
        : this.props.pkg;
    const github =
      this.state.pkg &&
      this.state.pkg.collected &&
      this.state.pkg.collected.github;
    const npm =
      this.state.pkg &&
      this.state.pkg.collected &&
      this.state.pkg.collected.npm;
    return (
      <div className="package-detail">
        <div className="home--header">
          <div className="left">
            <div className="project-icon" />
            <div className="project-data" style={{ display: "flex" }}>
              <div className="back-btn" onClick={this.onClose}>
                <LeftAngle />
              </div>
              <div className="project-detail">
                <h3>
                  {pkg && pkg.name}
                  <span style={{ fontSize: "14px", paddingLeft: "5px" }}>
                    ({pkg && pkg.version})
                  </span>
                </h3>
                <div className="project-description">
                  {pkg && pkg.description}
                </div>
              </div>
            </div>
          </div>
          <div className="right package-data">
            <div className="controls--">
              {npm && (
                <a
                  target="_blank"
                  href={pkg.links && pkg.links.npm}
                  className="stat-box"
                >
                  <span>Weekly Downloads</span>
                  <span>
                    {npm.downloads &&
                      npm.downloads[1] &&
                      this.formatCount(npm.downloads[1].count)}
                  </span>
                </a>
              )}
              {github && (
                <a
                  target="_blank"
                  href={pkg.links && pkg.links.repository}
                  className="stat-box"
                >
                  <span>★ Stars</span>
                  <span>{github.starsCount}</span>
                </a>
              )}
              {github && (
                <a
                  target="_blank"
                  href={pkg.links && pkg.links.repository}
                  className="stat-box"
                >
                  <span>Forks</span>
                  <span>{github.forksCount}</span>
                </a>
              )}
              {github && (
                <a
                  target="_blank"
                  href={pkg.links && pkg.links.repository}
                  className="stat-box"
                >
                  <span>Issues Open</span>
                  <span>{github.issues.openCount}</span>
                </a>
              )}
            </div>
            <p className="stat-note">
              The data shown may not be accurate / real time, since it's cached data
              from recent past
            </p>
          </div>
        </div>
        <div className="home--body">
          <div className="sidebar menu-sidebar">
            <div className="sidebar-inner">
              <div className="tags-container">
                <div className="tag-b">-save</div>
                <div className="tag-b">-save-dev</div>
              </div>

              <div className="links-container">
                <h3>Links:</h3>
                {pkg &&
                  pkg.links &&
                  Object.keys(pkg.links).map(link => (
                    <a
                      href={pkg.links[link]}
                      target="_blank"
                      className="link-box"
                    >
                      ↪ {link}
                    </a>
                  ))}
              </div>
            </div>
          </div>
          <div className="container main-container" style={{ paddingTop: 0 }}>
            <div className="readme dark main-content">
              {pkg && pkg.readme ? (
                <Markdown
                  source={pkg.readme}
                  options={{ html: true, highlight }}
                />
              ) : (
                <h4>No Readme</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PackageDetail;
