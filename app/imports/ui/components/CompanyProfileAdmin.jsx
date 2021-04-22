import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CompanyProfileAdmin extends React.Component {
  render() {
    return (
      <Card>
        <Image src={this.props.companyprofile.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.companyprofile.name}</Card.Header>
          <Card.Meta>
            <span className='date'>{this.props.companyprofile.location}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.companyprofile.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/edit2/${this.props.companyprofile._id}`}>Edit</Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
CompanyProfileAdmin.propTypes = {
  companyprofile: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    skills: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(CompanyProfileAdmin);
