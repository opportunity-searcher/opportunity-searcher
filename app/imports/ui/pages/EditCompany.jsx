import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Companies } from '../../api/company/Companies';

const bridge = new SimpleSchema2Bridge(Companies.schema);

/** Renders the Page for editing a single document. */
class EditCompany extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { name, location, image, description, skills, _id } = data;
    Companies.collection.update(_id, { $set: { name, location, image, description, skills } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    if (this.props.ready) {
      return (this.props.doesOwn || this.props.isAdmin) ? this.renderPage() :
          <Header textAlign="center">Oops! You don&apos;t have permission to edit this profile</Header>;
    }

    return <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered id="edit-company-page">
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Company</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField name='name'/>
              <TextField name='location'/>
              <TextField name='image'/>
              <LongTextField name='description'/>
              <TextField name='skills'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='owner' />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditCompany.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  doesOwn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Companies.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Companies.collection.findOne(documentId);

  const doesOwn = doc.owner === Meteor.user().username;
  const isAdmin = Roles.userIsInRole(Meteor.user(), ['admin']);
  return {
    doc,
    ready,
    doesOwn,
    isAdmin,
  };
})(EditCompany);
