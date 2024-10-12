import { useState, useEffect } from "react";
import Button from "../button/button";
import "./card.css";

const Card = (props) => {
  const [count, setCount] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const { course, onAddItem, onRemoveItem } = props;

  const getTelegramImageUrl = async (fileId) => {
    const response = await fetch(
      `https://api.telegram.org/bot7838539243:AAHaTHA0bnj48cpIyEqjNJvYCqtX2S3Bkg8/getFile?file_id=${fileId}`
    );
    const data = await response.json();
    if (data.ok) {
      const filePath = data.result.file_path;
      return `https://api.telegram.org/file/bot7838539243:AAHaTHA0bnj48cpIyEqjNJvYCqtX2S3Bkg8/${filePath}`;
    }
    return "";
  };

  useEffect(() => {
    const fetchImage = async () => {
      if (course?.img) {
        const url = await getTelegramImageUrl(course.img);
        setImageUrl(url);
      }
    };
    fetchImage();
  }, [course?.img]);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    onAddItem(course);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
    onRemoveItem(course);
  };

  return (
    <div className="card">
      <span className={`${count !== 0 ? "card__badge" : "card__badge-hidden"}`}>
        {count === 0 ? "" : count}
      </span>

      <div className="image__container">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={course.title}
            width={"100%"}
            height={"230px"}
          />
        ) : (
          <p>Loading image...</p>
        )}
      </div>

      <div className="card__body">
        <h2 className="card__title">{course.title}</h2>
        <div className="card__price">
          {course.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </div>

      <div className="hr"></div>

      <div className="btn__container">
        <Button title={"+"} onClick={handleIncrement} type={"add"} />
        {count !== 0 && (
          <Button title={"-"} type={"remove"} onClick={handleDecrement} />
        )}
      </div>
    </div>
  );
};

export default Card;
