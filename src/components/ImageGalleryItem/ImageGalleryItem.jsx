import PropTypes from 'prop-types';
import { Component } from 'react';
import { Item, Img } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  handleToggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { webformatURL, largeImageURL, alt } = this.props;
    return (
      <>
        <Item onClick={this.handleToggleModal}>
          <Img src={webformatURL} alt={alt} />
        </Item>

        {this.state.showModal && (
          <Modal
            toggleModal={this.handleToggleModal}
            largeImageURL={largeImageURL}
            alt={alt}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
