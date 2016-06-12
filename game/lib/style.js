var style;
var cs = {}; // for color scheme - humm could also good with css... but oh well

// this is a wrapped function
(function () {

  // the variables declared here will not be scoped anywhere and will only be accessible in this wrapped function




  var defaultColor = "white",
    highlightColor = "#FEFFD5";
  /* Color Scheme*/
  cs.heading_color = "#E6E2AF";
  cs.base_color = "#FFB03B";
  cs.background_color = "#31152B";

  cs.text_color = "#F9E4AD";
  cs.accent_color = "#CC4452";
  cs.accent_hover_color = "#F9E4AD";

  cs.fa_text_color = cs.accent_color;

  style = {
    title: {
      default: {
        font: '60pt Modak',
        fill: cs.heading_color,
        align: 'center'
      },
    },
    navitem: {
      base: {
        font: '30pt Sniglet',
        align: 'left',
        srokeThickness: 4
      },
      default: {
        fill: cs.text_color,
        stroke: 'rgba(0,0,0,0)'
      },
      inverse: {
        fill: cs.accent_color,
        stroke: cs.accent_color
      },
      hover: {
        fill: cs.accent_color,
        stroke: 'rgba(200,200,200,0.5)'
      }
    },
  };

  fa_style = {
    btn:{
      pause:{
        fill : cs.accent_color,
        font : '40px FontAwesome',
        backgroundColor: 'rgba(222,0,0,0.25)'
      },
    },
    navitem: {
      base: {
        font: '40px FontAwesome',
        align: 'left',
        srokeThickness: 4
      },
      default: {
        fill: cs.fa_text_color,
        stroke: 'rgba(0,0,0,0)'
      },
      inverse: {
        fill: cs.accent_hover_color,
        stroke: cs.accent_color
      },
      hover: {
        fill: cs.accent_color,
        stroke: 'rgba(200,200,200,0.5)'
      },
      randomCustom:{
        font: "60px FontAwesome",
        align: 'right',
        srokeThickness: 10,
        fill: '#AFFFF8',
        stroke: "#57B2AB",
        "-ms-transform": 'translate(50px,100px)', /* IE 9 */
        "-webkit-transform": 'translate(50px,100px)', /* Safari */
        "transform": 'translate(50px,100px)',
      }
    },
    icon:{
      base:{
        font: '40px FontAwesome',
        align: 'left',
      },
      default: {
        fill: defaultColor,
        stroke: 'rgba(0,0,0,0)'
      },
      inverse: {
        fill: 'black',
        stroke: 'black'
      },
      hover: {
        fill: cs.accent_color,
        stroke: 'rgba(200,200,200,0.5)'
      },

    }
  };
  fa_style.overrideOnly = function (_styleObj, newStyle) {
    Object.assign(_styleObj, newStyle)
  }


  for (var key in style.navitem) {
    if (key !== "base") {
      Object.assign(style.navitem[key], style.navitem.base)
    }
  }

  for (var key in fa_style.navitem) {
    if (key !== "base") {
      Object.assign(fa_style.navitem[key], fa_style.navitem.base)
    }
  }

})();

// the trailing () triggers the function call immediately
