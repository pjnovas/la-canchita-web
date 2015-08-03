
import _ from "lodash";
import { Styles, Utils } from "material-ui";

let Colors = Styles.Colors;
//let Spacing = Styles.Spacing; //TODO: use this one to merge so it wont loose new props
let ColorManipulator = Utils.ColorManipulator;

/**
 *  Using Light Theme as base: will default with it on properties not present here
 *
 *  https://github.com/callemall/material-ui/blob/master/src/styles/themes/light-theme.js
 *  https://github.com/callemall/material-ui/blob/master/src/styles/theme-manager.js
 *  Colors: http://material-ui.com/#/customization/colors
 */

Colors.twitter = "#00aced";
Colors.facebook = "#3b5998";
Colors.google = "#dd4b39";

let spacing = {
  iconSize: 24,

  desktopGutter: 24,
  desktopGutterMore: 32,
  desktopGutterLess: 16,
  desktopGutterMini: 8,
  desktopKeylineIncrement: 64,
  desktopDropDownMenuItemHeight: 32,
  desktopDropDownMenuFontSize: 15,
  desktopLeftNavMenuItemHeight: 48,
  desktopSubheaderHeight: 48,
  desktopToolbarHeight: 56,
};

let palette = {
  primary1Color: Colors.green500,
  primary2Color: Colors.green700,
  primary3Color: Colors.green100,
  accent1Color: Colors.deepPurpleA200,
  accent2Color: Colors.deepPurpleA400,
  accent3Color: Colors.deepPurpleA100,
  textColor: Colors.darkBlack,
  canvasColor: Colors.grey50,
  borderColor: Colors.grey300,
  disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
};

let components = {
  appBar: {
    color: palette.primary1Color,
    textColor: Colors.darkWhite,
    height: spacing.desktopKeylineIncrement,
  },
  avatar: {
    borderColor: "rgba(0, 0, 0, 0.08)",
  },
  button: {
    height: 36,
    minWidth: 88,
    iconButtonSize: spacing.iconSize * 2,
  },
  checkbox: {
    boxColor: palette.textColor,
    checkedColor: palette.primary1Color,
    requiredColor: palette.primary1Color,
    disabledColor: palette.disabledColor,
    labelColor: palette.textColor,
    labelDisabledColor: palette.disabledColor,
  },
  datePicker: {
    color: palette.primary1Color,
    textColor: Colors.white,
    calendarTextColor: palette.textColor,
    selectColor: palette.primary2Color,
    selectTextColor: Colors.white,
  },
  dropDownMenu: {
    accentColor: palette.borderColor,
  },
  flatButton: {
    color: palette.canvasColor,
    textColor: palette.textColor,
    primaryTextColor: palette.accent1Color,
    secondaryTextColor: palette.primary1Color,
  },
  floatingActionButton: {
    buttonSize: 56,
    miniSize: 40,
    color: palette.accent1Color,
    iconColor: Colors.white,
    secondaryColor: palette.primary1Color,
    secondaryIconColor: Colors.white,
  },
  leftNav: {
    width: spacing.desktopKeylineIncrement * 4,
    color: Colors.white,
  },
  listItem: {
    nestedLevelDepth: 18,
  },
  menu: {
    backgroundColor: Colors.white,
    containerBackgroundColor: Colors.white,
  },
  menuItem: {
    dataHeight: 32,
    height: 48,
    hoverColor: "rgba(0, 0, 0, .035)",
    padding: spacing.desktopGutter,
    selectedTextColor: palette.accent1Color,
  },
  menuSubheader: {
    padding: spacing.desktopGutter,
    borderColor: palette.borderColor,
    textColor: palette.primary1Color,
  },
  paper: {
    backgroundColor: Colors.white,
  },
  radioButton: {
    borderColor:  palette.textColor,
    backgroundColor: Colors.white,
    checkedColor: palette.primary1Color,
    requiredColor: palette.primary1Color,
    disabledColor: palette.disabledColor,
    size: 24,
    labelColor: palette.textColor,
    labelDisabledColor: palette.disabledColor,
  },
  raisedButton: {
    color: Colors.white,
    textColor: palette.textColor,
    primaryColor: palette.accent1Color,
    primaryTextColor: Colors.white,
    secondaryColor: palette.primary1Color,
    secondaryTextColor: Colors.white,
  },
  slider: {
    trackSize: 2,
    trackColor: Colors.minBlack,
    trackColorSelected: Colors.grey500,
    handleSize: 12,
    handleSizeDisabled: 8,
    handleColorZero: Colors.grey400,
    handleFillColor: Colors.white,
    selectionColor: palette.primary3Color,
    rippleColor: palette.primary1Color,
  },
  snackbar: {
    textColor: Colors.white,
    backgroundColor: "#323232",
    actionColor: palette.accent1Color,
  },
  table: {
    backgroundColor: Colors.white,
  },
  tableHeader: {
    borderColor: palette.borderColor,
  },
  tableHeaderColumn: {
    textColor: Colors.lightBlack,
    height: 56,
    spacing: 28,
  },
  tableFooter: {
    borderColor: palette.borderColor,
    textColor: Colors.lightBlack,
  },
  tableRow: {
    hoverColor: Colors.grey200,
    stripeColor: ColorManipulator.lighten(palette.primary1Color, 0.55),
    selectedColor: Colors.grey300,
    textColor: Colors.darkBlack,
    borderColor: palette.borderColor,
  },
  tableRowColumn: {
    height: 48,
    spacing: 28,
  },
  timePicker: {
    color: Colors.white,
    textColor: Colors.grey600,
    accentColor: palette.primary1Color,
    clockColor: Colors.black,
    selectColor: palette.primary2Color,
    selectTextColor: Colors.white,
  },
  toggle: {
    thumbOnColor: palette.primary1Color,
    thumbOffColor: Colors.grey50,
    thumbDisabledColor: Colors.grey400,
    thumbRequiredColor: palette.primary1Color,
    trackOnColor: ColorManipulator.fade(palette.primary1Color, 0.5),
    trackOffColor: Colors.minBlack,
    trackDisabledColor: Colors.faintBlack,
    labelColor: palette.textColor,
    labelDisabledColor: palette.disabledColor,
  },
  toolbar: {
    backgroundColor: ColorManipulator.darken("#eeeeee", 0.05),
    height: 56,
    titleFontSize: 20,
    iconColor: "rgba(0, 0, 0, .40)",
    separatorColor: "rgba(0, 0, 0, .175)",
    menuHoverColor: "rgba(0, 0, 0, .10)",
  },
  tabs: {
    backgroundColor: palette.primary1Color,
  },
  textField: {
    textColor: palette.textColor,
    hintColor: palette.disabledColor,
    floatingLabelColor: palette.textColor,
    disabledTextColor: palette.disabledColor,
    errorColor: Colors.red500,
    focusColor: palette.primary1Color,
    backgroundColor: "transparent",
    borderColor: palette.borderColor,
  }
};

components.flatButton.disabledTextColor = ColorManipulator.fade(components.flatButton.textColor, 0.3);
components.floatingActionButton.disabledColor = ColorManipulator.darken(Colors.white, 0.1);
components.floatingActionButton.disabledTextColor = ColorManipulator.fade(palette.textColor, 0.3);
components.raisedButton.disabledColor = ColorManipulator.darken(components.raisedButton.color, 0.1);
components.raisedButton.disabledTextColor = ColorManipulator.fade(components.raisedButton.textColor, 0.3);
components.slider.handleSizeActive = components.slider.handleSize * 2;
components.toggle.trackRequiredColor = ColorManipulator.fade(components.toggle.thumbRequiredColor, 0.5);


let Theme = {
  spacing: spacing,
  contentFontFamily: "Roboto, sans-serif",
  getPalette() {
    return palette;
  },
  getComponentThemes() {
    return components;
  },
};

// static methods

Theme.palette = palette;
Theme.components = components;

Theme.css = {
  socialButton: {
    padding: "10px 0",
    margin: "10px",
    textAlign: "center"
  },
  raisedButtonLink: {
    padding: "0 10px",
    lineHeight: "36px",
    color: components.raisedButton.color
  },
  buttonsSection: {
    padding: "20px 40px",
    margin: "20px"
  },
  noBackground: {
    backgroundColor: "transparent"
  },
  textLeft: {
    textAlign: "left"
  },
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  },
  left: {
    float: "left"
  },
  right: {
    float: "right"
  },
  actionButton: {
    position: "fixed",
    right: "25px",
    bottom: "25px"
  },
  pageContent: {
    maxWidth: "800px",
    margin: "10px auto"
  },
  form: {
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    textAlign: "left",
    padding: "20px",
    marginTop: "20px"
  },
  paragraph: {
    whiteSpace: "pre-wrap"
  }
};

Theme.pick = function(css, styles){
  return _.pick(css, styles);
};

Theme.merge = function(){
  var args = _.map(_.toArray(arguments), function(arg){
    if (_.isString(arg)){
      return Theme.css[arg] || components[arg] || palette[arg];
    }
    return arg;
  });

  args.unshift({});
  return _.assign.apply(null, args);
};

Theme.colors = Colors;

Theme.css.twitter = Theme.merge(Theme.css.socialButton, { backgroundColor: Colors.twitter });
Theme.css.facebook = Theme.merge(Theme.css.socialButton, { backgroundColor: Colors.facebook });
Theme.css.google = Theme.merge(Theme.css.socialButton, { backgroundColor: Colors.google });

export default Theme;