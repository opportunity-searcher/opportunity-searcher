import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField, RadioField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Profiles } from '../../api/profile/Profiles';
import { Companies } from '../../api/company/Companies';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  location: String,
  image: String,
  description: String,
  skills: String,
  role: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddInitial extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, location, image, description, skills, role } = data;
    const owner = Meteor.user().username;

    if (role === 'student') {
      Profiles.collection.insert({ name, location, image, description, skills, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            Meteor.subscribe('assignUserToRole', [role]);
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
    }

    if (role === 'company') {
      Companies.collection.insert({ name, location, image, description, skills, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            Meteor.subscribe('assignUserToRole', [role]);
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
    }

  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered id="add-profile-page">
        <Grid.Column>
          <Header as="h2" textAlign="center">Finish Profile or Company</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <RadioField name='role' allowedValues={['student', 'company']} id="student"/>
              <TextField name='name' id="profile-name"/>
              <TextField name='location' id="profile-location"/>
              <TextField name='image' id="profile-image"/>
              <LongTextField name='description' id="profile-description"/>
              <TextField name='skills' id="profile-skills"/>
              <SubmitField value='Submit' id="profile-submit"/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddInitial;
