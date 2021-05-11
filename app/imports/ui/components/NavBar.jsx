import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  location = {
    pathname: '/mydetail',
    state: { isUser: true },
  };

  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h1'>Opportunity Searcher</Header>
        </Menu.Item>
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/home" key='home' id="home-nav">Home Page</Menu.Item>,
            <Dropdown item key="add-drop" text="Add">
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} activeClassName="active" exact to="/add" key='add' id="add-nav">Add Profile</Dropdown.Item>
                <Dropdown.Item as={NavLink} activeClassName="active" exact to="/add2" key='add2' id="add2-nav">Add Company</Dropdown.Item>
                <Dropdown.Item as={NavLink} activeClassName="active" exact to="/addinit" key='addinit' id="add2-nav">Add Initial</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>,

            <Dropdown item key="list-drop" text="List">
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} activeClassName="active" exact to="/list" key='list' id="list-nav">List Profiles</Dropdown.Item>
                <Dropdown.Item as={NavLink} activeClassName="active" exact to="/list2" key='list2' id="list2-nav">List Companies</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/search" key='search' id="search-nav">Search</Menu.Item>,

          ]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          [<Dropdown item key="admin-list-drop" text="Admin List">
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin Profiles</Dropdown.Item>
              <Dropdown.Item as={NavLink} activeClassName="active" exact to="/admin2" key='admin'>Admin Companies</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>,
          ]
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-detail" icon="file" text="My Profile" as={NavLink} exact to={this.location}/>
                <Dropdown.Item id="navbar-detail" icon="file" text="My Company" as={NavLink} exact to="/mycompany"/>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
