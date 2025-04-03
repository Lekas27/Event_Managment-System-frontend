import {Button} from "antd";


export const AdminSideBarButton = ({icon, label, className, onClick, variant="outlined", color="primary"}) => {
    return (
        <Button variant={variant}  color={color} type={"primary"} ghost
                size={"large"} className={"w-full flex " + className}
                onClick={onClick}>
            {icon && <span className={"shrink-0"}>{icon}</span>}
            <span className={"mx-auto"}>{label}</span>
        </Button>
    );
}