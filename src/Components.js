import React, { Component } from 'react';
import Draggable from 'react-draggable'
import { IOption } from './SubComponents';
import ReactDOM from 'react-dom';

var getCustomizationsForType = function(type){
    var customization =
    [{
        "name" :"size",
        "label": "Size",
        "component": "slider"
    },
    {
        "name": "color",
        "label": "Color",
        "component":"color-picker"
    },
    {
        "name": "opacity",
        "label": "Opacity",
        "component": "opacity",
        "defaultValue": 1
    }
    // {
    //     "name" :"delete",
    //     "component": "delete",
    //     "label":""
    // }  
    ]
    switch(type){
        case "text":{
            let additionalCustomizations = [
                {
                    "name": "bold",
                    "label": "Bold",
                    "component": "boolean"
                },
                {
                    "name": "italic",
                    "label": "Italic",
                    "component": "boolean"
                }
            ]
            customization = customization.concat(additionalCustomizations)
            break;
        }
        case "divider":{
            break;
        }
        case "background":{
            let additionalCustomizations = [
                {
                    "name": "width",
                    "label": "Width",
                    "component": "width"
                },
                {
                    "name": "height",
                    "label": "Height",
                    "component": "height"
                },
                {
                    "name": "round-corners",
                    "label": "Round Corners",
                    "component": "round-corners"
                },
            ]
            customization = customization.concat(additionalCustomizations)
            break;
        }
    }
    return customization;
}

export class BaseBuilder extends Component{
    // parent = null;
    // setParent(obj){
    //     this.parent = obj
    // }
    // updateOptions(key, value){
    //     if(this.parent && this.parent.valueChanged){
    //         this.parent.valueChanged(key, value)
    //     }
    // }
    constructor(props){
        super(props)
        this.compNameRef = React.createRef(null)
    }
    deleteComponent(ele){
        console.log("removing")
        console.log(ele)
        ele.state.visible = false;
        this.setState({components: this.props.prop.components})
    }
    addComponent(name){
        let components = ["text", 'divider', 'background']
        if(components.includes(name)){
            let component = null;
            switch(name){
                case "text":{
                    component = <TextComponent prop={{deleteComponent: this.deleteComponent.bind(this)}}/>
                    this.props.prop.components.push(component);
                    this.setState({components: this.props.prop.components})
                    break;
                }
                case 'divider':{
                    component = <DividerComponent prop={{deleteComponent: this.deleteComponent.bind(this)}}/>
                    this.props.prop.components.push(component);
                    this.setState({components: this.props.prop.components})
                    break;
                }
                case "background":{
                    component = <Background prop={{deleteComponent: this.deleteComponent.bind(this)}}/>
                    this.props.prop.components.push(component);
                    this.setState({components: this.props.prop.components})
                    break;
                }
                
            }
            // ReactDOM.render(component, document.getElementById("root"))
            
        }
        else{
            alert("invalid component")
        }
    }
    render(){
        return (<div className='row'>
            <div className='builder'>
                {/* <div className="abs"> */}

                {this.props.prop.components.map((component) => {
                    return component
                })}
                {/* </div> */}
            </div>
            <div className='options' id='options-box'>
                
            </div>
            <div className=''>
                {/* <input ref = {this.compNameRef} type='text'></input> */}
                {/* <button onClick={() => {
                    this.addComponent(this.compNameRef.current.value)
                    this.compNameRef.current.value = ""
                }}>Add Element</button> */}
                {this.props.prop.featureComponents.map((feature) => {
                    return <button onClick={() => {
                        this.addComponent(feature.name)
                        // this.compNameRef.current.value = ""
                    }}>{feature.display}</button>
                })}
            </div>
            
        </div>);
    }
}


export class Options extends Component{
    constructor(props){
        super(props)
    }
    valueChanged(childProp, value){
        console.log("updated value for "+ childProp.name+ " = "+value)
        // this.props.prop.valueChanged(childProp.name, value)
        // this.props.prop.parent.valueChanged(childProp.name, value)
        if(this.parent && this.parent.valueChanged){
            this.parent.valueChanged(childProp.name, value)
        }
        else{
            alert('Please select a element to customize')
        }
        
    }
    render(){
        let listener = this.valueChanged
        let properties = this.props.prop
        properties.valueChanged = listener
        let customizations = getCustomizationsForType(this.props.prop.type)
        return (<div className='options-root'>
            {customizations.map((option) => {
                return <IOption prop={{properties: properties, option: option}}></IOption>
            })} 
            </div>
        );
    }
}

