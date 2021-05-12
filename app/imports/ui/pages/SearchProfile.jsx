import { _ } from 'meteor/underscore';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Form, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';
import UserProfile from '../components/UserProfile';

const initialState = { isLoading: false, results: [], value: '' };

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class SearchProfile extends React.Component {
  state = initialState

  state = { name: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const { name } = this.state;
    const profiles = _.filter(Profiles.collection.find().fetch(), function (profile) { return profile.name.toUpperCase().includes(name.toUpperCase()); });

    return (
      <Container id='search-profile-page'>
        <Header as="h2" textAlign="center">Search Profiles</Header>
        <Form size='huge' textAlign="center">
          <Form.Group widths='equal'>
            <Form.Input
              placeholder='Search'
              name='name'
              value={name}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form>
        <Card.Group>
          {profiles.map((userprofile, index) => <UserProfile key={index} userprofile={userprofile} />)}
        </Card.Group>

      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
SearchProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);

  // Get the Profiles documents
  const profiles = Profiles.collection.find({}).fetch();
  return {
    profiles,
    ready: subscription.ready(),
  };
})(SearchProfile);
