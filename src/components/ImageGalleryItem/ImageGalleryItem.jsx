import PropTypes from 'prop-types';
import { Component } from 'react';
import { Item, Img } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <>
        <Item onClick={this.handleShowModal}>
          <Img src={this.props.webformatURL} alt={this.props.alt} />
        </Item>

        {this.state.showModal && (
          <Modal
            closeModal={this.handleCloseModal}
            largeImageURL={this.props.largeImageURL}
            alt={this.props.alt}
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
