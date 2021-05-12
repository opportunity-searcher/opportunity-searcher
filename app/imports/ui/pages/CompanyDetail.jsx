import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Button, Image, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Companies } from '../../api/company/Companies';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CompanyDetail extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const userId = this.props.location.pathname.replace('/companydetail/', '');
    const profile = this.props.companies.find(item => item._id === userId);

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} id="company-detail-page">
        <Grid.Column style={{ maxWidth: 650 }}>
          <Header as="h1" textAlign="center">{profile.name}</Header>
          <Image
            floated='right'
            size='medium'
            src={profile.image}
            style={{ margin: '2em -4em 2em 2em' }} />

          <Header as="h3" textAlign="center">Address</Header>
          <p>{profile.location}</p>
          <Header as="h3" textAlign="center">About me</Header>
          <p>{profile.description}</p>
          <Header as="h3" textAlign="center">My Skills</Header>
          <p>{profile.skills}</p>
          <Button>Contact Me</Button>
        </Grid.Column>
      </Grid>

    );
  }

}

/*  */

// Require an array of Stuff documents in the props.
/* ProfileDetail.propTypes = {
  profile: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
}; */

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Companies.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const companies = Companies.collection.find({}).fetch();
  return {
    companies,
    ready,
  };
})(CompanyDetail);

// Require a document to be passed to this component.
CompanyDetail.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.Object,
  }),
  companies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  /* PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    skills: PropTypes.string,
  }).isRequired, */
};

// Wrap this component in withRouter since we use the <Link> React Router element.
// export default withRouter(ProfileDetail);
