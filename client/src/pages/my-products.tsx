import styles from "../styles/Home.module.css";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import Product from "../components/card";
import { cardType } from "../../types";
import { Link } from "react-router-dom";
import useAuthStore from "../components/store/authStore";

export default function MyProds() {
  const [cards, setCards] = useState<Array<cardType> | undefined>(undefined);
  const ID = useAuthStore((state) => state.ID);
  useEffect(() => {
    axios.get(`/seller/get-products/${ID}`).then((result) => {
        console.log(result);
        
      setCards(result.data.products);
    });
  }, [ID]);
  return (
    <main className={styles.main}>
      <div className="grid gap-16 xl:grid-cols-4 xl:gap-16 xs:grid-col-1 sm:grid-cols-1 sm:gap-16 md:grid-cols-2 md:gap-16 lg:grid-cols-2 lg:gap-16">
        {cards &&
          cards.map((card) => (
            <Link
              to={`/edit-product/${card._id}`}
              style={{ cursor: "pointer" }}
            >
              <Product
                title={card.title}
                snippet={card.snippet}
                description={card.description}
                imageObj={card.coverImage}
                price={card.price}
              />
            </Link>
          ))}
      </div>
      <h1>Hello Men Hoodies</h1>
    </main>
  );
}