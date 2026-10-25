import { InstituteCohort } from '../types';

export const INITIAL_COHORTS: InstituteCohort[] = [
  {
    id: 'cohort_tokyo_kaigo_14',
    name: 'Batch 14: SSW Caregiver Tokyo Fast-Track',
    track: 'SSW Care Worker (Kaigo)',
    studentCount: 28,
    avgScore: 218,
    passRate: 92.8,
    startDate: '2026-01-05',
    targetExamDate: '2026-11-15',
    students: [
      { id: 'st_01', name: 'Tanaka Kenji', email: 'kenji.t@example.com', testsTaken: 8, lastScore: 232, passProbability: 97, weakArea: 'Speed Reading', status: 'Ready' },
      { id: 'st_02', name: 'Siti Rahmawati', email: 'siti.r@example.com', testsTaken: 9, lastScore: 226, passProbability: 95, weakArea: 'Kanji Writing', status: 'Ready' },
      { id: 'st_03', name: 'Bikash Sharma', email: 'bikash.s@example.com', testsTaken: 7, lastScore: 214, passProbability: 91, weakArea: 'Workplace Keigo', status: 'Ready' },
      { id: 'st_04', name: 'Nguyen Thi Mai', email: 'mai.ng@example.com', testsTaken: 6, lastScore: 204, passProbability: 84, weakArea: 'Listening Speed', status: 'Needs Review' },
      { id: 'st_05', name: 'Anik Rahman', email: 'anik.r@example.com', testsTaken: 5, lastScore: 194, passProbability: 71, weakArea: 'Particles (助詞)', status: 'At Risk' },
      { id: 'st_06', name: 'Maria Santos', email: 'maria.s@example.com', testsTaken: 8, lastScore: 222, passProbability: 93, weakArea: 'Sign Reading', status: 'Ready' },
      { id: 'st_07', name: 'Hla Min Thu', email: 'hla.min@example.com', testsTaken: 7, lastScore: 210, passProbability: 88, weakArea: 'Medical Vocab', status: 'Ready' },
      { id: 'st_08', name: 'Faruk Ahmed', email: 'faruk.ahmed@example.com', testsTaken: 9, lastScore: 240, passProbability: 99, weakArea: 'None (Top Scorer)', status: 'Ready' }
    ]
  },
  {
    id: 'cohort_jft_express_15',
    name: 'Batch 15: JFT-Basic 30-Day Intensive Sprint',
    track: 'JFT-Basic Prometric',
    studentCount: 35,
    avgScore: 206,
    passRate: 88.5,
    startDate: '2026-02-01',
    targetExamDate: '2026-11-28',
    students: [
      { id: 'st_11', name: 'Carlos Mendoza', email: 'carlos.m@example.com', testsTaken: 6, lastScore: 216, passProbability: 90, weakArea: 'Reading Passages', status: 'Ready' },
      { id: 'st_12', name: 'Dewi Lestari', email: 'dewi.l@example.com', testsTaken: 5, lastScore: 202, passProbability: 82, weakArea: 'Audio Dialogue 3', status: 'Needs Review' },
      { id: 'st_13', name: 'Rohan Thapa', email: 'rohan.t@example.com', testsTaken: 7, lastScore: 224, passProbability: 94, weakArea: 'Calendar Dates', status: 'Ready' },
      { id: 'st_14', name: 'Le Van Nam', email: 'nam.le@example.com', testsTaken: 4, lastScore: 188, passProbability: 68, weakArea: 'Verb Conjugation', status: 'At Risk' }
    ]
  },
  {
    id: 'cohort_food_service_08',
    name: 'Batch 08: SSW Restaurant & Hospitality Guild',
    track: 'SSW Food Service',
    studentCount: 22,
    avgScore: 222,
    passRate: 95.4,
    startDate: '2026-01-15',
    targetExamDate: '2026-12-05',
    students: [
      { id: 'st_21', name: 'Aung Kyaw', email: 'aung.k@example.com', testsTaken: 8, lastScore: 228, passProbability: 96, weakArea: 'Allergen Labels', status: 'Ready' },
      { id: 'st_22', name: 'Pradeep KC', email: 'pradeep.kc@example.com', testsTaken: 7, lastScore: 220, passProbability: 92, weakArea: 'Honorifics', status: 'Ready' },
      { id: 'st_23', name: 'Nurul Hidayah', email: 'nurul.h@example.com', testsTaken: 6, lastScore: 218, passProbability: 91, weakArea: 'POS Terminal', status: 'Ready' }
    ]
  }
];
