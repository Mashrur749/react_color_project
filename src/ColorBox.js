import React, { Component } from 'react'
import {Link} from "react-router-dom"
import chroma from "chroma-js"
import {CopyToClipboard} from "react-copy-to-clipboard"
import "./ColorBox.css";

export default class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            copied: false
        }
    }

    changeCopyState = () => {
        this.setState({copied: true}, ()=> {
            setTimeout(()=> this.setState({copied: false}), 1500)
        })
    }

    render() {
        const {name, background, id, color, paletteId} = this.props;
        const isDarkColor =chroma(background).luminance() <= .08;
        const isLightColor =chroma(background).luminance() >= .6;

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className="ColorBox">
                    <div style={{background}} className={`copy-overlay ${this.state.copied && "show"}`}></div>
                    <div className={`copy-msg ${this.state.copied && "show"}`}>
                        <h1>Copied to clipboard.</h1>
                        <p  className={isDarkColor && "light-text"} >{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={isDarkColor && "light-text"}>{name}</span>
                        </div>
                        <button className="copy-button">Copy</button>
                    </div>
                    {   
                        this.props.showLink 
                        && 
                        <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation}>
                            <span className={`see-more ${isLightColor && "dark-text"}`}>More</span>
                        </Link>
                    }
                </div>
            </CopyToClipboard>
        )
    }
}
