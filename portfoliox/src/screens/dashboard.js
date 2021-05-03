import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/authActions";

function Dashboard() {
    const User = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onLogOut = e => {
        e.preventDefault();
        dispatch(logoutUser());
    }
    return (
        <div>
            <button onClick={onLogOut}>LOG OUT</button>
        </div>
    )
}

export default Dashboard;