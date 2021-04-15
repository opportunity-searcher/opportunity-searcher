import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import UserProfile from '../components/UserProfile';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListProfiles extends React.Component {

  users = [
    {
      name: 'Matthew Ito', address: 'Los Angeles', image: 'https://avatars.githubusercontent.com/u/71101234?v=4',
      description: 'UH Manoa student studying ICS and Japanese.',
    },
    {
      name: 'Kegan Flagg', address: 'Honolulu', image: 'https://avatars.githubusercontent.com/u/43965971?v=4',
      description: 'UH Manoa student studying ICS and Japanese.',
    },
    {
      name: 'Jay Paul Luben', address: 'Honolulu', image: 'https://avatars.githubusercontent.com/u/49574660?v=4',
      description: 'UH Manoa student studying ICS and Japanese.',
    },
  ];

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Profiles</Header>
        <Card.Group>
          {this.users.map((userprofile, index) => <UserProfile key={index} userprofile={userprofile} />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListProfiles.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(ListProfiles);
