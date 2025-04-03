import {useEffect, useState} from "react";

const hardRoles = [
    {
        id: 1,
        name: "Admin"
    },
    {
        id: 2,
        name: "User"
    },
    {
        id: 3,
        name: "Guest"
    }
]

export const useRoles = () => {
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setRoles(hardRoles);
        setIsLoading(false);
    }, []);

    return { roles, isLoading };
}