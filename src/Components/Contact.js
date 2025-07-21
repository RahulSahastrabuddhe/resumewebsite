import React, { Component } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Contact extends Component {
  render() {
    if (!this.props.data) return null;


    const message = this.props.data.contactmessage;
    function sendEmail(e) {
      e.preventDefault();

      emailjs
        .sendForm(
          "service_tjp00jd",
          "template_xn3y2l7",
          e.target,
          "user_KxTFUCBkyZGN9TRtxlH90"
        )
        .then(
          (result) => {
            console.log(result.text);
            toast("Email sent Successfully. We will contact you soon :)");
          },
          (error) => {
            console.log(error.text);
          }
        );
    }

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
              <form onSubmit={sendEmail}>
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
                      id=""
                      cols="50"
                      rows="15"
                      name="contactMessage"
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="submit"
                      value="Send Message"
                    >
                      Submit
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