export class DividerComponent extends Component{
    constructor(props){
        super(props)
    }
    state = {
        "type" :"dashed",
        "size":2,
        "color": "black",
        isDraggable: true,
        "opacity": 1
    }
    valueChanged(key, value){
        if(this.state[key] != null && value != null){
            this.state[key] = value
            this.setState({key, value})
        }
    }
    handleOnStart(){
        // this.props.parent.setListener(this.valueChanged)
        showOptions(this.state, this.valueChanged.bind(this))
    }
    handleOnStop(){
        showOptions(this.state, this.valueChanged.bind(this))
    }
    render(){
        let bordercss = this.state.size+"px "+this.state.type+" "+this.state.color
        let style = {
            size: this.state.size,
            color: this.state.color,
            "border-top": bordercss ,
            "opacity": this.state.opacity
        }
        let component = <hr className={this.state.type} style={style}></hr>
        if(this.state.isDraggable){
            return <Draggable
                onStart = {this.handleOnStart.bind(this)}
                onStop =  {this.handleOnStop.bind(this)}
                >{component}</Draggable>
        }
        return component;
    }
}

export class Background extends Component{
    constructor(props){
        super(props)
    }
    state = {
        "background-color" :"blue",
        color: "blue",
        "width":"100px",
        "height": "50px !important",
        isDraggable: true,
        "opacity": 1,
        "border-radius": 0,
        "type": "background"
        
    }
    valueChanged(key, value){
        if(this.state[key] != null && value != null){
            this.state[key] = value
            this.setState({key, value})
        }
    }
    handleOnStart(){
        // this.props.parent.setListener(this.valueChanged)
        showOptions(this.state, this.valueChanged.bind(this))
    }
    handleOnStop(){
        showOptions(this.state, this.valueChanged.bind(this))
    }
    render(){
        // let bordercss = this.state.size+"px "+this.state.type+" "+this.state.color
        let style = {
            width: this.state.width,
            height: this.state.height+"px",
            color: this.state.color,
            "background-color": this.state.color ,
            "opacity": this.state.opacity,
            "border-radius": this.state['border-radius'],
            "border": "solid 1px "+this.state.color
        }
        let component = <div className={this.state.type} style={style}></div>
        if(this.state.isDraggable){
            return <Draggable
                onStart = {this.handleOnStart.bind(this)}
                onStop =  {this.handleOnStop.bind(this)}
                >{component}</Draggable>
        }
        return component;
    }
}

export class TextComponent extends Component{
    constructor(props){
        super(props)
        // this.handleOnStart.bind(this)
        // this.handleOnStop.bind(this)
    }
    state = {
        "text": "Test",
        "isDraggable": true,
        "type": "text",
        "size":"12",
        "color": "black",
        "bold":false,
        "italic":false,
        "opacity": 1
    }
    handleOnStart(){
        // this.props.parent.setListener(this.valueChanged)
        showOptions(this.state, this.valueChanged.bind(this))
    }
    handleOnStop(){
        showOptions(this.state, this.valueChanged.bind(this))
    }
    valueChanged(key, value){
        // console.log("listener for root element")
        // console.log(key+ " "+ value)
        if(value == "${COMPONENT_DELETE}"){
            this.props.prop.deleteComponent(this)
        }
        if(this.state[key] != null && value != null){
            this.state[key] = value; 
            this.setState({key: value})
        }
    }
    render(){
        let style = {
            color: this.state.color,
            fontSize: this.state.size+"px",
            opacity: this.state.opacity
        }
        if(this.state.bold){
            style["font-weight"] = "bold"
        }
        else{
            style["font-weight"] = "normal"
        }
        if(this.state.italic){
            style["font-style"] = "italic"
        }
        else{
            style["font-style"] = "normal"
        }
        // if(this.state.visible){
        //     style["display"] = "block"
        // }
        // else{
        //     style["display"] = "none"
        // }
        let component = <span style={style} contentEditable="true" className='component text-component'>{this.state.text}</span>
        if(this.state.isDraggable){
            return (
                <Draggable
                onStart = {this.handleOnStart.bind(this)}
                onStop =  {this.handleOnStop.bind(this)}
                >
                    {component}
                </Draggable>
                );
        }
        return component
    }
}

var showOptions = function(data, valueListener){
    console.log(data)
    data.parent = {}
    data.parent.valueChanged = valueListener;
    data.validation = getValidation(data);
    // ReactDOM.unmountComponentAtNode(document.getElementById('options-box'))
    ReactDOM.render(<Options prop={data}></Options>, document.getElementById('options-box'))
    // React.createElement(Option, {data}, null, document.querySelector('#options-box'))
}

var trueFunc = function(){
    return true;
}
var isColor = function(data, value){
    return new Option().style == value.toLowerCase()
}

var getValidation = function(data){
    console.log(data, "for validation")
    switch(data.type){
        case "color-picker":{
            return isColor; 
        }
    }
    return trueFunc
}