import { useEffect, useState } from "react";


//Hook personaliser sur la recuperation de chaque postes : 
export default function UseFetchGet(url) {
    
    const [postList, setPostList] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const token = localStorage.getItem("TOKEN");


    useEffect(() => {

      setTimeout(() => {
        fetch(url, {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        })
             

        .then(response => {
            if(!response.ok){
                throw Error('Désole une erreur est survenu ...')
            }
            return response.json()
        })


        .then(data => {
            console.log(data)
            setPostList(data);
            setLoading(false)
            setError(false)
        })


        .catch(error => {
            console.log(error.message)
            setError(true)
            setLoading(false)
        });

      }, 1000);


    }, [token, url]);


    return {loading, postList, error};
}
