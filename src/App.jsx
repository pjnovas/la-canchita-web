
import { RouteHandler } from 'react-router';
import { AppCanvas, Styles } from 'material-ui';
import Theme from './Theme';

let ThemeManager = new Styles.ThemeManager();

export default class App extends React.Component {

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  componentWillMount() {
    ThemeManager.setTheme(Theme);

    document.body.style.backgroundColor =
      ThemeManager.getCurrentTheme().palette.canvasColor;
  }

  render() {
    return (
      <AppCanvas>
        <RouteHandler />
      </AppCanvas>
    );
  }

};

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};
