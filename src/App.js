import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import FoodBox from './components/FoodBox';
import foods from './foods.json';
import AddFoodItem from './components/AddFoodItem';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


//when a class extends a component it heneritates from all the function from React (heavier)
//function RFC are less heavy and you can include life cycle methods

class App extends Component {
  state = {
    foodItems: foods,
    showForm: false,
    filteredFood: foods,
    totalCalories: []
  };

  //add a food item
  handleAdd = (event) => {
    event.preventDefault();
    console.log(event.target.name.value);

    const { foodItems, filteredFood } = this.state;

    //to obtain the value passed by the user in the form
    // let foodName = event.target.name.value;
    // let foodCalo = event.target.calories.value;
    // let foodImage = event.target.image.value;

    const { foodName, foodCalo, foodImage } = event.target;

    //console.log("event.target.name.value is: ", event.target.name.value)
    let newFoodAdded = {
      name: foodName,
      calories: foodCalo,
      image: foodImage,
      quantity: 0,
    };

    this.setState({
      foodItems: [
        newFoodAdded,
        ...foodItems /*you have to clone the original array*/,
      ],
      filteredFood: [newFoodAdded, ...filteredFood],
      showForm: false,
    });
  };

  //make the form appears when the user click show form
  handleFormShow = () => {
    this.setState({
      showForm: true,
    });
  };

  //to search for a food item
  handleSearch = (event) => {
    console.log('event.target.value is: ', event.target.value);

    let searchItem = event.target.value;
    const { foodItems } = this.state;

    let filteredFood = foodItems.filter((foodItem) => {
      //return foodItem.name.toLowerCase().includes(searchItem);
      return foodItem.name.toLowerCase().startsWith(searchItem.toLowerCase());
    });

    this.setState({
      filteredFood: filteredFood,
    });
  };

  handleAddFoodToList = (food, quantity) => {
    //its adding the calories
    //check if the food exists in totalCalories. If it does -> update the quantity 
    let foodIndex = this.state.totalCalories.findIndex((item) => {
      return item.name === food.name
    })

    //food exists
    if (foodIndex !== -1) {
      let cloneList = JSON.parse(JSON.stringify(this.state.totalCalories))
      cloneList[foodIndex].quantity = quantity
      //cloneList[foodIndex].quantity += quantity


      this.setState({
        totalCalories: cloneList
      })
    }
    else {

    
    //if it does not exist, add a new food:
    console.log('button + clicked', food.name);
    let myFood = {
      name: food.name, 
      calories: food.calories, 
      quantity: quantity
    }
    this.setState({
      totalCalories: [...this.state.totalCalories, myFood]
    })
    }
  };

  handleDelete = (name) => {
    const {totalCalories} = this.state
    let newTotalCalories = totalCalories.filter((food) => {
      return food.name != name
    })

    this.setState({
      totalCalories: newTotalCalories
    })
  }

  render() {
    const { foodItems, showForm, filteredFood, totalCalories } = this.state;

    let totalFoodCalories = totalCalories.reduce((acc, food) => {
      return acc + (food.calories * food.quantity)
    }, 0)
    
    return (
      <div className="columns">
        <div className="column">
          {/* to show or hide the adding food form */}
          {showForm ? (
            <AddFoodItem onAdd={this.handleAdd} />
          ) : (
            <Button variant="outline-info" onClick={this.handleFormShow}>
              Show
            </Button>
          )}
          {/* search bar */}
          <input
            //onChange to keep close track of what we are typing
            onChange={this.handleSearch}
            type="text"
            placeholder="Search"
          ></input>

          {filteredFood.map((food, i) => {
            return <FoodBox key={i} singleFood={food} onAdd={this.handleAddFoodToList}/>;
          })}
        </div>
        <div className="column">
        Total Food Calories
        <ul>
          {
            totalCalories.map((food) => {
              return <li>
              <p>{food.quantity} {food.name} = {food.quantity * food.calories} cal</p>
              <button onClick={() => {this.handleDelete(food.name)}}>Delete</button>
              </li>
            })
          }
        </ul>
        <p>Total {totalFoodCalories} cal</p>
        </div>
      </div>
    );
  }
}

export default App;
