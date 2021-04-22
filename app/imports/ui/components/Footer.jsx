import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', color: 'gray' };
    return (
      <footer>
        <div style={divStyle} className="ui center aligned container">
          <hr />
          Opportunity Searcher<br />
          Created with the joint efforts of Kegan Flagg, Matthew Ito, and Jay Paul Luben<br />
          <a href="https://opportunity-searcher.github.io/">Link to the github</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
