import {Button} from "antd";
import {useNavigate} from "react-router-dom";

export const WentWrong = () => {
    const navigate = useNavigate();
    return (
        <div className={"w-full error-page went-wrong"}>
            <Button type={"primary"} size={"large"} className={"ms-7 sm:ms-0"} onClick={() => navigate("/")}>Back to home</Button>
        </div>
    )
}