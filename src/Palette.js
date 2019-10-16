import React, { Component } from 'react'
import ColorBox from "./ColorBox"
import Navbar from "./Navbar"
import PaletteFooter from "./PaletteFooter"
import "./Palette.css"


export default class Palette extends Component {
  constructor(props){
    super(props);
    this.state = {
      level: 500,
      format: "hex"
    }
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level){
    this.setState({
      level
    })
  }

  changeFormat(value){
    this.setState({
      format: value
    })
  }

  render() {
    const {colors, paletteName, emoji, id} = this.props.palette;
    const {level, format} = this.state;
    const colorBoxes = colors[level].map(color => (    
        <ColorBox
          key={color.id} 
          id={color.id} 
          background = {color[format]} 
          name = {color.name}
          paletteId={id}
          showingFullPalette={true}
        />
      ))
    return (
      <div className = "Palette">
        <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat}  showingAllColors={true}/>
        <div className="Palette-colors">
          {colorBoxes}
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji}/>
      </div>
    )
  }
}
