import PropTypes from 'prop-types';
import { Component } from 'react';
import { GoSearch } from 'react-icons/go';
import { Header, Form, Button, Input } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    queryValue: '',
  };

  handleSubmitQuery = e => {
    e.preventDefault();

    if (this.state.queryValue.trim() === '') {
      return;
    }

    this.props.onSubmit(this.state.queryValue.toLowerCase());

    this.setState({
      queryValue: '',
    });
  };

  handleInputChange = e => {
    this.setState({
      queryValue: e.currentTarget.value,
    });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmitQuery}>
          <Button className="submit">
            <GoSearch />
          </Button>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.queryValue}
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
