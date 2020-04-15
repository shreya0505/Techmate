import React, { Component } from 'react'
import List from "./list"
import Steps from "./Steps"
import Carousel from"./carousel"


export default class Homepage extends Component {
    render() {
        
        return (
            <div>
                <Carousel id="carousel"/>
                <Steps id="steps" />
                <List />
                
            </div>
        )
    }
}
