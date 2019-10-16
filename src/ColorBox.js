import React, {Component} from 'react'
import {Link} from "react-router-dom"
import chroma from "chroma-js"
import {CopyToClipboard} from "react-copy-to-clipboard"
import {withStyles} from "@material-ui/styles"

import "./ColorBox.css";

const styles = {
    copyText: {
        color: props => (chroma(props.background).luminance() >= 0.7
            ? "black"
            : "white")
    },
    colorName: {
        color: props => (chroma(props.background).luminance() <= 0.08
            ? "white"
            : "black")
    },
    seeMore: {
        color: props => (chroma(props.background).luminance() >= 0.7
            ? "black"
            : "white"),
        backgroundColor: "rgba(255, 255, 255, .3)",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom: "0px",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase"
    },
    copyButton: {
        color: props => (chroma(props.background).luminance() >= 0.7
            ? "black"
            : "white"),
        cursor: "pointer",
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(100, 100, 100, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        textDecoration: "none",
        opacity: 0
    },
    ColorBox: {
        width: "20%",
        height: props => (
            props.showingFullPalette ? "25%" : "50%"
        ),
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px",
        "&:hover button":{
            opacity: 1,
            transition: ".5s"
        }
    }
}

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        }
    }

    changeCopyState = () => {
        this.setState({
            copied: true
        }, () => {
            setTimeout(() => this.setState({copied: false}), 1500)
        })
    }

    render() {
        const {
            name,
            background,
            id,
            color,
            paletteId,
            classes,
            showingFullPalette
        } = this.props;

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div
                    style={{
                    background
                }}
                    className={classes.ColorBox}>
                    <div
                        style={{
                        background
                    }}
                        className={`copy-overlay ${this.state.copied && "show"}`}></div>
                    <div className={`copy-msg ${this.state.copied && "show"}`}>
                        <h1>Copied to clipboard.</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette && <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation}>
                        <span className={classes.seeMore}>More</span>
                    </Link>
}
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox)