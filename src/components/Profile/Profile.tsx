import React from "react";
import "./Profile.css";
import Reviews, { Review } from "../Reviews/Reviews"
import { Schedule } from "../Schedule/Schedule"
export interface Professional {
  id: string;
  name: string;
  profession: string;
  city: string;
  price: number;
  sessionTime: number;
  avatar: string;
  description: string;
  reviews: Review[];
  schedule: Schedule[];
}

interface ProfessionalItemProps {
  professional: Professional;
}

const Profile: React.FC<ProfessionalItemProps> = ({ professional }) => {
  return (
    <div className="profile-container">
      <div className="profile">
        <div className="profile_top">
          <img
            src={professional.avatar}
            alt={professional.name}
            className="profile_avatar"
          />
          <div className="profile_information">
            <h2 className="profile_name">{professional.name}</h2>
            <h3 className="profile_profession_and_location">
              <div className="profile_profession">
                {professional.profession}
              </div>
              <div className="profile_location"> | {professional.city}</div>
            </h3>
            <Reviews reviews={professional.reviews} />
            <div className="profile_price_and_sessionTime">
              <div className="profile_price"> R${professional.price}</div>
              <div className="profile_sessionTime">
                {" "}
                / {professional.sessionTime} minutes
              </div>
            </div>
          </div>
        </div>
        <p className="profile_description">{professional.description}</p>
      </div>
      <div className="schedule">
      </div>
    </div>
  );
};

export default Profile;
