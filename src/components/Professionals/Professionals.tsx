import React, { useEffect, useState } from 'react';
import { db } from '../../utils/firebase';
import { query, getDocs, QueryDocumentSnapshot, collectionGroup, collection } from 'firebase/firestore';
import Profile, { Professional, Review, Schedule } from '../Profile/Profile';
import './Professionals.css';

const Professionals: React.FC = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const queryProfessionals = await getDocs(query(collection(db, 'professionals')));
        const queryReviews = await getDocs(query(collectionGroup(db, 'reviews')));
        const querySchedule = await getDocs(query(collectionGroup(db, 'schedule')));

        const professionalsData: Professional[] = queryProfessionals.docs.map(
          (doc: QueryDocumentSnapshot) => ({
            ...(doc.data() as Professional),
            reviews: [] as Review[],
            schedule: [] as Schedule[],
          })
        );

        queryReviews.forEach((doc: QueryDocumentSnapshot) => {
          const professionalId = doc.ref.parent.parent?.id;

          if (professionalId) {
            const professionalIndex = professionalsData.findIndex((prof) => prof.id === professionalId);

            if (professionalIndex !== -1) {
              professionalsData[professionalIndex].reviews.push(doc.data() as Review);
            }
          }
        });

        querySchedule.forEach((doc: QueryDocumentSnapshot) => {
          const professionalId = doc.ref.parent.parent?.id;

          if (professionalId) {
            const professionalIndex = professionalsData.findIndex((prof) => prof.id === professionalId);

            if (professionalIndex !== -1) {
              professionalsData[professionalIndex].schedule.push(doc.data() as Schedule);
            }
          }
        });

        console.log(professionalsData);
        setProfessionals(professionalsData);
      } catch (error) {
        console.log('Error fetching professionals:', error);
      }
    };

    fetchProfessionals();
  }, []);

  return (
    <div className="professionals-list">
      {professionals.map((professional) => (
        <Profile key={professional.id} professional={professional} />
      ))}
    </div>
  );
};

export default Professionals;
