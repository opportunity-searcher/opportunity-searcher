import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className='opportunities-landing-background'>
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

          <Grid.Column textAlign='center' >
            <Header as='h1' color='grey'>Welcome to Opportunity Searcher</Header>
            <Header as='h3' color='grey'>Opportunity Searcher provides a new way for local and non-local companies
              who want to recruit students from UH to make their (potential) opportunities known to students.
              At the same time, students can create profiles on the site with their interests.
              This site can match students to employers and vice-versa.</Header>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Landing;
