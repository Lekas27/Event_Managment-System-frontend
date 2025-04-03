import {Button} from "antd";
import {useNavigate} from "react-router-dom";

export const Error404 = () => {
    const navigate = useNavigate();
    return (
        <div className={"w-full error-page error-404-page"}>
            <Button type={"primary"} size={"large"} className={"ms-7 sm:ms-0"} onClick={() => navigate("/")}>Back to home</Button>
        </div>
    )
}