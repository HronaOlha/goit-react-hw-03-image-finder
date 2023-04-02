import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    loader: false,
  };
  componentDidMount() {
    this.setState({ loader: true });

    setTimeout(() => {
      fetch(
        'https://pixabay.com/api/?q=cat&page=1&key=33669758-051ccdd3e1f8c77fcf59fb873&image_type=photo&orientation=horizontal&per_page=12'
      )
        .then(res => res.json())
        .then(query => this.setState({ query }))
        .finally(this.setState({ loader: false }));
    }, 1000);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('hello');
    this.setState({
      query: 'hello',
    });
  }
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
