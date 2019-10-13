import React, { Component } from 'react'
import "./ColorBox.css"

import {CopyToClipboard} from "react-copy-to-clipboard"

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
        const {name, background} = this.props
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className="ColorBox">
                    <div style={{background}} className={`copy-overlay ${this.state.copied && "show"}`}></div>
                    <div className={`copy-msg ${this.state.copied && "show"}`}>
                        <h1>Copied to clipboard.</h1>
                        <p>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">Copy</button>
                    </div>
                    <span className="see-more">More</span>
                </div>
            </CopyToClipboard>
        )
    }
}
