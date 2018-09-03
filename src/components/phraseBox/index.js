import React from 'react';

import './index.scss';

const PhraseBox = (props) => {
    return (
        <div className="phraseBox">
            <h2 className="phrase">
                {props.phrase}
            </h2>
        </div>
    )
}

export default PhraseBox