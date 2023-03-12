import {useEffect, useState } from "react";

const useFetch = (search) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("search", search);
        fetch(`https://mdblist.p.rapidapi.com?s=${search}`, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': 'fd1eb7c266msh3aadcb7ffdbd201p191836jsnecbd85b1dbd4',
                'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.message) {
                    setError(res.message);
                } else {
                    setData(res.search ?? []);
                }
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setError(err.toString());
            });
    }, [search]);

    return [data, loading, error];
};
export {useFetch};
