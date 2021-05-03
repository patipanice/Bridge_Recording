import React from 'react';
import ReactTypingEffect from 'react-typing-effect';

function ReactTypingEffects() {
  return (
    <>
      <ReactTypingEffect
        text={["RECORD VIA RFID", "Let's PLAY !!"]}
        cursorRenderer={cursor => <h1>{cursor}</h1>}
        displayTextRenderer={(text, i) => {
          return (
            <h3>
              {text.split('').map((char, i) => {
                const key = `${i}`;
                return (
                  <span
                    key={key}   
                  >{char}</span>
                );
              })}
            </h3>
          );
        }}        
      />
    </>
  );
};

export default ReactTypingEffects;