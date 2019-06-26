import React from 'react';

function ChoiceDialog({choices, setShowChoiceDialog}) {
    function handleClick(choice) {
        choice.onClick();
        setShowChoiceDialog(false);
    }
    return (
        <div className="ChoiceDialogContainer">
            <div className="Overlay"></div>
            <div className="ChoiceDialog">
                {choices.map(choice => <button key={choice.label} onClick={_ => handleClick(choice)}>{choice.label}</button>)}
                <button onClick={_ => setShowChoiceDialog(false)} className="CloseChoiceDialogButton">X</button>
            </div>
        </div>
    )
}


export default ChoiceDialog