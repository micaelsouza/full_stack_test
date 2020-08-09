import React from 'react';

const Hero = ({ children }) => (
  <section className="hero is-info">
    <div className="hero-body">
      <div className="container">
        <div className="level">
          <div className="level-left">
            <h1 className="title">User Details</h1>
          </div>
          <div className="level-right">
            <div className="buttons">{children}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
