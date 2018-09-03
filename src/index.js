import React from 'react';

import Buttons from './components/buttons';
import Header from './components/header';
import PhraseBox from './components/phraseBox';

import phrases from './config';
class App extends React.Component {
    constructor() {
        super()
        this.state={
            phrase: null
        }
    }

    clickHandler = () => {
        //let num = Math.floor(Math.random() * 20);

        this.setState({phrase: phrases.goodCoffee[0]});
    }

    render() {
        const { phrase } = this.state;

        return (
            <div>
                <div className="title">
                    <Header />
                </div>
                <div>
                    <PhraseBox phrase={phrase}/>
                </div>
                <div className="input">
                    <Buttons 
                        clickHandler={this.clickHandler}
                    />
                </div>
            </div>
        );
    }
}

export default App;