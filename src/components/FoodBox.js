import React, { Component } from 'react';

class FoodBox extends Component {
  //this.props.singleFood

   //create a state just to store the quantity of the food
   state = {
    quantity: 1
  }

  handleChange = (e) => {
    this.setState({
      quantity: Number(e.target.value)
    })
  }

  render() {
    const { name, calories, image } = this.props.singleFood;
    const {quantity} = this.state
   
    return (
      <div>
        <div className="box">
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img src={image} />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{name}</strong> <br />
                  <small>{calories}</small>
                </p>
              </div>
            </div>
            <div className="media-right">
              <div className="field has-addons">
                <div className="control">
                  <input onChange={this.handleChange} className="input" type="number" value={quantity} />
                </div>
                <div className="control">
                {/* use a callback to be sure that function dont be invoke right away */}
                  <button onClick={() => {this.props.onAdd(this.props.singleFood, quantity) }} className="button is-info">+</button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

export default FoodBox;
