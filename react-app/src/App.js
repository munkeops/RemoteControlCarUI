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
    if(name==="msg"){
      var text = document.getElementById("input").value
      formData.append('msg',text)
    }
    // formData.append('password', 'John123');

    try {
      var pi_ip = "192.168.50.94"
      var desktop_ip = "192.168.50.178"

      const response = await fetch('http://'+pi_ip+':6001/actions', {
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
      setErr(false);
    } catch (err) {
      console.log(err.message)
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(data);

  var button_css = "bg-transparent m-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex-none w-12 h-12"
  var button_flex_box_css = "flex mb-1 w-1/3"
  var info_flex_box_css = ""

  var page_flex_box_css = "flex flex-col sm:flex-row"
  var empty_space_button_css = "mx-0 flex-none w-14 h-14"

  return (
    <div class={page_flex_box_css}>
      

      {/* <div class="h-1/3"></div> */}
      {/* <div class="w-1/2"></div> */}

      <div class="w-full sm:w-1/2">
        <img src="http://192.168.50.94:9000/stream.mjpg"></img>
      </div>
      
      <div class="w-full flex justify-center sm:w-1/2">
      {/* <div  class="w-1/2"></div> */}

        <div  class="flex flex-col justify-center">
          <div  class={button_flex_box_css}>
            <div class={empty_space_button_css}></div>
            <button class={button_css} onClick={handleClick("forward")}>^</button>
            <div class={empty_space_button_css}></div>

          </div>
          <div  class={button_flex_box_css}>
            <button class={button_css} onClick={handleClick("left")}>{"<"}</button>
            <button class = {button_css} onClick={handleClick("stop")}>-</button>
            <button class = {button_css} onClick={handleClick("right")}>{">"}</button>
          </div>
          <div  class={button_flex_box_css}>
            <div class={empty_space_button_css}></div>
            <button class={button_css} onClick={handleClick("backward")}>v</button>
            <div class={empty_space_button_css}></div>
          </div>
          <div class={button_flex_box_css}>
            <button class = {button_css} onClick={handleClick("PL")}>PL</button>
            <button class = {button_css} onClick={handleClick("msg")}>T</button>

            {/* <div class={empty_space_button_css}></div> */}
            <button class = {button_css} onClick={handleClick("PH")}>PH</button>
          </div>
          <div class="w-14">
            <div class="relative h-10 w-full min-w-[200px]">
              <input
                class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" " id="input"
              />
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Msg
              </label>
            </div>
          </div>
          <div class={info_flex_box_css}>
              {isLoading &&<div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
              <div class="flex">
                <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                  <p class="font-bold">Loading...</p>
                  {/* <p class="text-sm">Make sure you know how these changes affect you.</p> */}
                </div>
              </div>
            </div>}
            {/* {!err && !isLoading && data.status && <div class="bg-transparent  border-teal-500 rounded-b text-teal-900 px-4 py-3" role="alert"> */}
            {!err && !isLoading && data.status && <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">

              <div class="flex">
                <div class="py-1"><svg class=" fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                  <p class="font-bold">Status : {data.status}</p>
                  <p class="font-bold">Battery: {data.pi_data.battery}</p>
                  <p class="font-bold">Cpu Temp: {data.pi_data.cpu_temperature}</p>
                  <p class="font-bold">Gpu Temp: {data.pi_data.gpu_temperature}</p>
                  <p class="font-bold">{data.pi_data.ws1}</p>
                  <p class="font-bold">{data.pi_data.ws2}</p>





                  {/* <p class="text-sm">Make sure you know how these changes affect you.</p> */}
                </div>
              </div>
            </div>}
            {!isLoading && err &&<div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
              <div class="flex">
                <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                  <p class="font-bold">{err}</p>
                  {/* <p class="text-sm">Make sure you know how these changes affect you.</p> */}
                </div>
              </div>
          </div>}
          
          {/* {isLoading && <h2>Loading...</h2>} */}
          {/* <h2>{data.status}</h2> */}
          {/* {err && <h2>{err}</h2>} */}
        </div>

        </div>
       

      </div>
    </div>
  );
};

export default App;
