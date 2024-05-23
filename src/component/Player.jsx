import {useState} from "react";

export default function Player({name, symbol, isActive, handleSave}) {
    const [playerName, setplayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);
    function handleClick() {
        setIsEditing((isEditing) => !isEditing);
        if(isEditing) {
            handleSave(symbol, playerName);
        }
    }
    let NameElement = <span className="player-name"> {playerName}</span>;
    if(isEditing) {
        NameElement = <input type="text" required value={playerName} onChange={(val) => handleChange(val)}/>;
    }
    function handleChange(event) {
        setplayerName(event.target.value);
    }

    return (
        <li className={isActive ? "active" : ""} >
            <span className="player">
                {NameElement}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => handleClick()}>{isEditing ? "Save" :  "Edit"}</button>
        </li>
    );
}