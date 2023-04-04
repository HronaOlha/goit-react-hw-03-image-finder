import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: '',
    images: [],
    totalHits: null,
    loader: false,
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    const currentImages = this.state.query;
    const prevImages = prevState.query;
    const prevPage = prevState.page;
    const currentPage = this.state.page;

    if (prevImages !== currentImages) {
      this.setState({ images: [], totalHits: null, loader: true });

      fetch(
        `https://pixabay.com/api/?q=${currentImages}&page=1&key=33669758-051ccdd3e1f8c77fcf59fb873&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          return res.json();
        })
        .then(images => {
          const { hits, totalHits } = images;
          const shortenHits = this.shortenData(hits);

          this.setState({
            images: shortenHits,
            totalHits: totalHits,
          });
        })
        .finally(() => this.setState({ loader: false }));
    }

    if (prevPage !== currentPage) {
      fetch(
        `https://pixabay.com/api/?q=${currentImages}&page=${currentPage}&key=33669758-051ccdd3e1f8c77fcf59fb873&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(images => {
          const { hits } = images;
          const shortenHits = this.shortenData(hits);

          this.setState(prevState => ({
            images: [...prevState.images, ...shortenHits],
          }));
        });
    }
  }

  shortenData = array =>
    array.map(({ id, tags, webformatURL, largeImageURL }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
    }));

  handleNextPage = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  handleSubmit = queryValue => {
    this.setState({ query: queryValue });
  };

  render() {
    const { totalHits, images, loader } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />

        <ImageGallery
          loader={loader}
          images={images}
          totalHits={totalHits}
          onNextPage={this.handleNextPage}
        />
      </>
    );
  }
}
