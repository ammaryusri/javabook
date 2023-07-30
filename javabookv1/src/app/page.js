"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/card/Card";
import Image from "next/image";
import "../styles/Home.css";
import Redheart from "../assets/icons/redheart.png";
import Emptyheart from "../assets/icons/emptyheart.png";
import Preloader from "@/components/preloader/Preloader";

export default function Home() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //** MOCK-ARRAY FOR DATA PRESENTATION */
  const itemsList = [
    {
      key: 1,
      profileImg: "https://i.ibb.co/mNgPtdH/newa.jpg",
      title: "Ammar Yusri",
      productImg:
        "https://i.ibb.co/T4LxzxR/chad-montano-GFCYho-Re48-unsplash.jpg",
      productName: "Burger",
      price: "AED 19.99",
      details: "Crispy chicken burger",
      hastag: "#food #burger #chicken",
      likecount: 32,
      commentCount: 12,
    },
    {
      key: 2,
      profileImg:
        "https://i.ibb.co/F5kGzg3/ethan-hoover-0-YHIlxe-Cuhg-unsplash.jpg",
      title: "John Kumar",
      productImg:
        "https://i.ibb.co/YD64b0G/pablo-pacheco-D3-Mag4-BKqns-unsplash.jpg",
      productName: "Pizza",
      price: "AED 39.99",
      details: "Crispy chicken pizza",
      hastag: "#food #pizza #chicken",
      likecount: 21,
      commentCount: 11,
    },
    {
      key: 3,
      profileImg:
        "https://i.ibb.co/pfqrT4R/mubariz-mehdizadeh-t3zr-Em88ehc-unsplash.jpg",
      title: "Ajith Kumar",
      productImg:
        "https://i.ibb.co/K5Gxj5f/charanjeet-dhiman-Qo-Bj6b-VQSK0-unsplash.jpg",
      productName: "Puding",
      price: "AED 9.99",
      details: "Straberry puding",
      hastag: "#Colofull #puding #straberry",
      likecount: 23,
      commentCount: 10,
    },
    {
      key: 4,
      profileImg:
        "https://i.ibb.co/pfqrT4R/mubariz-mehdizadeh-t3zr-Em88ehc-unsplash.jpg",
      title: "Niluka Jaya",
      productImg: "https://i.ibb.co/gdyx1Dt/ben-lei-fl-Fd8-L7-B3g-unsplash.jpg",
      productName: "Pasta",
      price: "AED 59.99",
      details: "Cheese Pasta",
      hastag: "#food #pasta #cheese",
      likecount: 45,
      commentCount: 9,
    },
    {
      key: 5,
      profileImg:
        "https://i.ibb.co/F5kGzg3/ethan-hoover-0-YHIlxe-Cuhg-unsplash.jpg",
      title: "Nalaka Jeewa",
      productImg:
        "https://i.ibb.co/vQNWpLr/damir-samatkulov-Amn-S6-Lx0324-unsplash.jpg",
      productName: "Buffet",
      price: "AED 99.99",
      details: "Shangrilla Buffet",
      hastag: "#food #buffet #cheese",
      likecount: 45,
      commentCount: 14,
    },
  ];

  useEffect(() => {
    fetchFavorites();
  }, []);

  //** FETCH FAV LOGIC IMPLEMENTED */
  const fetchFavorites = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/favorites");
      const data = await res.json();
      setFavorites(data);
      setIsLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setIsLoading(false); // Set loading to false in case of an error
    }
  };

  //** POST FAV LOGIC IMPLEMENTED */
  const toggleFavorite = async (item) => {
    try {
      const res = await fetch("http://localhost:5000/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item }),
      });
      const data = await res.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="loadercontainer">
          <Preloader />
        </div>
      ) : (
        <div>
          <h1 className="appHeading">Welcome Home</h1>
          <div className="mt-8 grid lg:grid-cols-3 gap-10">
            {itemsList.map((item) => (
              <Card
                key={item.key}
                title={item.title}
                profileImg={item.profileImg}
                productImg={item.productImg}
                productName={item.productName}
                price={item.price}
                details={item.details}
                hastag={item.hastag}
                likecount={item.likecount}
                commentCount={item.commentCount}
              >
                <button className="favbtn" onClick={() => toggleFavorite(item)}>
                  {favorites.some((favItem) => favItem.key === item.key) ? (
                    <Image className="favicon" src={Redheart} alt="Redheart" />
                  ) : (
                    <Image
                      className="favicon"
                      src={Emptyheart}
                      alt="Emptyheart"
                    />
                  )}
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
