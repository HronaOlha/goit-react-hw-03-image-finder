import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    loader: false,
  };

  handleSubmit = queryValue => {
    console.log(queryValue);
    this.setState({ loader: true });
    fetch(
      `https://pixabay.com/api/?q=${queryValue}&page=1&key=33669758-051ccdd3e1f8c77fcf59fb873&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(query => this.setState({ query }))
      .finally(this.setState({ loader: false }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.loader && <Loader />}
        {/* https://pixabay.com/api/?q=cat&page=1&key=33669758-051ccdd3e1f8c77fcf59fb873&image_type=photo&orientation=horizontal&per_page=12*/}
      </>
    );
  }
}
