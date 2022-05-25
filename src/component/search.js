
import './search.css';
import axios from 'axios';
import ImageResults from './imagereesult';
import React,{ useState,useEffect  } from 'react';

const Search = ()=>{
    let mystate={
        searchText:'',
        apiUrl:'https://pixabay.com/api',
        apiKey:'17241914-90da7b93c0ccceb734849dcd1',
        images:[]
    };

    const [state , updateState] = useState(mystate);

     useEffect(() => {
         console.log(state);

        if(state.searchText==='')
        {
            updateState({...state , images:[] });
        }
        else{
        console.log(`${state.apiUrl}/?key=${state.apiKey}&q=${
            state.searchText
        }&image_type=photo&safesearch=true`)
        axios
        .get(
            `${state.apiUrl}/?key=${state.apiKey}&q=${
                state.searchText
            }&image_type=photo&safesearch=true`
        )
        .then(res=>updateState({...state , images:res.data.hits}))
        .catch(err=>console.log(err));
        }
        console.log(state.images);
        
       },[state.searchText]);


    let onTextChange=(e)=>{
            updateState({...state , searchText: e.target.value });
            console.log(state);
    
    };
    return(
        <div>
            <div className="topnav">
                <a className="active" href="#home">My Gallary</a>
                <input type="text"  value={state.searchText} onChange={onTextChange} placeholder="Search.." />
                <a className = "inactive" href="#about">Login</a>
                <a className = "inactive" href="#contact">Sign Up</a>
            </div>
            {state.images.length>0?(<ImageResults images={state.images}/>):null}
            
        </div>
    )
}

export default Search;