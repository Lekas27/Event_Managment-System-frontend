import { useEffect, useState } from "react";
import {usersService} from "../services/users-service.js";


export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const response = await usersService.getUsers();
                setUsers(response.users);
            }catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);
    return { users, loading };
};

export const useUser = (id) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            try{
                const response = await usersService.getUserById(id);
                setUser(response.user);
            }catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [id]);
    return { user, loading };
}
