import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListProfiles from '../pages/ListProfiles';
import ListCompanies from '../pages/ListCompanies';
import ListProfilesAdmin from '../pages/ListProfilesAdmin';
import ListCompaniesAdmin from '../pages/ListCompaniesAdmin';
import AddProfile from '../pages/AddProfile';
import AddInitial from '../pages/AddInitial';
import EditProfile from '../pages/EditProfile';
import EditCompany from '../pages/EditCompany';
import AddCompany from '../pages/AddCompany';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Homepage from '../pages/Homepage';
import SearchSkills from '../pages/SearchSkills';
import SearchProfile from '../pages/SearchProfile';
import SearchCompany from '../pages/SearchCompany';
import MyProfileDetail from '../pages/MyProfileDetail';
import ProfileDetail from '../pages/ProfileDetail';
import CompanyDetail from '../pages/CompanyDetail';
import MyCompanyDetail from '../pages/MyCompanyDetail';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <ProtectedRoute path="/home" component={Homepage}/>
            <ProtectedRoute path="/detail" component={ProfileDetail}/>
            <ProtectedRoute path="/mydetail" component={MyProfileDetail}/>
            <ProtectedRoute path="/companydetail" component={CompanyDetail}/>
            <ProtectedRoute path="/mycompany" component={MyCompanyDetail}/>
            <ProtectedRoute path="/add" component={AddProfile}/>
            <ProtectedRoute path="/add2" component={AddCompany}/>
            <ProtectedRoute path="/addinit" component={AddInitial}/>
            <ProtectedRoute path="/edit/:_id" component={EditProfile}/>
            <ProtectedRoute path="/edit2/:_id" component={EditCompany}/>
            <ProtectedRoute path="/list" component={ListProfiles}/>
            <ProtectedRoute path="/list2" component={ListCompanies}/>
            <AdminProtectedRoute path="/admin" component={ListProfilesAdmin}/>
            <AdminProtectedRoute path="/admin2" component={ListCompaniesAdmin}/>
            <ProtectedRoute path="/search-profile" component={SearchProfile}/>
            <ProtectedRoute path="/search-company" component={SearchCompany}/>
            <ProtectedRoute path="/search-skills" component={SearchSkills}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
