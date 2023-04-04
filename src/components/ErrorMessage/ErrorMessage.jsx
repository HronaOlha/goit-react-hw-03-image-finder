import PropTypes from 'prop-types';
import { Title } from './ErrorMessage.styled';

export const ErrorMessage = ({ message }) => {
  return <Title>{message}</Title>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
