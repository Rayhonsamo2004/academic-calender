import React from "react";
import '../styles/Home1.css';
const TimelineItem = ({ year, backgroundImage, title, description }) => (
  <div className="tl-item">
    <div className="tl-bg" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
    <div className="tl-year">
      <p className="f2 heading--sanSerif">{year}</p>
    </div>
    <div className="tl-content">
      <h1 className="f3 text--accent ttu">{title}</h1>
      <p>{description}</p>
    </div>
  </div>
);

const Timeline1 = () => (
  <section id="timeline">
    <TimelineItem
      year="2011"
      backgroundImage="https://placeimg.com/801/801/nature"
      title="Lorem ipsum dolor sit"
      description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit."
    />
    <TimelineItem
      year="2013"
      backgroundImage="https://placeimg.com/802/802/nature"
      title="Vestibulum laoreet lorem"
      description="Suspendisse potenti. Sed sollicitudin eros lorem, eget accumsan risus dictum id. Maecenas dignissim ipsum vel mi rutrum egestas. Donec mauris nibh, facilisis ut hendrerit vel, fringilla sed felis. Morbi sed nisl et arcu."
    />
    <TimelineItem
      year="2014"
      backgroundImage="https://placeimg.com/803/803/nature"
      title="Phasellus mauris elit"
      description="Mauris cursus magna at libero lobortis tempor. Suspendisse potenti. Aliquam interdum vulputate neque sit amet varius. Maecenas ac pulvinar nisi. Fusce vitae nunc ultrices, tristique dolor at, porttitor dolor. Etiam id cursus arcu, in dapibus nibh. Pellentesque non porta leo. Nulla eros odio, egestas quis efficitur vel, pretium sed."
    />
    <TimelineItem
      year="2016"
      backgroundImage="https://placeimg.com/800/800/nature"
      title="Mauris vitae nunc elem"
      description="Suspendisse ac mi at dolor sodales faucibus. Nunc sagittis ornare purus non euismod. Donec vestibulum efficitur tortor, eget efficitur enim facilisis consequat. Vivamus laoreet laoreet elit. Ut ut varius metus, bibendum imperdiet ex. Curabitur diam quam, blandit at risus nec, pulvinar porttitor lorem. Pellentesque dolor elit."
    />
  </section>
);

export default Timeline1;
