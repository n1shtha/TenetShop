import React from "react";
import { Fragment } from "react";
import "./About.css";
import MetaData from "../layout/MetaData";

const About = () => {
  return (
    <Fragment>
      <MetaData title="About us" />
      <h2 className="aboutHeading">Who are we?</h2>
      <div className="aboutParagraph">
        <p>
          Tenet has over 57 stores in India across 27 cities offering more than
          40 international watch brands in swiss, premium, high fashion and
          fashion segment.
        </p>
        <p>
          At the Tenet Watch Store there's nothing more we'd like to do, than
          bring watches and watch-lovers together. Our stellar collection, is a
          fine showcase of masterpieces that exhibit craftsmanship, designs that
          represent timeless tradition, and embrace innovation. A parade
          featuring over 30 top international labels that inspires people to add
          to their existing collection. As India's leading retailer of
          international watch brands, Tenet Watch Store takes a personal
          interest in those who wear and cherish quality timepieces, those who
          know it's the only way to tell time. And, if you're wondering what
          else sets us apart, it's our signature trio of perks one enjoys every
          time he/she walks in, and chooses a watch from our vast collection.
        </p>
        <p>
          Every order placed on our website is fulfilled directly from one of
          our 76 stores across India. You can always count on us for free 1-2
          day delivery, hassle-free returns, great prices, and awesome, extra
          speedy customer service. If you are in need of any assistance post
          your purchase, you can walk in to one of our stores and our helpful
          staff is always available to answer any questions you may have or help
          in any way that is required. We are at your service!
        </p>
      </div>
    </Fragment>
  );
};

export default About;
