// Static build configuration for production deployment
export const STATIC_COURSES = [
  {
    id: "foundation",
    title: "Foundation Course", 
    description: "Essential tools and mathematical foundations for AI/ML success",
    category: "Foundation",
    difficulty: "Beginner Level",
    color: "from-blue-500 to-blue-600",
    icon: "fas fa-foundation",
    estimatedHours: 40,
    price: 25000,
    weeks: "8-10 weeks",
    modules: [
      { id: "linux-git", title: "Linux & Git for Data Science", completed: true },
      { id: "python-foundations", title: "Python Foundations & OOP", completed: true },
      { id: "data-handling", title: "Data Handling (NumPy, Pandas)", completed: true },
      { id: "cloud-mlops", title: "Cloud & MLOps Basics", completed: false }
    ],
    prerequisites: null,
    technologies: ["Python", "Linux", "Git", "Docker", "NumPy", "Pandas"]
  },
  {
    id: "machine-learning", 
    title: "Machine Learning",
    description: "Classical ML algorithms, evaluation, and end-to-end projects",
    category: "Core",
    difficulty: "Intermediate Level",
    color: "from-green-500 to-green-600",
    icon: "fas fa-chart-line",
    estimatedHours: 60,
    price: 35000,
    weeks: "10-12 weeks",
    modules: [
      { id: "ml-fundamentals", title: "ML Fundamentals & Intelligent Systems", completed: true },
      { id: "end-to-end-ml", title: "End-to-End ML Projects", completed: true },
      { id: "classification", title: "Classification Techniques", completed: false },
      { id: "deployment", title: "Deployment & Production", completed: false }
    ],
    prerequisites: ["foundation"],
    technologies: ["Scikit-learn", "XGBoost", "MLflow", "FastAPI"]
  },
  {
    id: "deep-learning",
    title: "Deep Learning", 
    description: "Neural networks, CNNs, RNNs, and modern architectures",
    category: "Advanced",
    difficulty: "Advanced Level",
    color: "from-purple-500 to-purple-600",
    icon: "fas fa-network-wired",
    estimatedHours: 80,
    price: 45000,
    weeks: "12-14 weeks",
    modules: [
      { id: "neural-networks", title: "Neural Network Foundations", completed: false },
      { id: "cnns", title: "CNNs & Computer Vision", completed: false },
      { id: "rnns", title: "RNNs & Sequence Models", completed: false },
      { id: "advanced-architectures", title: "Advanced Architectures", completed: false }
    ],
    prerequisites: ["machine-learning"],
    technologies: ["PyTorch", "TensorFlow", "OpenCV", "Transformers"]
  },
  {
    id: "generative-ai",
    title: "Generative AI",
    description: "GANs, VAEs, Diffusion Models",
    category: "GenAI",
    difficulty: "Advanced Level",
    color: "from-pink-500 to-pink-600",
    icon: "fas fa-magic",
    estimatedHours: 70,
    price: 42000,
    weeks: "10-12 weeks",
    modules: [
      { id: "generative-models", title: "Generative Model Foundations", completed: false },
      { id: "transfer-learning", title: "Transfer Learning & Fine-tuning", completed: false },
      { id: "attention", title: "Attention Mechanisms", completed: false },
      { id: "genai-deployment", title: "GenAI Pipeline Deployment", completed: false }
    ],
    prerequisites: ["deep-learning"],
    technologies: ["Diffusers", "Stable Diffusion", "GANs", "VAEs"]
  },
  {
    id: "llm",
    title: "Large Language Models",
    description: "GPT, BERT, Fine-tuning & Deployment",
    category: "LLM",
    difficulty: "Expert Level",
    color: "from-indigo-500 to-indigo-600",
    icon: "fas fa-comments",
    estimatedHours: 90,
    price: 48000,
    weeks: "14-16 weeks",
    modules: [
      { id: "llm-foundations", title: "LLM Foundations & Architectures", completed: false },
      { id: "rag-langchain", title: "RAG & LangChain Integration", completed: false },
      { id: "lora-finetuning", title: "LoRA & QLoRA Fine-tuning", completed: false },
      { id: "specialized-llm", title: "Specialized LLM Applications", completed: false }
    ],
    prerequisites: ["generative-ai"],
    technologies: ["Transformers", "LangChain", "LoRA", "vLLM"]
  },
  {
    id: "multimodal-ai",
    title: "Multimodal AI",
    description: "Vision-Language Models & Fusion",
    category: "Multimodal",
    difficulty: "Expert Level",
    color: "from-teal-500 to-teal-600",
    icon: "fas fa-eye",
    estimatedHours: 75,
    price: 46000,
    weeks: "12-14 weeks",
    modules: [
      { id: "multimodal-foundations", title: "Multimodal Learning Foundations", completed: false },
      { id: "clip-blip", title: "CLIP, BLIP & ViLBERT", completed: false },
      { id: "vision-language", title: "Vision-Language Models", completed: false },
      { id: "multimodal-generation", title: "Multimodal Generation", completed: false }
    ],
    prerequisites: ["llm"],
    technologies: ["CLIP", "BLIP", "ViLBERT", "Whisper"]
  },
  {
    id: "quantum-ai",
    title: "Quantum AI & LLMs",
    description: "Quantum Computing & Q-Transformers",
    category: "Quantum",
    difficulty: "Expert Level",
    color: "from-orange-500 to-orange-600",
    icon: "fas fa-atom",
    estimatedHours: 85,
    price: 50000,
    weeks: "16-18 weeks",
    modules: [
      { id: "quantum-basics", title: "Quantum Computing Basics", completed: false },
      { id: "quantum-ml", title: "Quantum Machine Learning", completed: false },
      { id: "quantum-llm", title: "Quantum LLMs & Attention", completed: false },
      { id: "quantum-agi", title: "Quantum AGI Applications", completed: false }
    ],
    prerequisites: ["multimodal-ai"],
    technologies: ["Qiskit", "PennyLane", "Cirq", "TensorFlow Quantum"]
  }
];

export const STATIC_STATS = {
  courses: 7,
  projects: 70,
  labs: 300,
  technologies: 50
};