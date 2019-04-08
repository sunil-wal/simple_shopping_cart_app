import React, { Component } from "react";
import "../containers/App.css";
import { Button, FormControl, FormGroup } from "react-bootstrap";
import './AddProduct.css'
import {addNewProduct} from '../actions'
import { connect } from 'react-redux';
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        id: 0,
        title: "",
        price: 0,
        inventory: 0
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const name = e.target.name;
    console.log();
    let prevState = Object.assign({}, this.state.value);
    prevState[name] = e.target.value;
    this.setState({ value: prevState });
  }
  handleSubmit(e) {
    // this.props.onAddNewProductClicked(this.state.value);
    this.props.dispatch(addNewProduct(this.state.value));
  }
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h3>Add New Product</h3>
          <form>
          <FormGroup bsSize="large">
            <FormControl
              required
              type="text"
              name="title"
              placeholder="Product Title"
              onChange={this.handleChange}
            />
            <br />
            <FormControl
              required
              type="number"
              name="price"
              placeholder="Product Price"
              onChange={this.handleChange}
            />
            <br />
            <FormControl
              required
              type="number"
              name="inventory"
              placeholder="Product Inventory"
              onChange={this.handleChange}
            />
            <br />
            <Button bsSize="large" onClick={this.handleSubmit}>Add</Button>
          </FormGroup>
          </form>
        </div>
      </div>
    );
  }
}
// export default AddProduct;
export default connect()(AddProduct);
