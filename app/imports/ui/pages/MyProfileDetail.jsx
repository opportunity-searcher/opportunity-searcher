import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Image, Loader, Header, Button, Redirect } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';

/** Renders the first profile associated with the current user. */
class MyProfileDetail extends React.Component {
  render() {
    if (this.props.ready) {
      return this.props.profile ? this.renderPage() : <Redirect to='/addinit'/>;
    }

    return <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} >
        <Grid.Column style={{ maxWidth: 650 }}>
          <Header as="h1" textAlign="center">{this.props.profile.name}</Header>
          <Image
            floated='right'
            size='medium'
            src={this.props.profile.image}
            style={{ margin: '2em -4em 2em 2em' }} />

          <Header as="h3" textAlign="center">Address</Header>
          <p>{this.props.profile.location}</p>
          <Header as="h3" textAlign="center">About me</Header>
          <p>{this.props.profile.description}</p>
          <Header as="h3" textAlign="center">My Skills</Header>
          <p>{this.props.profile.skills}</p>
          <Button as={Link} to={`/edit/${this.props.profile._id}`}>Edit</Button>
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
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const profile = Profiles.collection.find({ owner: Meteor.user() ? Meteor.user().username : '' }).fetch()[0];

  return {
    profile,
    ready,
  };
})(MyProfileDetail);

// Require a document to be passed to this component.
MyProfileDetail.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.Object,
  }),
  profile: PropTypes.array.isRequired,
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
