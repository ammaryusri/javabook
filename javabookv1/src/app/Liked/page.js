"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/card/Card";
import Image from "next/image";
import Redheart from "../../assets/icons/redheart.png";
import Emptyheart from "../../assets/icons/emptyheart.png";
import "../../styles/Home.css";
import Preloader from "@/components/preloader/Preloader";

export default function Liked() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  //** FETCH FAV LOGIC IMPLEMENTED */
  const fetchFavorites = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/favorites");
      const data = await res.json();
      setFavorites(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setIsLoading(false);
    }
  };

  //** REMOVE FAV LOGIC IMPLEMENTED */
  const removeFromFavorites = async (itemId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/favorites/${encodeURIComponent(itemId)}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      console.log("Data received after deletion:", data);
      setFavorites(data);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return (
    <div>
      {" "}
      {isLoading ? (
        <div className="loadercontainer">
          <Preloader />
        </div>
      ) : (
        <div>
          <h1 className="appHeading">Favorites</h1>
          {favorites.length > 0 ? (
            <div className="mt-8 grid lg:grid-cols-3 gap-10">
              {favorites.map((item) => (
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
                  <button
                    className="favbtn"
                    onClick={() => removeFromFavorites(item.key)}
                  >
                    {favorites.some((favItem) => favItem.key === item.key) ? (
                      <Image
                        className="favicon"
                        src={Redheart}
                        alt="Redheart"
                      />
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
          ) : (
            <p className="emptymessage">No items in favorites yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
