import React from 'react';

import Buttons from './components/buttons';
import Header from './components/header';
import PhraseBox from './components/phraseBox';


import phrases from './config';
class App extends React.Component {
    constructor() {
        super()
        this.state={
            phrase: null,
            number:0,
        }
    }

    clickHandler = () => {
        let num = Math.floor(Math.random() * phrases.goodCoffee.length);

        if(this.state.number === num){
            if(num === 0){
                num++;
            }   else {
                   num--;
                 }
            }
            this.setState({
                phrase: phrases.goodCoffee[num],
                number: num
            });
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