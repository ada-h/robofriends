import React from 'react'

class Time extends React.Component{
    constructor(props){
        super(props);
        this.state ={date:new Date()}
    }
    componentDidMount(){
        this.timerID = setInterval(
            () => this.tick(), 1000
        );
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    tick(){
        this.setState({
            date:new Date()
        })
    }
    render(){
        return(
        <div className= 'tl'> 
            <h1> The Time is: {this.state.date.toLocaleTimeString()}</h1>
        </div>
        )
    }
}

export default Time;