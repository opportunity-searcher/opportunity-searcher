import { _ } from 'meteor/underscore';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Search, Container, Divider, Header, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';
import UserProfile from '../components/UserProfile';

const users = [
  {
    name: 'Matthew Ito', address: 'Los Angeles', image: 'https://avatars.githubusercontent.com/u/71101234?v=4',
    description: 'UH Manoa student studying ICS and Japanese.',
  },
  {
    name: 'Google', address: '1600 Amphitheatre Parkway', image: 'https://www.tripsavvy.com/thmb/oOoIxfAquiM7PBa_sDMXNdo_wtk=/2416x1600/filters:fill(auto,1)/how-to-visit-the-googleplex-google-hq-mountain-view-57e2d4515f9b586c3529ba9c.jpg',
    description: 'We are currently hiring interns and part-time software engineers.',
  },
];

const initialState = { isLoading: false, results: [], value: '' };

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class SearchPage extends React.Component {
    state = initialState

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => re.test(result.name);

      this.setState({
        isLoading: false,
        results: _.filter(users, isMatch),
      });
    }, 300);
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Container>
        <Header as="h2" textAlign="center">Search Profiles or Companies</Header>
        <Container textSize="large" textAlign="center">
          <Search
            size="huge"
            input={{ icon: 'search', iconPosition: 'right' }}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
          />
        </Container>
        <Divider/>
        <Card.Group>
          {users.map((userprofile, index) => <UserProfile key={index} userprofile={userprofile} />)}
        </Card.Group>
      </Container>
    );

    // return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
/*   renderPage() {

    return (
      <Container>
        <Search
          input={{ icon: 'search', iconPosition: 'left' }}
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true,
          })}
          results={results}
          value={value}
        />
        <Card.Group>
          {users.map((userprofile, index) => <UserProfile key={index} userprofile={userprofile} />)}
        </Card.Group>
      </Container>
    );
  } */
}

// Require an array of Stuff documents in the props.
SearchPage.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const profiles = Profiles.collection.find({}).fetch();
  return {
    profiles,
    ready,
  };
})(SearchPage);
