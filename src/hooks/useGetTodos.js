import React, { useEffect, useState } from 'react'

export default function useGetTodos(url) {

    const [todos , setTodos] = useState([]);

    useEffect(()=>{
        fetch(url).
        then(res => res.json()).
        then(data => setTodos(data));
    },[])

    return todos;  
}
