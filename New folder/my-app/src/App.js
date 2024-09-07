

import Avator from "./Avator";

function App() {
  const obj = {
    src: "https://tse1.mm.bing.net/th?id=OIP.5_RtLfTs1XW-oDsdrd1a2gHaEK&pid=Api&P=0&h=180",
    height: "300px",


    
  };

  const objs = {
    src: "https://tse1.mm.bing.net/th?id=OIP.24T00MDK-RUhFnm1Do5PFwHaFj&pid=Api&P=0&h=180",
    height: "300px",


    
  };



  return (
    <>
    
      <Avator src={obj.src} height={obj.height} />
      <Avator src={objs.src} height={objs.height} />
    </>
  );
}

export default App;
