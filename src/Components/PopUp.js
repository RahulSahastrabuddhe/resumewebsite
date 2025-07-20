import React from "react";

export default function PopUp(props) {
  const handleClick = () => {
    props.toggle();
  };

  // Default Render
  return (
    <div className="popup">
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={handleClick}>
            &times;{" "}
          </span>
          <h3>Become A Member</h3>
          <h4>Total Amount in USD: $10</h4>
          <div>
            <label htmlFor="contactName">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              defaultValue=""
              size="35"
              id="name"
              name="name"
              required
            />
          </div>

          <div>
            <label htmlFor="contactName">
              NetID <span className="required">*</span>
            </label>
            <input
              type="text"
              defaultValue=""
              size="35"
              id="netId"
              name="netId"
              required
            />
          </div>

          <div>
            <label htmlFor="contactEmail">
              Email <span className="required">*</span>
            </label>
            <input
              type="text"
              defaultValue=""
              size="35"
              id="email"
              name="email"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
