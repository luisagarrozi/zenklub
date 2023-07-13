import { Timestamp } from 'firebase/firestore';

export interface Schedule {
  available: boolean;
  date: Timestamp;
}