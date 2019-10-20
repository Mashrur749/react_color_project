import React from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {ChromePicker} from "react-color";
import Button from '@material-ui/core/Button';
import DraggableColorBox from "./DraggableColorBox";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator"

const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme
            .transitions
            .create([
                'margin', 'width'
            ], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme
            .transitions
            .create([
                'margin', 'width'
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    content: {
        height: 'calc(100vh - 64px)',
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme
            .transitions
            .create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme
            .transitions
            .create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
        marginLeft: 0
    }
});

class NewPaletteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            currColor: "teal",
            newName: "",
            colors: []
        };

    }

    

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    updateCurrColor = newColor => {
        this.setState({currColor: newColor.hex})
    }

    addNewColor = () => {
        const newColor = {color: this.state.currColor, name: this.state.newName}
        this.setState({
            colors: [
                ...this.state.colors,
                newColor
            ]
        })
    }

    handleChange = e => {
        this.setState({newName: e.target.value})
    }

    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => 
            this.state.colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        
        ValidatorForm.addValidationRule('isColorUnique', (value) => 
            this.state.colors.every(
                ({color}) => color.toLowerCase() !== this.state.currColor.toLowerCase()
            )
        );
    }


    render() {
        const {classes} = this.props;
        const {open} = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                    [classes.appBarShift]: open
                })}>
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Persistent drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                    paper: classes.drawerPaper
                }}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Typography variant="h4">
                        Design your palette
                    </Typography>
                    <div>
                        <Button variant="contained" color="secondary">
                            Clear Palette
                        </Button>
                        <Button variant="contained" color="primary">
                            Random Color
                        </Button>
                    </div>
                    <div className={classes.drawerHeader}/>
                    <Divider/>
                    <ChromePicker
                        color={this.state.currColor}
                        onChangeComplete={this.updateCurrColor}/>
                    <ValidatorForm onSubmit={this.addNewColor}>
                        <TextValidator 
                            value={this.state.newName} 
                            onChange={this.handleChange}
                            validators={[
                                'required', 
                                'isColorNameUnique',
                                'isColorUnique'
                            ]}
                            errorMessages={[
                                'this field is required', 
                                'Color name is not unique',
                                'Color already used'
                            ]}
                        />

                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            style={{
                                backgroundColor: this.state.currColor
                            }}>
                            Add Color
                        </Button>
                    </ValidatorForm >

                </Drawer>
                <main
                    className={classNames(classes.content, {
                    [classes.contentShift]: open
                })}>

                    <div className={classes.drawerHeader}></div>
                    {this
                        .state
                        .colors
                        .map(color => (<DraggableColorBox color={color.color} name={color.name}/>))}

                </main>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm);