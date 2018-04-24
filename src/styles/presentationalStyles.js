import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const dashboardStyles = {
  mainStyles: {
    backgroundColor: '#484848'
  }
};

export const homeStyles = {};

export const landingStyles = {};

export const myTheme = getMuiTheme({
  palette: {
    primary1Color: '#424242',
    primary2Color: '#616161',
    accent1Color: '#ff6e40',
    accent2Color: '#ff3d00',
    accent3Color: '#ff9e80',
    canvasColor: '#424242',
    alternateTextColor: '#ffffff',
    secondaryTextColor: '#bdbdbd',
    textColor: '#9e9e9e',
    disabledColor: '#ffffff'
  },
  appBar: {
    textColor: 'rgba(255, 255, 255, 0.87)'
  },
  card: {
    subtitleColor: 'rgba(255, 255, 255, 0.54)'
  },
  textField: {
    hintColor: '#e0e0e0',
    disabledTextColor: '#ff5722',
    focusColor: '#ff5722',
    borderColor: '#e0e0e0',
    floatingLabelColor: '#ff8a65'
  },
  timePicker: {
    color: '#ff5722',
    accentColor: '#d84315',
    clockColor: '#ff5722',
    textColor: 'rgba(255, 255, 255, 0.87)',
    selectTextColor: 'rgba(255, 255, 255, 0.54)'
  },
  tabs: {
    backgroundColor: '#616161',
    textColor: 'rgba(255, 255, 255, 0.87)',
    selectedTextColor: '#ff5722'
  },
  stepper: {
    backgroundColor: '#616161',
    connectorLineColor: '#ff5722',
    disabledTextColor: 'rgba(255, 255, 255, 0.54)',
    textColor: 'rgba(255, 255, 255, 0.87)',
    hoveredIconColor: '#ff5722',
    iconColor: '#bf360c'
  },
  flatButton: {
    textColor: '#ff5722',
    primaryTextColor: '#ffffff'
  },
  ripple: {
    color: '#ff5722'
  },
  snackbar: {
    backgroundColor: '#ff6e40',
    textColor: 'rgba(255, 255, 255, 0.87)'
  },
  toggle: {
    thumbOnColor: '#d84315',
    thumbOffColor: '#9e9e9e',
    trackRequiredColor: 'rgba(158, 158, 158, 0.5)',
    trackOnColor: 'rgba(158, 158, 158, 0.5)'
  },
  floatingActionButton: {
    secondaryColor: '#ff6e40'
  },
  datePicker: {
    color: '#9e9e9e',
    calendarTextColor: 'rgba(251, 233, 231, 0.45)',
    selectColor: '#ff5722',
    selectTextColor: '#f5f5f5',
    calendarYearBackgroundColor: '#bdbdbd',
    textColor: '#fafafa'
  }
});
