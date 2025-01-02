import { useState } from "react";

type starRatingProps = {
  starCount?: number;
};

function StarRating({ starCount = 5 }: starRatingProps) {
  const [selectedStar, setSelectedStar] = useState(0);
  const [hoverSelected, setHoverSelected] = useState(0);
  return (
    <div className="container">
      {new Array(starCount).fill(0).map((_, idx) => {
        return (
          <span
            className={`star ${
              idx < (hoverSelected || selectedStar) && "active"
            }`}
            onClick={() => {
              setSelectedStar(idx + 1);
            }}
            onMouseEnter={() => {
              setHoverSelected(idx + 1);
            }}
            onMouseLeave={() => {
              setHoverSelected(0);
            }}
            title={`${
              idx > 3
                ? idx < 8
                  ? "Its average 😑"
                  : " I loved it 😍"
                : "I hate it 😡"
            } `}
            key={idx}
          >
            ★
          </span>
        );
      })}
      <p>
        {hoverSelected || selectedStar}/{starCount}
      </p>
    </div>
  );
}

export default StarRating;
