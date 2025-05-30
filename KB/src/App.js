import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import './App.css';


// this is function component
// truyen prop vao component
function App({name, sendMessage}) {
  const N = name;
  // use state
  const [count, setCount] = useState(0);
  const [Myname, setName] = useState(N);

  function changeName(name){
    setName(name);
  }
  // truyen vao useEffect 1 ham an danh va mang cac phan tu
  // Ham se duoc thuc hien neu cac gia tri trong mang phan tu thay doi
  useEffect ( () => {
    document.title = count + " " + Myname;
    sendMessage(Myname);
  }, [Myname, count]);

  //dung use form cho don gian
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  // bien data la du lieu cua form duoc tu dong truyen vao
  const onSubmit = (data) => {
    alert(`${data.email} \n${data.password}`);
  };

  return (
    <div className="App">
      <h1 style={{color: 'red'}}>Hello world<div>div card</div></h1>
      <div>my name : {N}</div>
      <div>my name (this can change) : {Myname}</div>
      <input id = "name"/> 
      <button onClick={() => changeName(document.getElementById("name").value)}>Change Name</button> 
      <br/>
      <input placeholder='live change' onChange={e => setName(e.target.value)}></input>
      <br/><span style={{margin: 10}}>counter : {count}</span>  
      <button onClick={() => setCount(count + 1)}>Increase</button>

      <div>Form example</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
        {errors.email && <p style={{color: 'red'}}>Email is required and must be valid</p>}
        <label>Password</label>
        <input type="password" {...register("password", { required: true })} /> 
        {errors.password && <p style={{color: 'red'}}>Password is required</p>}
        <button type="submit">Submit</button> 
      </form>



    </div>
  );
}

export default App;
