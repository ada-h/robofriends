import React, {Component} from 'react';
import CardList from './Cardlist';
//import {robots}  from './robots';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import './App.css';
import Time from './Time'
import Navigation from './Navigation'
import Register from './Register'
import Logo from './Logo'
import ImageLinkForm from './ImageLinkForm'
import Rank from './Rank'
import Signin from './Signin'
import Clarifai from 'clarifai'
import FaceRecogntion from './FaceRecognition'

const app = new Clarifai.App({
    apiKey:'4165a05802dd432f8e4b33a451d8c647'
});

class App extends Component{
    constructor(){
        super() 
        this.state = {
        robots: [],
        searchfield: '',
        input: 'https://i.pinimg.com/originals/b6/a3/51/b6a351a5759986861232edabeb4ec983.png',
        imageUrl: '',
        box:{}, 
        route: 'signin',
        isSignedIn: false,
        user:{
            id: '',
            name: '',
            email: '',
            entries:0,
            joined: ''
        }
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then (users => this.setState({robots:users}));
    }

    loadUser = (data) =>{
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries:data.entries,
            joined: data.joined
        }})
    }

    calculateFaceLocation = (data) =>{
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image= document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
       return{
           leftCol: clarifaiFace.left_col * width,
           topRow: clarifaiFace.top_row * height,
           rightCol: width - (clarifaiFace.right_col * width),
           bottomRow: height - (clarifaiFace.bottom_row * height),
       }
    }

    displayFaceBox =(box) => {
        this.setState({box: box})
    }
  
    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    onInputChange = (event) => {
       this.setState({input: event.target.value})
    }

    onSubmit = (event) => {
        //const { input } = this.state
        this.setState({imageUrl: this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response => {
            if (response){
                console.log(response);
                fetch('http://localhost:3000/image', {
                    method: 'put',
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
        
                    })
                })
               .then(response => {console.log(response, "from local");response.json();})
               .then(count =>{
                   this.setState(Object.assign(this.state.user, {entries: count}))
               })
            }
            this.displayFaceBox(this.calculateFaceLocation(response))
        
        })
        .catch(err=> console.log(err))
    }

    onRouteChange = (route) => {
        if (route === 'signout'){
            this.setState({isSignedIn:false})
        }else if (route === 'home'){
            this.setState({isSignedIn:true})
        }
        this.setState({route: route});
    }

    render() {
        const { robots, searchfield} = this.state;
        // console.log(this.state);
        const filteredRobots =robots.filter(robot=>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        if (this.state.robots.length === 0){
            return <h1> Loading...</h1>
        }else{
            return (
                <div className='tc'>
                    <Navigation isSignedIn= {this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
                    { this.state.route === 'home' ? 
                    <div>
                    <Logo/>
                    <Rank name ={this.state.user.name} entries = {this.state.user.entries}/>
                    <ImageLinkForm onInputChange={this.onInputChange} onSubmit = {this.onSubmit}/>
                   <FaceRecogntion box={this.state.box} imageUrl={this.state.imageUrl}/>
                    <h1 className='f2'>Robofriends</h1>
                    <SearchBox searchChange= {this.onSearchChange}/>
                    <Time/>
                    <Scroll><CardList robots= {filteredRobots}/></Scroll>
                    </div>
                    :(
                        this.state.route === "signin"?  <Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/> 
                        :<Register loadUser ={this.loadUser} onRouteChange = {this.onRouteChange}/>
                    )
                   
                }
                </div>
                
            );
        }
       
    }
   
}
 export default App;