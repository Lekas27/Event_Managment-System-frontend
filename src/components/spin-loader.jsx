import {Spin} from "antd";


export const SpinLoader = ({fullscreen=true, spinning=true}) => {
    return (<Spin spinning={spinning} fullscreen={fullscreen} size={"large"} />)
}