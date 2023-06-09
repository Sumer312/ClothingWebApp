import styles from "../../styles/Home.module.css";
import axios from "../../../api/axios";
import { useEffect, useState } from "react";
import Product from "../../components/card";
import { cardType } from "../../../types";
import { Link } from "react-router-dom";
import { Triangle } from "react-loader-spinner";

const params = "Utops";

export default function UnisexTops() {
  const [cards, setCards] = useState<Array<cardType> | undefined>(undefined);
  useEffect(() => {
    axios.get(`/consumer/get/${params}`).then((result) => {
      setTimeout(() => setCards(result.data), 500);
    });
  }, []);
  return cards ? (
    <main className={styles.main}>
      <div className="grid gap-16 xl:grid-cols-4 xl:gap-16 xs:grid-col-1 sm:grid-cols-1 sm:gap-16 md:grid-cols-2 md:gap-16 lg:grid-cols-2 lg:gap-16">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={`/product/${card._id}`}
            style={{ cursor: "pointer" }}
          >
            <Product
              key={index}
              title={card.title}
              snippet={card.snippet}
              description={card.description}
              imageObj={card.coverImage}
              price={card.price}
            />
          </Link>
        ))}
      </div>
    </main>
  ) : (
    <main className={styles.main}>
      <Triangle
        height="200"
        width="200"
        color="hsl(var(--a))"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </main>
  );
}
