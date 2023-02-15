//Denne må være her hvis du skal ha interaktivitet atm
"use client"

export default function HomePage() {
  const someStuff = ['hei','hallo','ok'];

  function handleClick(){
    console.log("hello");
  }

  return (
      <>
        <h1>Hello</h1>
        <ul>
          {someStuff.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <button className="border-2px" onClick={handleClick}>Yes</button>
        <div>
        <a href="/login">Link moment</a>
        </div>
      </>
    );
  }
