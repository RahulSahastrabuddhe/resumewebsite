import React, { Component } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Contact extends Component {
  render() {
    if (!this.props.data) return null;

    const name = this.props.data.name;
    const street = this.props.data.address.street;
    const city = this.props.data.address.city;
    const state = this.props.data.address.state;
    const zip = this.props.data.address.zip;
    const phone = this.props.data.phone;
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
                    <label htmlFor="contactName">Name</label>
                    <input
                      type="text"
                      size="35"
                      id="contactName"
                      name="contactName"
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      size="35"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message">Message</label>
                    <textarea
                      rows="10"
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <button className="submit">Send Message</button>
                  </div>
                </fieldset>
              </form>
            </div>

            <div className="four columns">
              <div className="widget">
                <h4>Contact Details</h4>
                <p className="address">
                  {name}
                  <br />
                  {street}
                  <br />
                  {city}, {state} {zip}
                  <br />
                  <span>{phone}</span>
                </p>
              </div>
            </div>
          </Slide>
        </div>
      </section>
    );
  }
}

export default Contact;
