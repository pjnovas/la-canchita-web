
import Icon from './Icon';

export default class Tabs extends React.Component {

  componentDidMount() {
    $(React.findDOMNode(this.refs.tabs)).tabs();
  }

  render() {
    var css = 'tab col ';

    return (
      <ul className="tabs" ref="tabs">

        {this.props.tabs.map(tab => {
          return(
            <li key={tab.id} className={css + tab.css}>
              <a href={'#' + tab.id} className={ tab.active ? 'active' : ''}>
                <Icon name={tab.icon} />
                {tab.text}
              </a>
            </li>
          );
        })}

      </ul>
    );
  }

};

Tabs.displayName = 'Tabs';