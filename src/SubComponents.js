import React, { Component } from 'react';
// import Slider from 'react-slider'
import Slider from '@material-ui/core/Slider';
import {SketchPicker} from 'react-color'

export class IOption extends Component{
    state = {}
    constructor(props){
        super(props)
        // this.valueChanged.bind(this)
    }
    valueChanged(event, value){
        console.log(event)
        console.log(value)
        if(this.props.prop.properties.validation){
            if(this.props.prop.properties.validation(this.props.prop.option, value)){
                this.props.prop.properties.valueChanged(this.props.prop.option, value)
            }
        }
        else{
            this.props.prop.properties.valueChanged(this.props.prop.option, value)
        }
        
    }
    render(){
        let data = this.props.prop.option
        data.valueChanged = this.valueChanged.bind(this)
        let component = (
        <div className='row'>
            <span>{data.label}</span>
            {getComponent(data.component, data)}
        </div>)
        return component;
    }
}

var getComponent = function(componentType, data){
    switch (componentType){
        case "slider":{
            return <Slider
                defaultValue={data.defaultValue}
                step={1}
                min={1}
                max={32}
                onChangeCommitted = {(event, value) =>{
                    data.valueChanged(event, value, componentType)
                }}
                valueLabelDisplay='auto'
            ></Slider>
        }
        case "text-box":{
            return <input type="text" onChange = {(event) => {
                data.valueChanged(event, event.target.value, componentType)
            }}></input>
        }
        case "color-picker":{
            // return <SketchPicker/>
            return <input type="text" onChange = {(event) => {
                data.valueChanged(event, event.target.value, componentType)
            }}></input>
        }
        case "boolean":{
            return <input type="checkbox" onChange = {(event) => {
                data.valueChanged(event, event.target.checked, componentType)
            }}></input>
        }
        case "delete":{
            return <button onClick = {(event)=>{
                data.valueChanged(event, "${COMPONENT_DELETE}", componentType)
            }}>Delete</button>
        }
        case "opacity":{
            return <Slider
            defaultValue={data.defaultValue}
                step={0.1}
                min={0}
                max={1}
                onChangeCommitted = {(event, value) =>{
                    data.valueChanged(event, value, componentType)
                }}
                valueLabelDisplay='auto'
                />
        }
        case "round-corners":{
            return <Slider
                defaultValue={data.defaultValue}
                step={1}
                min={0}
                max={10}
                onChangeCommitted = {(event, value) =>{
                    data.valueChanged(event, value, componentType)
                }}
                valueLabelDisplay='auto'
                />
        }
        case "width":{
            return <Slider
                defaultValue={data.defaultValue}
                step={1}
                min={0}
                max={1000}
                onChangeCommitted = {(event, value) =>{
                    data.valueChanged(event, value, componentType)
                }}
                valueLabelDisplay='auto'
                />
        }
        case "height":{
            return <Slider
                defaultValue={data.defaultValue}
                step={1}
                min={0}
                max={1000}
                onChangeCommitted = {(event, value) =>{
                    data.valueChanged(event, value, componentType)
                }}
                valueLabelDisplay='auto'
                />
        }
    }
    return <div></div>
}