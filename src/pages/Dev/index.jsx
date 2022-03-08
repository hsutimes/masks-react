// ES6 Imports
import React from 'react';
import * as Scroll from 'react-scroll';
// import {
//   Link,
//   Button,
//   Element,
//   Events,
//   animateScroll as scroll,
//   scrollSpy,
//   scroller,
// } from 'react-scroll';

// Or Access Link,Element,etc as follows
const Link = Scroll.Link;
const Button = Scroll.Button;
const Element = Scroll.Element;
const Events = Scroll.Events;
const scroll = Scroll.animateScroll;
const scrollSpy = Scroll.scrollSpy;

// ES5
// const React = require('react');
// const Scroll = require('react-scroll');

// const Link = Scroll.Link;
// const Button = Scroll.Button;
// const Element = Scroll.Element;
// const Events = Scroll.Events;
// const scroll = Scroll.animateScroll;
// const scrollSpy = Scroll.scrollSpy;

class Section extends React.Component {
  componentDidMount() {
    Events.scrollEvent.register('begin', function (to, element) {
      console.log('begin', arguments);
    });

    Events.scrollEvent.register('end', function (to, element) {
      console.log('end', arguments);
    });

    scrollSpy.update();
  }
  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }
  scrollToTop() {
    scroll.scrollToTop();
  }
  scrollToBottom() {
    scroll.scrollToBottom();
  }
  scrollTo() {
    scroll.scrollTo(100);
  }
  scrollMore() {
    scroll.scrollMore(100);
  }
  handleSetActive(to) {
    console.log(to);
  }
  render() {
    return (
      <div>
        <Link
          activeClass="active"
          to="test1"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          onSetActive={this.handleSetActive}
        >
          Test 1
        </Link>
        <Link
          activeClass="active"
          to="test1"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          delay={1000}
        >
          Test 2 (delay)
        </Link>
        <Link
          className="test6"
          to="anchor"
          spy={true}
          smooth={true}
          duration={500}
        >
          Test 6 (anchor)
        </Link>
        {/* <Button
          activeClass="active"
          className="btn"
          type="submit"
          value="Test 2"
          to="test2"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
        >
          Test 2
        </Button> */}

        <Element name="test1" className="element">
          test 1
        </Element>

        <Element name="test2" className="element">
          test 2
        </Element>

        <div id="anchor" className="element">
          test 6 (anchor)
        </div>

        <Link to="firstInsideContainer" containerId="containerElement">
          Go to first element inside container
        </Link>

        <Link to="secondInsideContainer" containerId="containerElement">
          Go to second element inside container
        </Link>
        <div className="element" id="containerElement">
          <Element name="firstInsideContainer">
            first element inside container
          </Element>

          <Element name="secondInsideContainer">
            second element inside container
          </Element>
        </div>

        <a onClick={this.scrollToTop}>To the top!</a>
        <br />
        <a onClick={this.scrollToBottom}>To the bottom!</a>
        <br />
        <a onClick={this.scrollTo}>Scroll to 100px from the top</a>
        <br />
        <a onClick={this.scrollMore}>
          Scroll 100px more from the current position!
        </a>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
        <p>------------------------------</p>
      </div>
    );
  }
}

export default Section;
