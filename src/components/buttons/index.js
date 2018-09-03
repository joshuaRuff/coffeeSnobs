import React from 'react';

import { Button } from 'antd';

import './index.scss';

class Buttons extends React.Component {
    render() {
        return (
            <div className="buttons">
                <Button 
                    className="button"
                    onClick={this.props.clickHandler}
                >
                I like coffee...
                </Button>
            </div>
        );
    }

}

export default Buttons;