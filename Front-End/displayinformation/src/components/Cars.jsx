//import { Component } from 'react';

/*

export default class Cars extends Component{

    /*
    constructor(props){
        super(props);
        this.state = {
            carInfo: []
        }
    }


    componentDidMount(){
        fetch('/api/cars').then(res => res.json()).then(carInfo => {
            this.setState({carInfo: carInfo});
        });
    }
*/
/*
    render(){
        return <ul>

            {
                this.state.users.map(carInfo =>{
                    <li>

                    </li>
                })
            }
        </ul>
    }





render(){

    return <h1>Hello</h1>


}

}

*/



console.log('fetching')
var carInfo;
fetch('/api/cars')
.then(response =>response.json())
.then(car=>{
    carInfo = car;
    carInfo = JSON.parse(carInfo); //okay so only use this IF and ONLY IF your data is in mongoDB
})

export default function Cars(){
    return (

        <h1>HELLO!</h1>



    )
}