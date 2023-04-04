import PropTypes from 'prop-types';
import { Component } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = event => {
    const { toggleModal } = this.props;

    if (event.code === 'Escape') {
      toggleModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleBackdropClick = event => {
    const { toggleModal } = this.props;

    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  render() {
    const { largeImageURL, alt } = this.props;
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <img src={largeImageURL} alt={alt} />
        </ModalWindow>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
