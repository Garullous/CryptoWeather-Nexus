"use client";
import React, { useContext } from "react";
import './Navbar.css';
import Arrow from "./arrow.png";
import logo from "../../../logos/icon.png"

const Navbar = () => {

    return (
        <div className="navbar">
            <img src={logo}    alt="" className="logo"/>
            <h1 className="text-2xl font-semibold text-center mb-6">Dashboard</h1>
            <div className="nav-right">
            </div>
        </div>
    )
}

export default Navbar;