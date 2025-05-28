import { useForm } from "react-hook-form";
import StarRating from "./StarRating";

const ReviewForm = ({ onSubmit }) => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const ratingValue = watch("rating");

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating *
        </label>
        <div className="flex items-center space-x-2">
          <StarRating
            rating={ratingValue}
            onChange={(val) => setValue("rating", val, { shouldValidate: true })}
          />
          <span className="text-sm text-gray-500">
            {ratingValue > 0 ? `${ratingValue} star${ratingValue > 1 ? 's' : ''}` : 'No rating'}
          </span>
        </div>
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">Rating is required</p>
        )}
        <input type="hidden" {...register("rating", { required: true, min: 1 })} />
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Review *
        </label>
        <textarea
          {...register("comment", { required: true, minLength: 10 })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-24"
          placeholder="Share your experience... (minimum 10 characters)"
        />
        {errors.comment && (
          <p className="text-red-500 text-sm mt-1">
            {errors.comment.type === 'required' ? 'Comment is required' : 'Comment must be at least 10 characters'}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;