import React, { useState } from "react";
import { HalfStar } from "../../assets/halfStar";
import { FullStar } from "../../assets/fullStar";
import { EmptyStar } from "../../assets/emptyStar";

export interface Review {
  reviewer: string;
  rating: number;
  review: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const calculateAverageRating = (): number => {
    let totalRatings = 0;
    for (const review of reviews) {
      totalRatings += review.rating;
    }
    const averageRating = totalRatings / reviews.length;
    return Math.round(averageRating * 10) / 10;
  };

  const renderStars = (rating: number): React.ReactNode => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    const starIcons: React.ReactNode[] = [];

    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<FullStar />);
    }

    if (halfStar) {
      starIcons.push(<HalfStar />);
    }

    for (let i = 0; i < emptyStars; i++) {
      starIcons.push(<EmptyStar />);
    }

    return starIcons;
  };

  return (
    <div>
      <div className="reviews_button" onClick={openModal}>
        <div className="reviews_button_stars">{renderStars(calculateAverageRating())}</div>
        <div className="reviews_button_count">({reviews.length} reviews)</div>
      </div>
      {modalOpen && (
        <div className="reviews_modal">
          <div className="reviews_modal_content">
            <span className="reviews_modal_close" onClick={closeModal}>
              X
            </span>
            <h2 className="reviews_modal_title">Reviews</h2>
            {reviews.map((review, index) => (
              <div className="reviews" key={index}>
                <div className="reviews_rating">
                  {renderStars(review.rating)}
                </div>
                <div className="reviews_details">
                  <div className="reviews_reviewer">{review.reviewer}</div>
                  <div className="reviews_text">{review.review}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
