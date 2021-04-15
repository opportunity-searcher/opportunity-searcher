import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import CompanyProfile from '../components/CompanyProfile';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListCompanies extends React.Component {

  companies = [
    {
      name: 'Google', address: '1600 Amphitheatre Parkway', image: 'https://www.tripsavvy.com/thmb/oOoIxfAquiM7PBa_sDMXNdo_wtk=/2416x1600/filters:fill(auto,1)/how-to-visit-the-googleplex-google-hq-mountain-view-57e2d4515f9b586c3529ba9c.jpg',
      description: 'We are currently hiring interns and part-time software engineers.',
    },
    {
      name: 'Microsoft', address: 'Redmond, WA', image: 'https://s3-ap-southeast-2.amazonaws.com/casfawsbucket/casf/wp-content/uploads/2017/06/14130650/DuPont-Corian_Microsoft-FI-Foto-Andreas-Frisch-GSP-architekten-1080x640.jpg',
      description: 'We are currently hiring interns and full-time data analysts.',
    },
  ]

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Companies</Header>
        <Card.Group>
          {this.companies.map((companyprofile, index) => <CompanyProfile key={index} companyprofile={companyprofile} />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListCompanies.propTypes = {
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
})(ListCompanies);
