// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import {useState} from 'react';

const App = () => {
  const [data, setData] = useState("None");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleClick = name => async () => {
    setIsLoading(true);

    console.log(name)

    let formData = new FormData();
    formData.append('action', name);
    // formData.append('password', 'John123');

    try {
      const response = await fetch('http://192.168.50.93:6001/actions', {
        body:formData, 
        method: 'post',
        headers: {
          Accept: 'application/json',
          "Access-Control-Allow-Origin":'*',
        },
        
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result);
    } catch (err) {
      console.log(err.message)
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(data);

  var button_css = "bg-transparent m-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex-none w-14 h-14"
  var button_flex_box_css = "flex mb-3"
  var page_flex_box_css = "flex mb-2"
  var empty_space_button_css = "m-1 w-14 h-14"

  return (
    <div class={page_flex_box_css}>
      {err && <h2>{err}</h2>}

      {/* <div class="h-1/3"></div> */}
      {/* <div class="w-1/2"></div> */}

      <div class="w-1/2 h-1/3">
        <img src="http://192.168.50.93:9000/stream.mjpg"></img>
      </div>
      
      <div class="w-1/2">
        <div  class={button_flex_box_css}>
          <div class={empty_space_button_css}></div>
          <button class={button_css} onClick={handleClick("w")}>^</button>
          <div class={empty_space_button_css}></div>

        </div>
        <div  class={button_flex_box_css}>
          <button class={button_css} onClick={handleClick("a")}>{"<"}</button>
          <button class = {button_css} onClick={handleClick(" ")}>-</button>
          <button class = {button_css} onClick={handleClick("d")}>{">"}</button>
        </div>
        <div  class={button_flex_box_css}>
          <div class={empty_space_button_css}></div>
          <div class="justify-center"><button class={button_css} onClick={handleClick("s")}>v</button></div>
          <div class={empty_space_button_css}></div>
        </div>
        <div class={button_flex_box_css}>
          <button class = {button_css} onClick={handleClick("4")}>PL</button>
          <div class={empty_space_button_css}></div>
          <button class = {button_css} onClick={handleClick("6")}>PH</button>
      </div>

      </div>
      

      





      {isLoading && <h2>Loading...</h2>}

      {/* {data.data.map(person => {
        return ( */}
        <div><h2>{data.status}</h2></div>

          
        {/* );
      })} */}
    </div>
  );
};

export default App;
