import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Companies } from '../../api/company/Companies';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  location: String,
  image: String,
  description: String,
  skills: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddCompany extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, location, image, description, skills } = data;
    const owner = Meteor.user().username;
    Companies.collection.insert({ name, location, image, description, skills, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered id="add-company-page">
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Company</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='name' id="company-name"/>
              <TextField name='location' id="company-location"/>
              <TextField name='image' id="company-image"/>
              <LongTextField name='description' id="company-description"/>
              <TextField name='skills' id="company-skills"/>
              <SubmitField value='Submit' id="company-submit"/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddCompany;
