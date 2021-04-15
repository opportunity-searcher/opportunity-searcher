import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserProfile extends React.Component {
  render() {
    return (
        <Card>
          <Image src={this.props.userprofile.image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{this.props.userprofile.name}</Card.Header>
            <Card.Meta>
              <span className='date'>{this.props.userprofile.address}</span>
            </Card.Meta>
            <Card.Description>
              {this.props.userprofile.description}
            </Card.Description>
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
    address: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserProfile);
