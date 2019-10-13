import React, { Component } from 'react'
import {Route, Switch} from "react-router-dom"
import Palette from "./Palette"
import seedColors from "./seedColors"
import {generatePalette} from "./colorHelpers"

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/"/>
        <Route exact path="/palette/:id"
          render={() => <h1>Something</h1>}
        />
      </Switch>
      // <div>
      //   <Palette palette={generatePalette(seedColors[4])}/>
      // </div>
    )
  }
}
