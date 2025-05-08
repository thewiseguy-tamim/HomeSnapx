import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, onChange }) => {
  const handleClick = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`cursor-pointer text-lg ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;