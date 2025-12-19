export const DIFFICULTY_COLORS = {
  'Beginner': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Intermediate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', 
  'Advanced': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'Expert': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

export const CATEGORY_COLORS = {
  'Foundation': 'gradient-blue',
  'Machine Learning': 'gradient-green',
  'Deep Learning': 'gradient-purple', 
  'Generative AI': 'gradient-pink',
  'LLM': 'gradient-indigo',
  'Multimodal AI': 'gradient-teal',
  'Quantum AI': 'gradient-orange'
};

export const TECH_STACK_CATEGORIES = {
  'AI/ML Frameworks': {
    icon: 'fas fa-robot',
    color: 'bg-blue-100 text-blue-600',
    technologies: ['PyTorch', 'TensorFlow', 'JAX', 'Hugging Face', 'Diffusers', 'Scikit-learn', 'XGBoost']
  },
  'Agentic AI & RAG': {
    icon: 'fas fa-link',
    color: 'bg-purple-100 text-purple-600',
    technologies: ['LangChain', 'LangGraph', 'Vector DBs (FAISS, Pinecone)', 'GraphDB', 'MongoDB']
  },
  'DevOps/MLOps': {
    icon: 'fas fa-cogs',
    color: 'bg-cyan-100 text-cyan-600',
    technologies: ['Docker', 'Kubernetes', 'MLflow', 'Weights & Biases', 'Git', 'CI/CD', 'DVC']
  },
  'Cloud & Quantum': {
    icon: 'fas fa-cloud',
    color: 'bg-orange-100 text-orange-600',
    technologies: ['AWS', 'GCP', 'SageMaker', 'Qiskit', 'PennyLane', 'Cirq', 'TensorFlow Quantum']
  }
};

export const PROJECT_CATEGORIES = [
  'All Projects',
  'Machine Learning', 
  'Deep Learning',
  'Generative AI',
  'Multimodal AI',
  'Quantum AI'
];

export const LAB_DIFFICULTIES = [
  'Beginner',
  'Intermediate', 
  'Advanced'
];
