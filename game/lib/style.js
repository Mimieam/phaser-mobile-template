var style;

// this is a wrapped function
(function () {

  // the variables declared here will not be scoped anywhere and will only be accessible in this wrapped function
  var defaultColor = "white",
    highlightColor = "#FEFFD5";

  style = {
    navitem: {
      base: {
        font: '30pt Sniglet',
        align: 'left',
        srokeThickness: 4
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
        fill: highlightColor,
        stroke: 'rgba(200,200,200,0.5)'
      }
    },
  };

  fa_style = {
    navitem: {
      base: {
        font: '40px FontAwesome',
        align: 'left',
        srokeThickness: 4
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
        fill: highlightColor,
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
        fill: highlightColor,
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
