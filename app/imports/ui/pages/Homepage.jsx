import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Homepage extends React.Component {
  render() {
    return (
      <div className='opportunities-landing-background'>
        <Header textAlign='center' as='h1' color='grey'>Get started on your search</Header>
        <Grid id='home-page' verticalAlign='middle' textAlign='center' container columns={2}>

          <Grid.Column textAlign='center' >
            <Icon size='huge' name='users' color='grey'/>
            <Header as='h1' color='grey'>Search for Members</Header>
            <Header as='h3' color='grey'>Look at the members currently signed up on the site</Header>
          </Grid.Column>

          <Grid.Column textAlign='center' >
            <Icon size='huge' name='file alternate' color='grey'/>
            <Header as='h1' color='grey'>Search for Companies</Header>
            <Header as='h3' color='grey'>Take a peek at companies who have provided their information on the site</Header>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Homepage;
