import React, { Component } from "react";
import axios from 'axios'
import './carpricepredictor.css'

class Car extends Component{
    state = {
        brandList: [],
        bodyList: [],
        engineList: [],
        brand: null,
        body: null,
        engine: null,
        year: null,
        mileage: null,
        volume: null,
        registration: null,
        price: null,
        showPrice: false
    }
    componentDidMount(){
        axios.get('api/get_attributes').then(
            (response) =>{
                this.setState({
                    brandList:response.data['brand'],
                    bodyList:response.data['body'],
                    engineList:response.data['EngineType']
                })
            }
        )
    }

    submitHandler = () =>{
        let data_to_send = {
            mileage:this.state.mileage,
            volume:this.state.volume,
            registration:this.state.registration,
            year:this.state.year,
            brand:this.state.brand,
            body:this.state.body,
            engine:this.state.engine
        }
        console.log(data_to_send)
        axios.post('api/predict', data_to_send).then(
            (response) => {
                console.log(response)
                this.setState({price:response.data['price'],
                                showPrice:!this.state.showPrice})
            }
        )
    }
    ChangeHandler = (e, type) => {
        //console.log(e.target.value)
        if(type==='BRAND'){
            this.setState({brand:e.target.value})
        }

        if(type==='BODY'){
            this.setState({body:e.target.value})
        }

        if(type==='ENGINE'){
            this.setState({engine:e.target.value})
        }

        if(type==='REGISTRATION'){
            this.setState({registration:e.target.value})
        }

        if(type==='YEAR'){
            this.setState({year:e.target.value})
        }

        if(type==='MILEAGE'){
            this.setState({mileage:e.target.value})
        }

        if(type==='VOLUME'){
            this.setState({volume:e.target.value})
        }
    }
    render(){
        return(
            <div className="contact-us">
                <form method='post'>
                
                    <select name="brand" value={this.state.brand} onChange={(event) => this.ChangeHandler(event, 'BRAND')}>
                        <option value="" disabled selected >Brand</option>
                        {this.state.brandList.map(
                            (e, key) => {
                                return <option key={key} value={e}>{e.toUpperCase()}</option>
                            }
                        )}
                    </select>
                
                    <select placeholder="Body Type" name="body" value={this.state.body} onChange={(event) => this.ChangeHandler(event,'BODY')}>
                    <option value="" disabled selected >Body Type</option>
                        {this.state.bodyList.map(
                            (e, key) => {
                                return <option key={key} value={e}>{e.toUpperCase()}</option>
                            }
                        )}
                    </select>

                    <select placeholder="Engine Variant"  name="engine" value={this.state.engine} onChange={(event) => this.ChangeHandler(event,'ENGINE')}>
                        <option value="" disabled selected >Engine Variant</option>
                        {this.state.engineList.map(
                            (e, key) => {
                                return <option key={key} value={e}>{e.toUpperCase()}</option>
                            }
                        )}
                    </select>

                    <select placeholder="Registration" name="registration" value={this.state.registration} onChange={(event) => this.ChangeHandler(event,'REGISTRATION')}>
                        <option value="" disabled selected >Registration</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>               
                
                    <input placeholder="Purchase Year" type="text" value={this.state.year} onChange={(event) => this.ChangeHandler(event,'YEAR')} min='1960' max='2021' />
                
                    <input placeholder="Kilometres Ran" type="text" value={this.state.mileage} onChange={(event) => this.ChangeHandler(event,'MILEAGE')} />
                
                    <input placeholder="Engine Volume" type="text" value={this.state.volume} onChange={(event) => this.ChangeHandler(event,'VOLUME')} min='2' max='6' />
                {this.state.showPrice 
                ?<button type="button" onClick={this.submitHandler}>&#8377;{this.state.price}</button>
                :<button type="button" onClick={this.submitHandler}>Predict</button>}
            </form>
            </div>
        );
    }
}

export default Car;