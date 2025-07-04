import React, { Component } from "react";
import Slide from "react-awesome-reveal";

class Resume extends Component {
  getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    if (!this.props.data) return null;
    
    const skillmessage = this.props.data.skillmessage;
    const education = this.props.data.education.map(function (education) {
      return (
        <div key={education.school}>
          <h3>{education.school}</h3>
          <p className="info">
            {education.degree} <span>&bull;</span>
            <em className="date">{education.graduated}</em>
          </p>
          <p>{education.description}</p>
        </div>
      );
    });

    const work = this.props.data.work.map(function (work) {
      return (
        <div key={work.company}>
          <h3>{work.company}</h3>
          <p className="info">
            {work.title}
            <span>&bull;</span> <em className="date">{work.years}</em>
          </p>
          <p style={{justifyContent: 'safe center'}}>{work.description.map(function(desc) {
      return (
            <p>{desc}</p>
      );
    })}</p>
        </div>
      );
    });

    const skills = this.props.data.skills.map((skills) => {
      const backgroundColor = this.getRandomColor();
      const className = "bar-expand " + skills.name.toLowerCase();
      const width = skills.level;

      return (
        <li key={skills.name}>
          <span style={{ width, backgroundColor }} className={className}></span>
          <em>{skills.name}</em>
        </li>
      );
    });

    return (
      <div className="resume-wrapper">
        <div className="resume-intro">
          <h1>Resume</h1>
          <p>{skillmessage}</p>
        </div>
        <div className="resume-content">
          <div className="education">
            <h2>Education</h2>
            {education}
          </div>
          <div className="work">
            <h2>Work Experience</h2>
            {work}
          </div>
          <div className="skills">
            <h2>Skills</h2>
            <ul>{skills}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Resume;
