import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Image, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileDetail extends React.Component {
  render() {
    if (this.props.ready) {
      return (this.props.location.pathname === '/mydetail') ? this.renderUser() : this.renderNotUser();
    }
    return <Loader active>Getting data</Loader>;
  }

  renderNotUser() {
    return (
      <Card>
        <Image src={this.props.location.state.profile.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.location.state.profile.name}</Card.Header>
          <Card.Meta>
            <span className='date'>{this.props.location.state.profile.location}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.location.state.profile.description}
          </Card.Description>
        </Card.Content>
      </Card>);
  }

  renderUser() {
    return (
      <Card>
        <Image src={this.props.profile.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.profile.name}</Card.Header>
          <Card.Meta>
            <span className='date'>{this.props.profile.location}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.profile.description}
          </Card.Description>
        </Card.Content>
      </Card>
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
})(ProfileDetail);

// Require a document to be passed to this component.
ProfileDetail.propTypes = {
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
