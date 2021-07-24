import React, { Component } from "react";
import Fade from "react-reveal";
//import PopUp from "./PopUp";

let id = 0;
class Portfolio extends Component {
  state = {
    seen: false,
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
  };
  render() {
    if (!this.props.data) return null;

    const projects = this.props.data.projects.map(function (projects) {
      let projectImage = "images/portfolio/" + projects.image;

      return (
        <>
          {/* {this.state.seen ? <PopUp toggle={this.togglePop} /> : null} */}
          <div key={id++} className="columns portfolio-item">
            <div className="item-wrap">
              {/* href onClick={this.togglePop} */}
              {/* <a>
                
              </a> */}
              <img alt={projects.title} src={projectImage} />
              <a href={projects.url} target="_blank" rel="noreferrer">
                <div style={{ textAlign: "center" }}>{projects.title}</div>
              </a>
            </div>
          </div>
        </>
      );
    });

    return (
      <section id="portfolio">
        <Fade left duration={1000} distance="40px">
          <div className="row">
            <div className="twelve columns collapsed">
              <h1>Check Out Some of My Works.</h1>

              <div
                id="portfolio-wrapper"
                className="bgrid-quarters s-bgrid-thirds cf"
              >
                {projects}
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default Portfolio;
