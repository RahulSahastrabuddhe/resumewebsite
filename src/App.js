import React, { Component } from "react";
import ReactGA from "react-ga4";
import $ from "jquery";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";
import Portfolio from "./Components/Portfolio";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {}
    };

    // Initialize GA4 with your Measurement ID from environment variables
    ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID || "G-XXXXXXXXXX");
    
    // Track pageview
    ReactGA.send({ 
      hitType: "pageview", 
      page: window.location.pathname + window.location.search,
      title: document.title
    });
  }

  async getResumeData() {
    try {
      const response = await fetch("./resumeData.json", {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      this.setState({ resumeData: data });
      
    } catch (error) {
      console.error('Error loading resume data:', error);
      // Log to analytics
      ReactGA.event({
        category: 'Error',
        action: 'Resume Data Load Failed',
        label: error.message
      });
      
      // Set empty state to prevent app crash
      this.setState({
        resumeData: {
          main: { name: 'Loading Error', contactmessage: 'Failed to load content. Please refresh the page or try again later.' },
          resume: {},
          portfolio: {}
        }
      });
    }
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    const { resumeData } = this.state;
    
    if (!resumeData.main) {
      return (
        <div className="app-loading">
          <div className="loading-spinner"></div>
          <p>Loading resume data...</p>
        </div>
      );
    }

    return (
      <div className="App">
        <Header data={resumeData.main} />
        <About data={resumeData.main} />
        <Resume data={resumeData.resume} />
        <Portfolio data={resumeData.portfolio} />
        <Contact data={resumeData.main} />
        <Footer data={resumeData.main} />
        
        {/* Security Headers and CSP Meta Tag */}
        <meta 
          httpEquiv="Content-Security-Policy" 
          content={
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "img-src 'self' data: https:; " +
            "font-src 'self' https://fonts.gstatic.com; " +
            "connect-src 'self' https://www.google-analytics.com https://formspree.io; " +
            "frame-src 'none'; " +
            "object-src 'none'; " +
            "base-uri 'self'; " +
            "form-action 'self' https://formspree.io; " +
            "upgrade-insecure-requests;"
          } 
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()" />
      </div>
    );
  }
}

export default App;
