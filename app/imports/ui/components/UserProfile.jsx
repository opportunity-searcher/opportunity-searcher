import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserProfile extends React.Component {
  location = {
    pathname: `/detail/${this.props.userprofile._id}`,
    state: { profile: this.props.userprofile, isUser: false },
  };

  render() {
    return (
      <Card as={NavLink} activeClassName="active" exact to={this.location} key='detail' id="detail-nav" >
        <Image src={this.props.userprofile.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.userprofile.name}</Card.Header>
          <Card.Meta>
            <span className='date'>{this.props.userprofile.location}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.userprofile.description}
          </Card.Description>
          <h5>
            Skills: {this.props.userprofile.skills}
          </h5>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
UserProfile.propTypes = {
  userprofile: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    skills: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserProfile);
