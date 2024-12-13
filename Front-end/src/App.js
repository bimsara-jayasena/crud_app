import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./App.css";


function App() {
  const [data, setData] = useState([]);
  const [click,setClick]=useState(false);
  const [fname,setfname]=useState();
  const [age,setage]=useState();
  const [update,setUpdate]=useState(false);
  const [remove,setRemove]=useState(false);
  const [editRowId,setEditRowId]=useState();
  const fetchData=()=>{
    axios.get("http://localhost:5555/all").then((res) => {
      setData(res.data);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handlesubmit=async()=>{
    try{
      
      await axios.post('http://localhost:5555/add',{
        name:fname,
        age:age
      });
      fetchData();
      setClick(false);
    }catch(error){
      console.log(error)
    }
  }
  const handleUpdate=async(id)=>{
    try{
      await axios.put(`http://localhost:5555/update/${id}`,{
        name:fname,
        age:age
      });
      alert("record updated");
      fetchData();
      setUpdate(false);
    }catch(error){
      console.log(error);
    }
   
  }
  const handleDelete=async(id)=>{
    try{
      await axios.put(`http://localhost:5555/remove/${id}`);
      fetchData();
      alert("record deleted");
    }catch(error){
      console.log(error);
    }
  }
  const allowEdit=(id)=>{
    setUpdate(true);
    setEditRowId(id);
   
  }
  return (
    <div className="container">
     <div >
      <div className="btn-container"> <button onClick={()=>setClick(true)} className="btn-add">add</button></div>
      <table border={1} className="table">
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th colSpan={2}>Action</th>
        </tr>
        {data ? data.map((user,index) => 
              
                update&&editRowId==index ?  
                <tr>
                  <th><input type="text" value={fname} onChange={(e)=>setfname(e.target.value)}></input></th>
                  <th><input type="number" value={age} onChange={(e)=>setage(e.target.value)}></input></th>
                  <th colSpan={2}><button onClick={()=>{handleUpdate(user.id)}} className="btn-add">save</button></th>
                </tr> :
                <tr>
                <th>{user.name}</th>
                <th>{user.age}</th>
                <th><button onClick={()=>allowEdit(index)}className="btn-update">update</button></th>
                <th><button onClick={()=>handleDelete(user.id)} className="btn-delete"> delete</button></th>
              </tr>
          ) : null}
        {
          click ? (
            <tr>
            <th><input type="text" value={fname} onChange={(e)=>setfname(e.target.value)}></input></th>
            <th><input type="number" value={age} onChange={(e)=>setage(e.target.value)}></input></th>
            <th colSpan={2}><button onClick={handlesubmit} className="btn-update">save</button></th>
          </tr>):null
        }
      </table>
     </div>
    </div>
  );
}

export default App;
