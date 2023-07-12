import React from 'react';

interface Professional {
  id: string;
  name: string;
  profession: string;
  city: string;
  price: number;
  sessionTime: number;
  avatar: string;
  description: string;
}

interface ProfessionalItemProps {
  professional: Professional;
}

const Profile: React.FC<ProfessionalItemProps> = ({ professional }) => {
  return (
    <div className="profile-container">
      <div className="profile">
        <img src={professional.avatar} alt={professional.name} />
        <h2>{professional.name}</h2>
        <h3>{professional.profession}</h3>
        <p>{professional.city}</p>
        <p>Price: ${professional.price}</p>
        <p>Duration: {professional.sessionTime} minutes</p>
        <p>{professional.description}</p>
      </div>
      <div className="calendar">
        {/* Calendar component here */}
      </div>
    </div>
  );
};

export default Profile;
