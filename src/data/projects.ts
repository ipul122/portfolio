import gold from '../assets/machine-learning/GoldMapping.png';
import landslide from '../assets/machine-learning/LandRiskPrediction.png';
import rock from '../assets/computer-vision/RockClassification.png';
import gpr from '../assets/computer-vision/Subsurface_utility_YOLO.png';
import mt from '../assets/geophysics/Geophysicist_MT_uncertain.png';
import pythonCert from '../assets/certified/Python_DEV.png';
import sqlCert from '../assets/certified/SQL_Associate.png';
import ibmCert from '../assets/certified/DataClassificationAndSummarization.png';
import toefl from '../assets/certified/TOEFL.png';

export type Category = 'machine-learning' | 'cv' | 'geophysics';

export const filters: { id: Category; label: string }[] = [
  { id: 'machine-learning', label: 'Machine Learning' },
  { id: 'cv', label: 'Computer Vision' },
  { id: 'geophysics', label: 'Geophysics' },
];

export const projects: {
  title: string;
  kind: string;
  category: Category;
  desc: string;
  tags: string[];
  img: ImageMetadata;
  alt: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: '1D MT Inversion & Uncertainty Analysis',
    kind: 'Research',
    category: 'geophysics',
    desc: "Python workflows for 1D Magnetotelluric forward modeling, inversion and uncertainty analysis using Sambridge's Neighborhood Algorithm. Optimized with Numba JIT and Joblib parallelization, with a GUI and a CLI.",
    tags: ['Python', 'NumPy', 'Numba', 'Joblib', 'MT'],
    img: mt,
    alt: 'Magnetotelluric inversion and uncertainty analysis visualization',
    links: [
      { label: 'GitHub', href: 'https://github.com/ipul122/paralel-neighborhood-algorithm' },
      { label: 'Material', href: 'https://drive.google.com/file/d/1vfrllHltBm7d9UhUjH4C836ps1ZPFZwV/view' },
    ],
  },
  {
    title: 'Gold Deposit Mapping Probability',
    kind: 'ML + GIS',
    category: 'machine-learning',
    desc: 'Data-driven mineral prospectivity and spatial uncertainty workflow. Integrates radiometric, geological, geochemical and geophysical evidence using ML and geospatial processing.',
    tags: ['Python', 'Scikit-learn', 'XGBoost', 'QGIS'],
    img: gold,
    alt: 'Gold deposit mapping probability and uncertainty overlay',
    links: [
      { label: 'LinkedIn', href: 'https://lnkd.in/p/gryXB8Wh' },
      { label: 'GitHub', href: 'https://github.com/ipul122/Gold-Deposit-Mapping' },
    ],
  },
  {
    title: 'Rock Classification Using Deep Learning',
    kind: 'Deep Learning',
    category: 'cv',
    desc: 'Rock image classification with a custom CNN and ResNet34 transfer learning in PyTorch. Image preprocessing with OpenCV and an interactive Streamlit app.',
    tags: ['PyTorch', 'ResNet34', 'CNN', 'OpenCV', 'Streamlit'],
    img: rock,
    alt: 'Rock classification deep learning project visualization',
    links: [
      { label: 'LinkedIn', href: 'https://lnkd.in/p/gF4UrcNa' },
      { label: 'GitHub', href: 'https://github.com/ipul122/rock-classification' },
    ],
  },
  {
    title: 'Subsurface Utility Detection on GPR',
    kind: 'YOLO',
    category: 'cv',
    desc: 'Automated computer vision pipeline detecting GPR hyperbola reflections from underground pipes and utilities. YOLO architecture with custom augmentation across varied scan resolutions.',
    tags: ['YOLO', 'OpenCV', 'GPR', 'Roboflow', 'Augmentation'],
    img: gpr,
    alt: 'Subsurface utility detection on GPR using YOLO',
    links: [{ label: 'Roboflow', href: 'https://app.roboflow.com/anwar-bgrta/gpr_yolo-tqfgv/models' }],
  },
  {
    title: 'Landslide Risk Prediction',
    kind: 'ML',
    category: 'machine-learning',
    desc: 'Multiclass ML workflow using StandardScaler, SMOTE, XGBoost and Random Forest. Hyperparameter tuning with GridSearchCV, evaluated via accuracy, precision, recall and F1-score.',
    tags: ['XGBoost', 'Random Forest', 'SMOTE', 'GridSearchCV'],
    img: landslide,
    alt: 'Landslide risk prediction project visualization',
    links: [{ label: 'GitHub', href: 'https://github.com/ipul122/land-risk-prediction-using-machine_learning' }],
  },
];

export const leadership = [
  {
    kind: 'Publication',
    title: 'Uncertainty Analysis of 1D MT Inversion',
    desc: 'Uncertainty Analysis of 1D Magnetotelluric Inversion Model Using the Neighborhood Algorithm — Application to Kilauea Volcano.',
    links: [
      { label: 'Read paper', href: 'https://bit.ly/4gl2o1G' },
      { label: 'GitHub', href: 'https://github.com/ipul122/paralel-neighborhood-algorithm' },
    ],
  },
  {
    kind: 'Hackathon',
    title: 'Team Lead / Technical Lead',
    desc: 'GARAGA Team — ANTAM Hackathon, Unit Geomin. Led the technical team in developing a data-driven solution for exploration problems.',
    links: [] as { label: string; href: string }[],
  },
];

export const certifications: { title: string; issuer: string; meta: string; img: ImageMetadata; alt: string }[] = [
  {
    title: 'Python Developer Associate',
    issuer: 'DataCamp',
    meta: 'September 13, 2026 · ID PDEVA0010255572792',
    img: pythonCert,
    alt: 'DataCamp Python Developer Associate certificate',
  },
  {
    title: 'SQL Associate',
    issuer: 'DataCamp',
    meta: 'September 12, 2026 · ID SQA0016938014947',
    img: sqlCert,
    alt: 'DataCamp SQL Associate certificate',
  },
  {
    title: 'Data Classification and Summarization',
    issuer: 'IBM SkillsBuild · Hacktiv8 Indonesia',
    meta: 'Student Developer Initiative · Issued October 2025',
    img: ibmCert,
    alt: 'IBM SkillsBuild certificate for Data Classification and Summarization',
  },
  {
    title: 'TOEFL Score Report — 590',
    issuer: 'ITERA Language Center',
    meta: 'English Proficiency Test · June 27, 2026',
    img: toefl,
    alt: 'ITERA English Proficiency Test score report',
  },
];
