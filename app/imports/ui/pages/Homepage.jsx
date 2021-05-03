import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Grid, Header, Icon, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/Profiles';
import UserProfile from '../components/UserProfile';
import { Companies } from '../../api/company/Companies';
import CompanyProfile from '../components/CompanyProfile';

/** A simple static component to render some text for the landing page. */
class Homepage extends React.Component {
  render() {
    return (
      <div className='opportunities-landing-background' id="home-page">
        <Header size='huge' textAlign='center' color='black'>Opportunity Searcher</Header>

        <Grid id='home-page' verticalAlign='middle' textAlign='center' container columns={2}>

          <Grid.Column textAlign='center' >
            <Icon size='huge' name='users' color='black'/>
            <Header>
              <Button as={Link} to='/list'className="ui inverted secondary button">Browse Members</Button>
            </Header>
            <Header as='h3' color='black'>Look at the members currently signed up on the site</Header>
          </Grid.Column>

          <Grid.Column textAlign='center' >
            <Icon size='huge' name='file alternate' color='black'/>
            <Header>
              <Button as={Link} to='/list2' className="ui inverted secondary button">Browse Companies</Button>
            </Header>
            <Header as='h3' color='black'>Take a peek at companies who have provided their information on the site</Header>
          </Grid.Column>
        </Grid>

        <Grid id='home-page' verticalAlign='middle' textAlign='center' container columns={2}>
          <Grid.Column>
            <Container>
              <Header as="h2" textAlign="center">Member of the Day!</Header>
              <div class="ui centered card">
              {_.sample(this.props.profiles.map((userprofile, index) => <UserProfile key={index} userprofile={userprofile} />))}
              </div>
            </Container>
          </Grid.Column>

          <Grid.Column>
            <Container>
              <Header as="h2" textAlign="center">Company of the Day!</Header>
              <div class="ui centered card">
              {_.sample(this.props.companies.map((companyprofile, index) => <CompanyProfile key={index} companyprofile={companyprofile} />))}
              </div>
            </Container>
          </Grid.Column>

        </Grid>

      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
Homepage.propTypes = {
  profiles: PropTypes.array.isRequired,
  companies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Profile and Company documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const subscription2 = Meteor.subscribe(Companies.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Profile and Company documents
  const profiles = (Profiles.collection.find({}).fetch());
  const companies = (Companies.collection.find({}).fetch());
  return {
    profiles,
    companies,
    ready,
  };
})(Homepage);
