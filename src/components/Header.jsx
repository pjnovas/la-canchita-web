
var ReactBootstrap = require('react-bootstrap'),
  Nav = ReactBootstrap.Nav,
  ListGroup = ReactBootstrap.ListGroup;

var ReactRouterBootstrap = require('react-router-bootstrap'),
  NavItemLink = ReactRouterBootstrap.NavItemLink,
  ButtonLink = ReactRouterBootstrap.ButtonLink,
  ListGroupItemLink = ReactRouterBootstrap.ListGroupItemLink;

var Router = require('react-router'),
  RouteHandler = Router.RouteHandler;

export default class App extends React.Component {

  render() {
    return (
      <div>
        NavItemLink<br />
        <Nav>
          <NavItemLink
            to="home"
            params={{ someparam: 'hello' }}>
            HOME!
          </NavItemLink>
        </Nav>
        <br />
        ButtonLink<br />
        <ButtonLink
          to="home"
          params={{ someparam: 'hello' }}>
          Linky!
        </ButtonLink>
        <br />
        <ListGroup>
          <ListGroupItemLink
            to="home"
            params={{ someparam: 'hello' }}>
            Linky!
          </ListGroupItemLink>
        </ListGroup>
        <RouteHandler />
      </div>
    );
  }

};