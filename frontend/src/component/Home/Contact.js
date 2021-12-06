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
          <li>Irure aute labore quis eiusmod voluptate consectetur?</li>
          <p>
            Adipisicing adipisicing minim officia officia elit nisi proident
            sint. Commodo incididunt consectetur exercitation nisi mollit dolor
            amet adipisicing. Sit nostrud ut nostrud pariatur sint irure aliqua
            laborum.
          </p>
          <li>Nulla id commodo ea labore qui Lorem?</li>
          <p>
            Aliqua minim laboris enim qui qui eu cupidatat pariatur. Mollit enim
            laborum fugiat labore sint. Id nisi occaecat excepteur eiusmod
            nostrud aliquip.
          </p>
          <li>Aliqua ipsum Lorem commodo velit officia?</li>
          <p>
            Excepteur ea sint occaecat cillum id exercitation irure et. Aute
            occaecat nostrud id ut. Ad sint cillum adipisicing magna aliqua
            aliquip non.
          </p>
          <li>
            Sint officia et exercitation amet duis pariatur non ullamco ut?
          </li>
          <p>
            Enim est ipsum aliqua ad cillum dolore irure consectetur
            adipisicing. Nisi laborum eu commodo minim culpa exercitation minim
            excepteur. Duis eu sint laborum tempor esse ullamco fugiat et
            labore.
          </p>
          <li>
            Dolor ex ut consectetur cillum irure magna anim fugiat tempor?
          </li>
          <p>
            Sit ipsum nostrud sunt sint. Sit nostrud ut nisi magna. Ullamco
            incididunt veniam elit in eiusmod cillum aliqua esse.
          </p>
          <li>Cupidatat amet do ut magna proident do amet dolor.</li>
          <p>
            Do tempor eiusmod velit dolor nulla dolore nulla ipsum enim. Tempor
            minim dolore nisi adipisicing eu. Irure laboris laboris do aliqua ut
            elit labore eiusmod.
          </p>
        </ul>
      </div>
    </Fragment>
  );
};

export default About;
