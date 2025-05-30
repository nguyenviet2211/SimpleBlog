import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Hello from './ClassComponent';
import OtherComponent from "./OtherComponent";
import reportWebVitals from './reportWebVitals';
import API from './API';
import SPA from './SinglePageApp';

function ReactBasic() {
  const [message, setMessage] = useState('');

  // Tao 1 ham de component con gui ve cho component cha
  const handleMessage = (msg) => {
    setMessage(msg);
  };

  return (
    <React.StrictMode>
      <App name="Viet" sendMessage={handleMessage} />
      <Hello />
      <OtherComponent prop={message} />
    </React.StrictMode>
  );
}

function APIExample(){
  return (<API/>);
}

function SinglePageApplication(){
  return (<SPA />);
}

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(<SinglePageApplication />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
