import {useEffect, useState} from "react";

const hardCategory = [
    {
        "id": 1,
        "name": "Technology"
    },
    {
        "id": 2,
        "name": "Health & Wellness"
    },
    {
        "id": 3,
        "name": "Education"
    },
    {
        "id": 4,
        "name": "Entertainment"
    },
    {
        "id": 5,
        "name": "Sports"
    },
    {
        "id": 6,
        "name": "Travel"
    },
    {
        "id": 7,
        "name": "Food & Drink"
    },
    {
        "id": 8,
        "name": "Finance"
    },
    {
        "id": 9,
        "name": "Automotive"
    },
    {
        "id": 10,
        "name": "Fashion & Beauty"
    }
]


export const useCategories = () => {
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setCategory(hardCategory);
        setIsLoading(false);
    }, []);

    return { category, isLoading };
}