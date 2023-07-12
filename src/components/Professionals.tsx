import React, { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, query, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import Profile from "./Profile";

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

const Professionals: React.FC = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const queryDatabase = query(collection(db, "professionals"));

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const querySnapshot = await getDocs(queryDatabase);
        const professionalsData: Professional[] = querySnapshot.docs.map(
          (doc: QueryDocumentSnapshot) => ({
            ...(doc.data() as Professional),
          })
        );
        setProfessionals(professionalsData);
      } catch (error) {
        console.log('Error fetching professionals:', error);
      }
    };

    fetchProfessionals();
  }, []);

  return (
    <div className="professional-list">
      {professionals.map((professional) => (
        <Profile key={professional.id} professional={professional} />
      ))}
    </div>
  );
};

export default Professionals;
