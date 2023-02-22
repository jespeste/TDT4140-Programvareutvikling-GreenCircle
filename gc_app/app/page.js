//Denne må være her hvis du skal ha interaktivitet atm
"use client"

import './homepage.css';
import { best1still } from './login/anotha';

export default function HomePage() {
  const someStuff = ['hei','hallo','ok'];

  function handleClick(){
    console.log("hello");
    return best1still();

  }

  return (
      <>
        <h1>Hello</h1>
        <ul>
          {someStuff.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <button onClick={handleClick}>Yes</button>
        <div>
        <a href="/login">Link moment</a>
        </div>
        <div>
          <a href='/anotha'>best1still</a>
        </div>
      </>
    );
  }
