import {Outlet, useNavigate} from "react-router-dom";
import {UserOutlined, MenuOutlined} from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faList, faUserTie, faInbox, faBell, faComment, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {AdminSideBarButton} from "../components/AdminSideBarButton.jsx";
import {useEffect, useState} from "react";
import {Button, Input} from "antd";
import {AuthProvider} from "../context/auth-context.jsx";
import {ThemeProvider} from "../context/theme-context.jsx";

export const AdminLayout = () => {
    const [open, setOpen] = useState(true);
    const [searchActive, setSearchActive] = useState(false);
    const navigate = useNavigate();
    const handleSideBarOpen = () => {
        setOpen(!open);
    }
    function handleClickOutsideSideBar(event) {
        if (!isSmallScreen) return;
        const sideBar = document.getElementById("side-bar");
        if (sideBar && !sideBar.contains(event.target)) {
            setOpen(false);
        }
    }
    const handleButtonClick = (e, path) => {
        e.stopPropagation();
        navigate(path);
    }

    const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia("(max-width: 1024px)").matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1024px)");
        const handleChange = (e) => setIsSmallScreen(e.matches);

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return (
        <AuthProvider>
            <ThemeProvider>
                <div className={"w-full h-screen overflow-y-hidden"} onClick={(e) => handleClickOutsideSideBar(e)}>
                    {
                        open && (
                            <div id={"side-bar"}
                                 className={"fixed start-0 top-0 w-3xs h-full px-2 py-5 bg-neutral-800 flex flex-col gap-3 z-50 "}>
                                <span className="text-2xl font-bold tracking-wide text-white mx-auto">ADMIN</span>
                                <AdminSideBarButton
                                    label="Users"
                                    icon={<UserOutlined/>}
                                    onClick={(e) => handleButtonClick(e, "/admin/users")}
                                />
                                <AdminSideBarButton
                                    label="Events"
                                    icon={<FontAwesomeIcon icon={faCalendar}/>}
                                    onClick={(e) => handleButtonClick(e, "/admin/events")}
                                />
                                <AdminSideBarButton
                                    label="Categories"
                                    icon={<FontAwesomeIcon icon={faList}/>}
                                    onClick={(e) => handleButtonClick(e, "/admin/categories")}
                                />
                                <AdminSideBarButton
                                    label="Roles"
                                    icon={<FontAwesomeIcon icon={faUserTie}/>}
                                    onClick={(e) => handleButtonClick(e, "/admin/roles")}
                                />
                                <hr className={"mt-2"}/>
                                <AdminSideBarButton
                                    className={"mt-2"}
                                    label={"Users chart"}
                                    onClick={(e) => {handleButtonClick(e, "/admin/users/chart")}}
                                    color={"danger"}
                                />
                                <AdminSideBarButton
                                    label={"Events chart"}
                                    onClick={(e) => {handleButtonClick(e, "/admin/events/chart")}}
                                    color={"danger"}
                                />
                                <AdminSideBarButton
                                    label={"User activity chart"}
                                    className={"mb-2"}
                                    onClick={(e) => {handleButtonClick(e, "/admin/users/chart")}}
                                    color={"danger"}
                                />
                                <hr />
                                <AdminSideBarButton
                                    className={"mt-2"}
                                    label={"Events map tracking"}
                                    onClick={(e) => {handleButtonClick(e, "/admin/map")}}
                                    color={"black"}
                                />
                            </div>
                        )
                    }
                    <div id="navigation" className={`bg-neutral-300 h-14 flex justify-between items-center pe-6 ps-6 ${open ? "lg:ps-72" : undefined}`}>
                        <div className={"flex items-center gap-x-2"}>
                            <MenuOutlined onClick={handleSideBarOpen} className={"text-4xl"}/>
                            <Button onClick={() => navigate("/")}>HOME</Button>
                        </div>
                        <div className={"flex justify-between gap-x-6"}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size={"2xl"} className={"me-5"} onClick={() => setSearchActive(!searchActive)}/>
                            {searchActive && <Input placeholder="Outlined" size={"middle"}/>}
                            <FontAwesomeIcon icon={faInbox} size={"2xl"} />
                            <FontAwesomeIcon icon={faBell}  size={"2xl"}/>
                            <FontAwesomeIcon icon={faComment}  size={"2xl"}/>
                        </div>
                    </div>
                    <div className={`w-full pt-4 px-0 sm:px-6 ${open ? "lg:ps-72" : undefined}`}>
                        <Outlet/>
                    </div>
                </div>
            </ThemeProvider>
        </AuthProvider>
    )
}
