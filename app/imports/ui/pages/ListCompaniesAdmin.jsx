import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Companies } from '../../api/company/Companies';
import CompanyProfileAdmin from '../components/CompanyProfileAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListCompaniesAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Companies (Admin)</Header>
        <Card.Group>
          {this.props.companies.map((companyprofile, index) => <CompanyProfileAdmin key={index} companyprofile={companyprofile} />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListCompaniesAdmin.propTypes = {
  companies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Companies.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const companies = Companies.collection.find({}).fetch();
  return {
    companies,
    ready,
  };
})(ListCompaniesAdmin);
