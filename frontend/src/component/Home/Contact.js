import React from "react";
import { Fragment } from "react";
import "./Contact.css";
import MetaData from "../layout/MetaData";

const About = () => {
  return (
    <Fragment>
      <MetaData title="Contact" />
      <h2 className="contactHeading">Get in touch with us!</h2>
      <div className="contactParagraph">
        <p>
          We greatly value our customer relations. Please contact us using any
          of the methods below and we will readily assist you with your problem.
          For business related concerns, mail us at: tenetwatches@gmail.com
        </p>
        <div className="contactDetails">
          <p>EMAIL: tenethelp@gmail.com</p>
          <p>TELEPHONE: +1 412-278-5539</p>
          <p>LOCATION: 1730 Cameo St, Hartsville,</p>
          <p> South Carolina (SC)</p>
        </div>
      </div>
      <h2 className="faqHeading">FAQs</h2>
      <div className="faqList">
        <ul>
          <li>Can I make changes to my order before it ships?</li>
          <p>
            Unfortunately, we can’t make changes or cancel an order after it’s
            been submitted. An item may only be canceled if it is on pre-order.
            If you would like to cancel a pre-ordered item, shoot an email to
            tenethelp@gmail.com with your order number and we'll handle that for
            you.
          </p>
          <li>Why isn't my payment going through?</li>
          <p>
            Please double check to ensure you're using the proper billing zip
            code associated with the credit card. Additionally, in order to pay
            with a credit card, your order must be above 200 INR.
          </p>
          <li>How long will it take for my order to arrive?</li>
          <p>
            Currently, orders can take 1-4 business days to process before
            shipping. From there, shipping times are dependent upon location.
            Check out our shipping page for more information on when to expect
            your package.
          </p>
          <li>What is your return/exchange policy?</li>
          <p>
            All products sold on Tenet are guaranteed for 30 days after purchase
            date. If any issues arise during that time, most items can be
            returned for a refund or exchange.
          </p>
          <li>When will I receive my refund?</li>
          <p>
            If returning by mail, you should receive your refund upon first
            carrier scan. Please note, it can take 3-5 business days for a
            refund to credit back to your original form of payment.
          </p>
          <li>How can I get a discount code?</li>
          <p>
            If you're a first-time shopper and haven't signed up for our email
            or text lists yet, you just might get a little something special
            once you do!
          </p>
        </ul>
      </div>
    </Fragment>
  );
};

export default About;
