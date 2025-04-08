import { useEffect, useState } from "react";
import { usersService } from "../services/users-service.js";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await usersService.getUsers();
        setUsers(response.users);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  return { users, loading };
};

export const useUser = (id) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await usersService.getUserById(id);
        console.log("User response:", response);
        setUser(response); // Ažurira state
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // Ovaj useEffect se aktivira kada `user` bude promenjen
  useEffect(() => {
    console.log("this is user", user); // Ovde ćeš dobiti ažurirani `user`
  }, [user]); // Ovaj efekat se poziva svaki put kada se `user` promeni

  return { user, loading };
};

export const banUser = async (id) => {
  try {
    await usersService.deleteUserById(id);
    alert("User has been banned (deleted)");
    window.location.reload();
  } catch (err) {
    console.error("Failed to delete user:", err);
    alert("Error banning user");
  }
};
