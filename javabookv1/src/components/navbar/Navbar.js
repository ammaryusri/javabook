"use client";
import React from "react";
import "./Navbar.css";
import Home from "../../assets/icons/home.png";
import Heart from "../../assets/icons/heart.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({}) => {
  const pathname = usePathname();
  return (
    <div>
      <div className="mobilenav">
        <a
          className={pathname === "/" ? "navbtnactive" : "navbtninactive"}
          href="/"
        >
          <Image src={Home} alt="Home" />
        </a>
        <a
          className={pathname === "/Liked" ? "navbtnactive" : "navbtninactive"}
          href="/Liked"
        >
          <Image src={Heart} alt="Liked" />
        </a>
      </div>
      <div className="destopnav">
        <span className="desktopnavspan">
          <Link href="/" className={pathname === "/" ? "active" : "inactive"}>
            Home
          </Link>
        </span>
        <span>
          <Link
            href="/Liked"
            className={pathname === "/Liked" ? "active" : "inactive"}
          >
            Liked
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
