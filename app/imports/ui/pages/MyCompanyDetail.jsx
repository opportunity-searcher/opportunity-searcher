import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Image, Loader, Header, Button, Redirect } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Companies } from '../../api/company/Companies';

/** Renders the first profile associated with the current user. */
class MyCompanyDetail extends React.Component {
  render() {
    if (this.props.ready) {
      return this.props.company ? this.renderPage() : <Redirect to='/addinit'/>;
    }

    return <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} >
        <Grid.Column style={{ maxWidth: 650 }}>
          <Header as="h1" textAlign="center">{this.props.company.name}</Header>
          <Image
            floated='right'
            size='medium'
            src={this.props.company.image}
            style={{ margin: '2em -4em 2em 2em' }} />

          <Header as="h3" textAlign="center">Address</Header>
          <p>{this.props.company.location}</p>
          <Header as="h3" textAlign="center">About me</Header>
          <p>{this.props.company.description}</p>
          <Header as="h3" textAlign="center">My Skills</Header>
          <p>{this.props.company.skills}</p>
          <Button as={Link} to={`/edit2/${this.props.company._id}`}>Edit</Button>
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
  const company = Companies.collection.find({ owner: Meteor.user() ? Meteor.user().username : '' }).fetch()[0];
  return {
    company,
    ready,
  };
})(MyCompanyDetail);

// Require a document to be passed to this component.
MyCompanyDetail.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.Object,
  }),
  company: PropTypes.array.isRequired,
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
