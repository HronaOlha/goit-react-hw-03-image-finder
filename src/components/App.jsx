import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: '',
  };

  handleSubmit = queryValue => {
    this.setState({ query: queryValue });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />

        <ImageGallery queries={this.state.query} />
      </>
    );
  }
}
