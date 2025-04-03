import {useUsers} from "../../hooks/use-users.js";
import {useState} from "react";
import Pagination from "@mui/material/Pagination";
import {useNavigate} from "react-router-dom";
import {usersService} from "../../services/users-service.js";
import {SpinLoader} from "../../components/spin-loader.jsx";
import {PaginationComponent} from "../../components/pagination-component.jsx";
import {Button} from "antd";
import {RegisterPopup} from "../../components/register-popup.jsx";


export const AdminUsers = () => {
    const {users, loading} = useUsers();
    const [userCreate, setUserCreate] = useState(false);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const itemsPerPage = 10;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const showDetails = (id) => navigate(`/admin/users/${id}`);
    const banUser = (id) => usersService.banUser(id);


    return (
        <>

            <div className={`w-full overflow-x-auto overflow-y-hidden relative`}>
                {userCreate && <RegisterPopup isAdmin={true} className={`w-full  bg-transparent absolute m-auto z-30 ${userCreate ? "backdrop-blur-md" : undefined}`}/>}
                {userCreate && <Button className="my-5 z-40"  size={"large"} onClick={() => setUserCreate(false)}>EXIT</Button>}
                {loading ? <SpinLoader spinning={loading} /> :
                <>
                    {!userCreate && <Button className="my-5" type="primary" size={"large"} onClick={() => setUserCreate(true)}>Create
                        User</Button>}
                    <table className="w-full border-collapse rounded-lg shadow-lg table-auto bg-white ">
                        <thead>
                            <tr className="bg-green-600 text-white text-left">
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                    <tbody>
                        {users.slice((page-1)*itemsPerPage, page*itemsPerPage).map((user) => (
                            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100 ">
                                <td className="px-6 py-4">{user.id}</td>
                                <td className="px-6 py-4 break-words whitespace-normal">{user.firstName + " " + user.lastName}</td>
                                <td className="px-6 py-4 ">{user.email}</td>
                                <td className="px-6 py-4 flex flex-col lg:flex-row justify-center gap-2">
                                    <button className="w-full lg:w-1/2 px-3 py-1
                                            text-sm text-white bg-blue-500
                                            hover:bg-blue-600 rounded"
                                            onClick={() => showDetails(user.id)}>
                                        Show details
                                    </button>
                                    <button className="w-full lg:w-1/2 px-3 py-1
                                            text-sm text-white bg-red-500
                                             hover:bg-red-600 rounded"
                                            onClick={() => banUser(user.id)}>
                                        Ban user
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center my-6 text-white">
                    <div className="flex justify-center my-6 text-white">
                        <PaginationComponent totalLength={users.length}
                                             perPage={itemsPerPage} handlePageChange={handlePageChange}
                                             currentPage={page} className={"my-5"} />


                    </div>
                </div>
                </>
                }

            </div>
        </>
    );
}