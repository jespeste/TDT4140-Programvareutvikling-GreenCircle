import "./darkMode.css"
import React, {useState} from "react";


function DarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleDarkModeToggle = () => {
        setIsDarkMode(!isDarkMode);
    }
    return (
        <div className={isDarkMode ? "darkMode" : ""}>
            <button onClick={handleDarkModeToggle}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>

        </div>
    )
}
export default DarkMode; 

// import './darkMode.css';
// import { ChangeEventHandler } from 'react';
// import { useToggle } from '@mantine/hooks';

// const setDark = () => {
//     localStorage.setItem("theme", "dark");
//     document.documentElement.setAttribute("data-theme", "dark");
// };

// const setLight = () => {
//     localStorage.setItem("theme", "light");
//     document.documentElement.setAttribute("data-theme", "light");
// };

// const storedTheme = localStorage.getItem("theme");

// const defaultLight =
//   storedTheme === "light";

// if (defaultLight) {
//     setLight();
// }

// const toggleTheme: ChangeEventHandler<HTMLInputElement> = (e) => {
//     if (e.target.checked) {
//       setDark();
//     } else {
//       setLight();
//     }
//   };

// const DarkMode = () => {
//     return (
//         <div className="darkmodeDiv">
//             <label className="darkmode" htmlFor="checkbox">
//                 <input
//                     id="checkbox"
//                     onChange={toggleTheme}
//                     defaultChecked={defaultLight}
//                 />
//             </label>

//         </div>
//     )
// }
// export default function DarkMode() {
// 	return (
//         <div>test</div>

//     )
// }
