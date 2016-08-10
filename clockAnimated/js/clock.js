"use strict";
/**
 * @constructor Clock
 */

class Clock {
  /**
   * @constructor Clock onstructor
   * @param {Object} Set up the clock with options given
   */
  constructor (options) {
    this.template = options.template;
  }

  /**
   * @method
   * Shows current time every second in console
   */
  render() {
    let date = new Date();

    let hours = this.formatNumber( date.getHours() );
    let min = this.formatNumber( date.getMinutes() ) ;
    let sec = this.formatNumber( Math.floor(date.getSeconds()) );

    let output = this.template.replace('h', hours).replace('m', min).replace('s', sec);

    console.log(output);
  }

  /**
   * @method start
   * Clock start method
   * Calls render method every second and sets up the _timerID
   */
  start() {
    this.render();
    this._timerID = setInterval(this.render.bind(this), 1000);
  }

  /**
   * @method stop
   * Stops the clock using private _timerID property
   */
  stop() {
    clearInterval(this._timerID);
  }

  /**
   * @method formatNumber
   * Takes a number and returns it as a string in clock format
   * @param {number} num - number to format
   */
  formatNumber(num) {
    return num < 10 ? num = '0' + num : num;
  }
}


/**
 * VisualClock extends Clock class and draws clock to canvas on the page
 */
class VisualClock extends Clock {
  /**
   * @constructor VisualClock
   * @param {Object} options - contains data to set up the clock
   */
  constructor(options) {
    super(options);

    this.timezone = options.timezone || new Date().getUTCHours();

    // set up context for the clock
    this.context = options.context.getContext("2d");

    // clock colors
    this.colorScheme = options.colorScheme;

    // different lines widths
    this.lines = options.lines;
    this.lines.radius = this.context.canvas.width * 0.45;

    // center position
    this.center = {
      x: this.context.canvas.width / 2,
      y: this.context.canvas.height / 2
    }

    console.log(`Clock center is at x = ${this.center.x} and y = ${this.center.y}`);
    console.log(`Radius is ${this.lines.radius}`);
  }

  /**
   * @method render
   * Overrides parent render method
   * Draws clock to document
   */
  render() {
    console.time("render");
    // save parameters in closure
    let context = this.context,
      colorScheme = this.colorScheme,
      lines = this.lines,
      center = this.center,
      date = new Date();
    date.setUTCHours(this.timezone);

    function clearContext(){
      context.clearRect(0, 0, context.width, context.height);
    }

    function drawClockShape() {


      // draw outer circle
      context.beginPath();
      context.arc(center.x, center.y,
         lines.radius,
         0, 2 * Math.PI, false);
      context.fillStyle = colorScheme.color2;
      context.fill();
      context.lineWidth = lines.outerCircleWidth;
      context.strokeStyle = colorScheme.color1;
      context.stroke();

      // draw inner circle
      context.beginPath();
      context.arc(center.x, center.y,
         lines.radius / 40,
         0, 2 * Math.PI, false);
      context.fillStyle = colorScheme.color1;
      context.fill();
      context.lineWidth = lines.outerCircleWidth;
      context.strokeStyle = colorScheme.color1;
      context.stroke();

      // draw hour marks shapes
      for (let i = 0; i < 12; i++) {
        context.beginPath();
        context.arc(center.x + lines.radius * Math.sin(2 * Math.PI * i / 12),
           center.y + lines.radius * Math.cos(2 * Math.PI * i / 12),
           lines.outerHourMarkRadius,
           0, 2 * Math.PI, false);
        context.fillStyle = colorScheme.color2;
        context.fill();
        context.lineWidth = lines.hourMarksWidth;
        context.strokeStyle = colorScheme.color1;
        context.stroke();
      }
    }

    function drawClockArrow(type, value, color) {
      // step represents how many often arrow changes it's position
      // hour arrow moves
      let step = (type === "hour") ? 12 : 60,
        correction = Math.PI / 2,
        angle, width, length;

        color = color || colorScheme.color1;

      value = value % step;
      angle =  2 * Math.PI * value / step - correction;

      // arrow length width and length depend on it's type
      if (type === "hour") {
        width = lines.hourLineWidth;
        length = lines.radius * 0.5; // = lines.hourLineLength
      } else if ( type === "minute") {
        width = lines.minuteLineWidth;
        length = lines.radius * 0.75;
      } else {
        width = lines.secondsLineWidth;
        length = lines.radius * 0.9;
      }

      context.beginPath();
      context.lineWidth = width;
      // line starts at the center of the circle
      context.moveTo(center.x, center.y);
      // where line ends depends on the current angle and it's length
      context.lineTo(center.x + length * Math.cos( angle ),
        center.y + length * Math.sin( angle ));
      context.closePath();
      context.strokeStyle = color;
      context.stroke();
    }

    clearContext();
    drawClockShape();
    drawClockArrow("hour", date.getHours());
    drawClockArrow("minute", date.getMinutes());
    drawClockArrow("second", date.getSeconds(), colorScheme.color3);

    console.timeEnd("render");

    // call parent class to print time to console
    Clock.prototype.render.apply(this);
  }
}


let colorSchemes = [
  {
    color1: "#565656",
    color2: "#d7cec7",
    color3: "#c09f80"//"#76323f"
  },
  {
    color1: "#009DFF",
    color2: "#ECECEA",
    color3: "#00A000"
  },
  {
    color1: "#191919",
    color2: "#DFE2DB",
    color3: "#FFF056"
  },
  {
    color1: "#005A31",
    color2: "#CBE32D",
    color3: "#A8CD1B",
  }
]

// all clock parameters come frome this object
let options1 = {
  template: 'h:m:s',
  // timezone: 1  ,
  context: document.getElementsByClassName("clock")[0],
  colorScheme: colorSchemes[1],
  lines: {
    outerCircleWidth: 20,
    outerHourMarkRadius: 4,
    secondsLineWidth: 3,
    minuteLineWidth: 6,
    hourMarksWidth: 3,
    hourLineLength: 0.6,
    hourLineWidth: 12
  }
};

let options2 = {
  template: 'h:m:s',
  timezone: -1,
  context: document.getElementsByClassName("clock")[1],
  colorScheme: colorSchemes[2],
  lines: {
    outerCircleWidth: 20,
    outerHourMarkRadius: 9,
    secondsLineWidth: 3,
    minuteLineWidth: 6,
    hourMarksWidth: 3,
    hourLineLength: 0.6,
    hourLineWidth: 12
  }
};

let options3 = {
  template: 'h:m:s',
  timezone: +2,
  context: document.getElementsByClassName("clock")[2],
  colorScheme: colorSchemes[3],
  lines: {
    outerCircleWidth: 30,
    outerHourMarkRadius: 12,
    secondsLineWidth: 2,
    minuteLineWidth: 6,
    hourMarksWidth: 3,
    hourLineLength: 0.6,
    hourLineWidth: 12
  }
};

let clock1 = new VisualClock(options1),
  clock2 = new VisualClock(options2),
  clock3 = new VisualClock(options3);

clock1.start();
clock2.start();
clock3.start();
