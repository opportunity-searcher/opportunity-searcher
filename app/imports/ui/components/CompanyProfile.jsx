import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CompanyProfile extends React.Component {
  render() {
    return (
      <Card>
        <Image src={this.props.companyprofile.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.companyprofile.name}</Card.Header>
          <Card.Meta>
            <span className='date'>{this.props.companyprofile.address}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.companyprofile.description}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
CompanyProfile.propTypes = {
  companyprofile: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(CompanyProfile);
