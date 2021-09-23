import React, { Component } from 'react';
import Cardlist from './Cardlist';
import {robots} from './robots';
import Searchbox from './Searchbox';
import './App.css';
import Scroll from './Scroll';

class App extends Component
{
    constructor()
    {
        super();
        this.state={
            robots: robots,
            searchField:''
        }
    }

    componentDidMount()
    {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users}));
    }
    
    onSearchChange = (event) =>
    {
        this.setState({searchField: event.target.value});
    }

    render()
    {
        const filteredRobots=this.state.robots.filter(robot =>
            robot.name.toLowerCase().includes(this.state.searchField.toLowerCase()));
        
        if(this.state.robots.length===0)
        {
            return <h1>Loading...</h1>;
        }
        else
        {
            return (         
            <div className='tc'>
                <h1 className ='f2'>ROBOFRIENDS</h1>
                <Searchbox searchChange = {this.onSearchChange}/>
                <Scroll>
                    <Cardlist robots={filteredRobots} />
                </Scroll>
            </div>
            );
        }
    }
}
export default App;