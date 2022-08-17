import { Outlet } from "react-router-dom"
import ResponsiveAppBar from "./Components/AppBar"

export const Layout = () => {
    return <div><ResponsiveAppBar /><Outlet /></div>
}