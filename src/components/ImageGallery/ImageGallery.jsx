import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { ImageGalleryList } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';

export class ImageGallery extends Component {
  state = {
    images: [],
    totalHits: null,
    loader: false,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const currentImages = this.props.queries;
    const prevImages = prevProps.queries;

    if (prevImages !== currentImages) {
      this.setState({ images: [], totalHits: null, loader: true });

      fetch(
        `https://pixabay.com/api/?q=${currentImages}&page=1&key=33669758-051ccdd3e1f8c77fcf59fb873&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(images => {
          this.setState({
            images: images.hits,
            totalHits: images.totalHits,
          });
        })
        .finally(this.setState({ loader: false }));
    }

    if (prevState.page !== this.state.page) {
      fetch(
        `https://pixabay.com/api/?q=${currentImages}&page=${this.state.page}&key=33669758-051ccdd3e1f8c77fcf59fb873&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(images => {
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
          }));
        });
    }
  }

  handleNextPage = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    return (
      <>
        {this.state.totalHits === 0 && (
          <ErrorMessage
            message="Sorry, there are no images matching your search query. Please try
            again."
          />
        )}

        {this.state.images && (
          <ImageGalleryList>
            {this.state.images.map(image => (
              <ImageGalleryItem
                key={image.id}
                webformatURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                alt={image.tags}
              />
            ))}
          </ImageGalleryList>
        )}

        {this.state.loader && <Loader />}
        {this.state.totalHits > this.state.images.length && (
          <Button onClick={this.handleNextPage} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  queries: PropTypes.string.isRequired,
};
