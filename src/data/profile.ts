export const profile = {
  name: 'Anwar Udin Sayfulloh',
  role: 'AI/ML Engineer',
  location: 'Bandar Lampung, Indonesia',
  email: 'anwarusdata@gmail.com',
  whatsapp: { href: 'https://wa.me/6285600862892', label: '085600862892' },
  cv: 'cv/Anwar_Udin_Sayfulloh_CV_AI_Engineer.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/ipul122' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anwar-udin-sayfulloh-6268501b1/' },
    { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Anwar-Sayfulloh/research' },
  ],
};

export const tools = [
  'Python', 'PyTorch', 'XGBoost', 'Scikit-learn', 'YOLO', 'OpenCV', 'SQL', 'Pandas',
  'FastAPI', 'Docker', 'MLflow', 'Streamlit', 'QGIS', 'Numba',
];

export const stats: { value?: number; suffix?: string; text?: string; label: string }[] = [
  { value: 5, suffix: '+', label: 'AI projects' },
  { value: 1, label: 'Publication' },
  { text: '< 1', label: 'Years of experience' },
];

export const experience = [
  {
    date: 'Jul 2025 – Aug 2025',
    role: 'Marine Geophysics Intern',
    org: 'PT Qyudos Geosurvey Indonesia — Bandung',
    points: [
      'Processed Sub-Bottom Profiler (SBP) data for subsea pipeline route analysis, identifying sedimentary layers & buried hazards.',
      'Conducted Side Scan Sonar (SSS) acquisition for seafloor imaging & interpretation.',
      'Performed real-time interpretation during marine geophysical acquisition.',
      'Utilized SonarWiz & Golden Software Surfer for processing.',
    ],
    tags: ['SonarWiz', 'Surfer', 'SBP', 'SSS', 'Subsea Analysis'],
  },
  {
    date: 'Dec 2024 – May 2025',
    role: 'AI Data Annotator',
    org: 'Sahara AI — Remote',
    points: [
      'Performed annotation and review of image, text, and video datasets to support AI model development.',
      'Reviewed annotated data and verified labeling consistency and quality according to project guidelines.',
      'Recorded instructional videos demonstrating software usage and step-by-step procedures, including Microsoft Word workflows.',
    ],
    tags: ['Data Annotation', 'Data Review', 'Instructional Videos'],
  },
];

export const skills = [
  { group: 'AI & Machine Learning', items: ['Scikit-learn', 'XGBoost', 'Random Forest', 'K-Means', 'KNN', 'DBSCAN', 'PCA', 'Classification', 'Regression', 'Feature Engineering', 'GridSearchCV'] },
  { group: 'Deep Learning', items: ['PyTorch', 'TensorFlow/Keras', 'CNN', 'ResNet34', 'EfficientNet', 'YOLO', 'Transfer Learning'] },
  { group: 'Programming', items: ['Python', 'SQL', 'HTML', 'CSS', 'JavaScript', 'C++'] },
  { group: 'Data Analytics', items: ['Pandas', 'NumPy', 'SciPy', 'EDA', 'Data Cleaning', 'Data Visualization', 'Statistical Analysis'] },
  { group: 'Geophysics & Exploration', items: ['Magnetotelluric', 'Forward/Inverse Modeling', 'Uncertainty Analysis', 'Gravity', 'Seismic', 'GPR', 'ERT/VES'] },
  { group: 'Software & Tools', items: ['QGIS', 'Petrel', 'Oasis Montaj', 'SonarWiz', 'Surfer', 'Streamlit', 'MATLAB', 'OpenCV', 'Git/GitHub', 'Jupyter', 'Docker', 'FastAPI', 'MLflow'] },
  { group: 'Languages', items: ['Indonesian — Native', 'English — Working Proficiency'] },
];

export const education = [
  {
    date: '2022 – 2026',
    title: 'Institut Teknologi Sumatera (ITERA)',
    sub: 'B.Eng (S.T.) in Geophysics — GPA 3.31/4.00',
    desc: "Thesis: 1D MT Data Inversion & Uncertainty Analysis Using Sambridge's Neighborhood Algorithm. Coursework: Exploration Geology, Geophysical Methods, Data Processing, Modeling, Remote Sensing.",
  },
  {
    date: 'Aug 2026 – Feb 2027',
    title: 'Purwadhika Digital Technology School',
    sub: 'AI Engineering Program',
    desc: 'Practical skills in Python, data processing, machine learning, SQL, and AI engineering with software engineering best practices.',
  },
  {
    date: 'Field Surveys',
    title: 'Geophysical Field Surveys',
    sub: 'ITERA & Kab. Tanggamus',
    desc: 'Gravity, magnetic, seismic, GPR and geoelectrical (VES/ERT) acquisition. Operated Scintrex CG-6, magnetometer, SummitX seismic system and GPR equipment.',
  },
  {
    date: 'Field Courses',
    title: 'Geological Field Courses',
    sub: 'Lampung',
    desc: 'Sedimentology, stratigraphy, mineralogy, petrology and structural geology. Rock/mineral identification and structural measurements (strike & dip).',
  },
];
