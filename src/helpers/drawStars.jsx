import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const drawStars = (rating) => {
  const roundedRating = Math.round(rating);
  const starPos = Math.floor(roundedRating / 2);

  let stars = [];

  for (let i = 0; i < 10; i += 2) {
    if (i < roundedRating) {
      stars.push(<FaStar key={i} aria-hidden="true" />);
      continue;
    }
    stars.push(<FaRegStar key={i} aria-hidden="true" />);
  }
  if (roundedRating % 2 != 0) {
    stars.splice(starPos, 1, <FaStarHalfAlt key={"half"} aria-hidden="true" />);
  }

  return stars;
};

export default drawStars;
