import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { ImageGalleryList } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

export class ImageGallery extends Component {
  state = {
    images: [],
    totalHits: null,
    loader: false,
  };

  componentDidUpdate(prevProps, _) {
    const currentImages = this.props.queries;
    const prevImages = prevProps.queries;

    if (prevImages !== currentImages) {
      this.setState({ loader: true });
      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${currentImages}&page=1&key=33669758-051ccdd3e1f8c77fcf59fb873&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(res => res.json())
          .then(images => {
            console.log(images);
            this.setState({ images: images.hits, totalHits: images.totalHits });
          })
          .finally(this.setState({ loader: false }));
      }, 1000);
    }
  }

  render() {
    return (
      <>
        {this.state.loader && <Loader />}
        {this.state.images && (
          <ImageGalleryList>
            {this.state.images.map(image => (
              <ImageGalleryItem
                key={image.id}
                webformatURL={image.webformatURL}
              />
            ))}
          </ImageGalleryList>
        )}
        {this.state.totalHits > this.state.images.length && <Button />}
      </>
    );
  }
}
