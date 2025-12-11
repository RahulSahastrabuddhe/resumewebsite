import React, { Component } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DOMPurify from 'dompurify';

// Function to sanitize user input
const sanitizeInput = (input) => {
  if (!input) return '';
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csrfToken: '',
      isSubmitting: false
    };
  }

  componentDidMount() {
    // Generate CSRF token
    this.setState({ csrfToken: this.generateCSRFToken() });
  }

  generateCSRFToken() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Sanitize all form inputs
    const sanitizedData = {};
    for (let [key, value] of formData.entries()) {
      sanitizedData[key] = sanitizeInput(value);
    }

    this.setState({ isSubmitting: true });

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.state.csrfToken
        },
        body: JSON.stringify(sanitizedData)
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      toast.success("Message sent! I'll get back to you soon.");
      form.reset();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    if (!this.props.data) return null;

    const message = this.props.data.contactmessage;

    return (
      <section id="contact">
        <ToastContainer />
        <Fade bottom duration={1000}>
          <div className="row section-head">
            <div className="two columns header-col">
              <h1>
                <span>Get In Touch.</span>
              </h1>
            </div>

            <div className="ten columns">
              <p className="lead">{message}</p>
            </div>
          </div>
        </Fade>

        <div className="row">
          <Slide left duration={1000}>
            <div className="eight columns">
              <form
                action="https://formspree.io/f/mdkdapeq"
                method="POST"
                onSubmit={this.handleSubmit}
                noValidate
              >
                <input type="hidden" name="_csrf" value={this.state.csrfToken} />
                <fieldset>
                  <div>
                    <label htmlFor="contactName">
                      Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      size="35"
                      placeholder="Name"
                      name="contactName"
                      required
                      minLength="2"
                      maxLength="100"
                      pattern="^[a-zA-Z\s-']+$"
                      title="Please enter a valid name (letters, spaces, hyphens, and apostrophes only)"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      size="35"
                      name="contactEmail"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      title="Please enter a valid email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactSubject">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                      size="35"
                      name="contactSubject"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactMessage">
                      Message <span className="required">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      cols="50"
                      rows="15"
                      name="contactMessage"
                      required
                      minLength="10"
                      maxLength="2000"
                      aria-label="Your message"
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="submit"
                      value="Send Message"
                      disabled={this.state.isSubmitting}
                      aria-label="Send message"
                    >
                      {this.state.isSubmitting ? 'Sending...' : 'Submit'}
                    </button>

                    <span id="image-loader">
                      <img alt="" src="images/loader.gif" />
                    </span>
                  </div>
                </fieldset>
              </form>

              <div id="message-warning"> Error</div>
              <div id="message-success">
                <i className="fa fa-check"></i>Your message was sent, thank you!
                <br />
              </div>
            </div>
          </Slide>
          <Slide right duration={1000}>
            <aside className="four columns footer-widgets">
              <div className="widget widget_contact">
              </div>
            </aside>
          </Slide>
        </div>
      </section>
    );
  }
}

export default Contact;
