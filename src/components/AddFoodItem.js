import React, { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

class AddFoodItem extends Component {
//function AddFoodItem(props){
  ////myProps.onadd = function
//}

  render() {
    return (
      <div>
        <Form onSubmit={this.props.onAdd /* props.onAdd */}>
          <Form.Row> 
            <Col xs={5}>
              <Form.Control type="text" name="name" /* don't forget to give a name attribute */ placeholder="Name" />
            </Col>
            <Col>
              <Form.Control type="number" name="calories" placeholder="Calories" />
            </Col>
            <Col>
              <Form.Control name="image" placeholder="Image" />
            </Col>
            <Button variant="primary" type="submit"> Submit </Button>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

export default AddFoodItem;
