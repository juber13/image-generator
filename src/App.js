import { useEffect, useState } from 'react';
import './App.css';

function App() { 
  const [image , setImage] = useState("");
  const [input , setInput] = useState("dog");
  const [loading , setLoading] = useState(false);

 const fetchApi = async() => {
  try{
    setLoading(true)
    const res = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({ inputs: input }),
    }
    )
    const blob =  await res.blob();
    setImage(URL.createObjectURL(blob))
    setLoading(false)
    console.log(image);
  }catch(err){
    console.log(err)
  }

}

  const handleSubmit  = async(e) => {
     e.preventDefault();
     fetchApi();
  }

useEffect(() => {
  fetchApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[input])
  


  return (
    <div className="App w-4/5 m-auto p-3 flex items-center flex-col justify-between gap-3">
      <div className="search-bar flex items-center justify-center ">
        <form onSubmit={handleSubmit} className='flex w-full'>
          <input type="text" placeholder='search...' className=' rounded-md p-2  border focus:outline-none text-xl' onChange={(e) => setInput(e.target.value)}/>
          <button type='submit' className='p-2 border rounded-md bg-black text-white'>Search!</button>
        </form>
      </div>

      <div className="card m-3">
        <div className="card flex items-center justify-center">
          {loading ? "Loading...." : <img src={image} alt=""  className='rounded shadow-xl' width={400} height={400}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
