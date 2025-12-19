import { 
  type User, 
  type InsertUser, 
  type Course, 
  type InsertCourse,
  type Project,
  type InsertProject,
  type CodeLab,
  type InsertCodeLab,
  type Documentation,
  type InsertDocumentation,
  type UserProgress,
  type InsertUserProgress
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Courses
  getAllCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Projects
  getAllProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Code Labs
  getAllCodeLabs(): Promise<CodeLab[]>;
  getCodeLabsByDifficulty(difficulty: string): Promise<CodeLab[]>;
  getCodeLab(id: string): Promise<CodeLab | undefined>;
  createCodeLab(lab: InsertCodeLab): Promise<CodeLab>;
  
  // Documentation
  getAllDocumentation(): Promise<Documentation[]>;
  getDocumentationByCategory(category: string): Promise<Documentation[]>;
  getDocumentation(id: string): Promise<Documentation | undefined>;
  searchDocumentation(query: string): Promise<Documentation[]>;
  createDocumentation(doc: InsertDocumentation): Promise<Documentation>;
  
  // User Progress
  getUserProgress(userId: string): Promise<UserProgress[]>;
  getUserCourseProgress(userId: string, courseId: string): Promise<UserProgress[]>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private courses: Map<string, Course> = new Map();
  private projects: Map<string, Project> = new Map();
  private codeLabs: Map<string, CodeLab> = new Map();
  private documentation: Map<string, Documentation> = new Map();
  private userProgress: Map<string, UserProgress> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed courses
    const courses: Course[] = [
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
        difficulty: "Advanced",
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
        difficulty: "Advanced",
        color: "from-indigo-500 to-indigo-600",
        icon: "fas fa-comments",
        estimatedHours: 90,
        price: 48000,
        weeks: "12-14 weeks",
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
        difficulty: "Expert",
        color: "from-teal-500 to-teal-600",
        icon: "fas fa-eye",
        estimatedHours: 75,
        price: 46000,
        weeks: "10-12 weeks",
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
        title: "Quantum AI",
        description: "Quantum Computing & Q-Transformers",
        category: "Quantum",
        difficulty: "Expert",
        color: "from-orange-500 to-orange-600",
        icon: "fas fa-atom",
        estimatedHours: 85,
        price: 50000,
        weeks: "12-14 weeks",
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

    courses.forEach(course => {
      this.courses.set(course.id, course);
    });

    // Seed projects with 10 projects per category
    const projects: Project[] = [
      // Foundation Projects (10)
      {
        id: "python-data-pipeline",
        title: "Python Data Pipeline",
        description: "Complete ETL pipeline using Python, Pandas, and Docker for data preprocessing",
        category: "Foundation",
        difficulty: "Beginner",
        technologies: ["Python", "Pandas", "Docker", "NumPy"],
        features: ["ETL pipeline", "Data validation", "Docker deployment"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/python-data-pipeline/download",
        githubUrl: "https://github.com/aaai/python-data-pipeline"
      },
      {
        id: "linux-automation",
        title: "Linux Automation Scripts",
        description: "Collection of bash scripts for system monitoring and automation tasks",
        category: "Foundation",
        difficulty: "Beginner",
        technologies: ["Bash", "Linux", "Cron", "Systemd"],
        features: ["System monitoring", "Automated backups", "Log analysis"],
        imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/linux-automation/download",
        githubUrl: "https://github.com/aaai/linux-automation"
      },
      {
        id: "git-workflow-manager",
        title: "Git Workflow Manager",
        description: "Advanced Git workflows with CI/CD integration and automated testing",
        category: "Foundation",
        difficulty: "Intermediate",
        technologies: ["Git", "GitHub Actions", "Docker", "pytest"],
        features: ["Branch protection", "Automated testing", "Deployment pipelines"],
        imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/git-workflow-manager/download",
        githubUrl: "https://github.com/aaai/git-workflow-manager"
      },
      {
        id: "cloud-infrastructure",
        title: "Cloud Infrastructure Setup",
        description: "AWS/GCP infrastructure automation using Terraform and Kubernetes",
        category: "Foundation",
        difficulty: "Advanced",
        technologies: ["Terraform", "Kubernetes", "AWS", "Docker"],
        features: ["Infrastructure as Code", "Auto-scaling", "Load balancing"],
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/cloud-infrastructure/download",
        githubUrl: "https://github.com/aaai/cloud-infrastructure"
      },
      {
        id: "database-optimizer",
        title: "Database Query Optimizer",
        description: "PostgreSQL performance tuning and query optimization toolkit",
        category: "Foundation",
        difficulty: "Intermediate",
        technologies: ["PostgreSQL", "Python", "SQL", "pgbench"],
        features: ["Query analysis", "Index optimization", "Performance monitoring"],
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/database-optimizer/download",
        githubUrl: "https://github.com/aaai/database-optimizer"
      },
      {
        id: "api-testing-framework",
        title: "API Testing Framework",
        description: "Comprehensive REST API testing with pytest and automated documentation",
        category: "Foundation",
        difficulty: "Intermediate",
        technologies: ["FastAPI", "pytest", "OpenAPI", "Docker"],
        features: ["Automated testing", "API documentation", "Performance testing"],
        imageUrl: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/api-testing-framework/download",
        githubUrl: "https://github.com/aaai/api-testing-framework"
      },
      {
        id: "data-visualization-dashboard",
        title: "Data Visualization Dashboard",
        description: "Interactive dashboard using Plotly, Dash, and real-time data streaming",
        category: "Foundation",
        difficulty: "Intermediate",
        technologies: ["Plotly", "Dash", "Pandas", "Redis"],
        features: ["Real-time updates", "Interactive charts", "Data filtering"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/data-visualization-dashboard/download",
        githubUrl: "https://github.com/aaai/data-visualization-dashboard"
      },
      {
        id: "microservices-architecture",
        title: "Microservices Architecture",
        description: "Complete microservices setup with Docker Compose and service mesh",
        category: "Foundation",
        difficulty: "Advanced",
        technologies: ["Docker", "Kubernetes", "Istio", "gRPC"],
        features: ["Service mesh", "Load balancing", "Circuit breakers"],
        imageUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/microservices-architecture/download",
        githubUrl: "https://github.com/aaai/microservices-architecture"
      },
      {
        id: "monitoring-alerting-system",
        title: "Monitoring & Alerting System",
        description: "Comprehensive system monitoring with Prometheus, Grafana, and alerting",
        category: "Foundation",
        difficulty: "Advanced",
        technologies: ["Prometheus", "Grafana", "AlertManager", "Node Exporter"],
        features: ["Custom metrics", "Alert rules", "Dashboard templates"],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/monitoring-alerting-system/download",
        githubUrl: "https://github.com/aaai/monitoring-alerting-system"
      },
      {
        id: "security-automation",
        title: "Security Automation Suite",
        description: "Automated security scanning and vulnerability assessment pipeline",
        category: "Foundation",
        difficulty: "Advanced",
        technologies: ["OWASP ZAP", "SonarQube", "Docker", "Python"],
        features: ["Vulnerability scanning", "Code analysis", "Automated reporting"],
        imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/security-automation/download",
        githubUrl: "https://github.com/aaai/security-automation"
      },

      // Machine Learning Projects (10)
      {
        id: "fraud-detection",
        title: "Fraud Detection System",
        description: "Complete ML pipeline for financial fraud detection using ensemble methods and real-time scoring",
        category: "Machine Learning",
        difficulty: "Intermediate",
        technologies: ["XGBoost", "LightGBM", "FastAPI", "Docker"],
        features: ["XGBoost + LightGBM ensemble", "Real-time API deployment", "Feature engineering pipeline"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/fraud-detection/download",
        githubUrl: "https://github.com/aaai/fraud-detection"
      },
      {
        id: "recommendation-engine",
        title: "Recommendation Engine",
        description: "Collaborative filtering and content-based recommendation system with A/B testing",
        category: "Machine Learning",
        difficulty: "Intermediate",
        technologies: ["Scikit-learn", "Surprise", "MLflow", "Redis"],
        features: ["Collaborative filtering", "Content-based filtering", "A/B testing framework"],
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/recommendation-engine/download",
        githubUrl: "https://github.com/aaai/recommendation-engine"
      },
      {
        id: "time-series-forecasting",
        title: "Time Series Forecasting",
        description: "Advanced time series forecasting using ARIMA, Prophet, and LSTM models",
        category: "Machine Learning",
        difficulty: "Advanced",
        technologies: ["Prophet", "ARIMA", "LSTM", "Streamlit"],
        features: ["Multiple forecasting models", "Seasonal decomposition", "Interactive visualization"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/time-series-forecasting/download",
        githubUrl: "https://github.com/aaai/time-series-forecasting"
      },
      {
        id: "customer-churn-prediction",
        title: "Customer Churn Prediction",
        description: "End-to-end ML pipeline for predicting customer churn with feature importance analysis",
        category: "Machine Learning",
        difficulty: "Intermediate",
        technologies: ["Random Forest", "SHAP", "Optuna", "FastAPI"],
        features: ["Feature importance analysis", "Hyperparameter tuning", "Model interpretability"],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/customer-churn-prediction/download",
        githubUrl: "https://github.com/aaai/customer-churn-prediction"
      },
      {
        id: "anomaly-detection",
        title: "Anomaly Detection System",
        description: "Real-time anomaly detection using isolation forests and autoencoders",
        category: "Machine Learning",
        difficulty: "Advanced",
        technologies: ["Isolation Forest", "Autoencoder", "Kafka", "Elasticsearch"],
        features: ["Real-time processing", "Multiple detection algorithms", "Alert system"],
        imageUrl: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/anomaly-detection/download",
        githubUrl: "https://github.com/aaai/anomaly-detection"
      },
      {
        id: "credit-scoring-model",
        title: "Credit Scoring Model",
        description: "Advanced credit scoring using gradient boosting with fairness constraints",
        category: "Machine Learning",
        difficulty: "Advanced",
        technologies: ["XGBoost", "Fairlearn", "LIME", "Docker"],
        features: ["Fairness-aware ML", "Model explainability", "Bias detection"],
        imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/credit-scoring-model/download",
        githubUrl: "https://github.com/aaai/credit-scoring-model"
      },
      {
        id: "price-optimization",
        title: "Dynamic Price Optimization",
        description: "ML-powered dynamic pricing system with competitor analysis and demand forecasting",
        category: "Machine Learning",
        difficulty: "Advanced",
        technologies: ["Reinforcement Learning", "Prophet", "Scrapy", "PostgreSQL"],
        features: ["Dynamic pricing algorithms", "Competitor monitoring", "Demand prediction"],
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/price-optimization/download",
        githubUrl: "https://github.com/aaai/price-optimization"
      },
      {
        id: "nlp-sentiment-analyzer",
        title: "NLP Sentiment Analyzer",
        description: "Multi-language sentiment analysis with BERT and custom domain adaptation",
        category: "Machine Learning",
        difficulty: "Advanced",
        technologies: ["BERT", "Transformers", "spaCy", "FastAPI"],
        features: ["Multi-language support", "Domain adaptation", "Real-time API"],
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/nlp-sentiment-analyzer/download",
        githubUrl: "https://github.com/aaai/nlp-sentiment-analyzer"
      },
      {
        id: "inventory-optimization",
        title: "Supply Chain Optimization",
        description: "ML-based inventory management with demand forecasting and optimization",
        category: "Machine Learning",
        difficulty: "Advanced",
        technologies: ["OR-Tools", "Prophet", "Pandas", "Dash"],
        features: ["Demand forecasting", "Inventory optimization", "Supply chain analytics"],
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/inventory-optimization/download",
        githubUrl: "https://github.com/aaai/inventory-optimization"
      },
      {
        id: "medical-diagnosis-ai",
        title: "Medical Diagnosis Assistant",
        description: "ML system for medical diagnosis support using clinical data and symptoms",
        category: "Machine Learning",
        difficulty: "Expert",
        technologies: ["Scikit-learn", "Pandas", "SHAP", "Streamlit"],
        features: ["Symptom analysis", "Risk assessment", "Medical knowledge base"],
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/medical-diagnosis-ai/download",
        githubUrl: "https://github.com/aaai/medical-diagnosis-ai"
      },

      // Deep Learning Projects (10)
      {
        id: "cnn-image-classifier",
        title: "CNN Image Classifier",
        description: "Advanced image classification using ResNet, DenseNet, and ensemble methods",
        category: "Deep Learning",
        difficulty: "Intermediate",
        technologies: ["PyTorch", "Torchvision", "Albumentations", "Wandb"],
        features: ["Transfer learning", "Data augmentation", "Model ensemble"],
        imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/cnn-image-classifier/download",
        githubUrl: "https://github.com/aaai/cnn-image-classifier"
      },
      {
        id: "object-detection-yolo",
        title: "YOLO Object Detection",
        description: "Real-time object detection using YOLOv8 with custom dataset training",
        category: "Deep Learning",
        difficulty: "Advanced",
        technologies: ["YOLOv8", "OpenCV", "Ultralytics", "TensorRT"],
        features: ["Real-time detection", "Custom object training", "Model optimization"],
        imageUrl: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/object-detection-yolo/download",
        githubUrl: "https://github.com/aaai/object-detection-yolo"
      },
      {
        id: "rnn-text-generation",
        title: "RNN Text Generation",
        description: "Advanced text generation using LSTM and GRU with attention mechanisms",
        category: "Deep Learning",
        difficulty: "Advanced",
        technologies: ["PyTorch", "LSTM", "GRU", "Attention"],
        features: ["Character-level generation", "Attention mechanism", "Temperature sampling"],
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/rnn-text-generation/download",
        githubUrl: "https://github.com/aaai/rnn-text-generation"
      },
      {
        id: "semantic-segmentation",
        title: "Semantic Segmentation",
        description: "Pixel-wise image segmentation using U-Net and DeepLab architectures",
        category: "Deep Learning",
        difficulty: "Advanced",
        technologies: ["U-Net", "DeepLab", "PyTorch", "OpenCV"],
        features: ["Multi-class segmentation", "IoU optimization", "Data augmentation"],
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/semantic-segmentation/download",
        githubUrl: "https://github.com/aaai/semantic-segmentation"
      },
      {
        id: "face-recognition-system",
        title: "Face Recognition System",
        description: "End-to-end face recognition with detection, alignment, and identification",
        category: "Deep Learning",
        difficulty: "Advanced",
        technologies: ["FaceNet", "MTCNN", "PyTorch", "OpenCV"],
        features: ["Face detection", "Face alignment", "Identity verification"],
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/face-recognition-system/download",
        githubUrl: "https://github.com/aaai/face-recognition-system"
      },
      {
        id: "neural-style-transfer",
        title: "Neural Style Transfer",
        description: "Artistic style transfer using VGG networks and perceptual loss functions",
        category: "Deep Learning",
        difficulty: "Advanced",
        technologies: ["VGG", "PyTorch", "PIL", "Streamlit"],
        features: ["Style transfer", "Perceptual loss", "Real-time processing"],
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/neural-style-transfer/download",
        githubUrl: "https://github.com/aaai/neural-style-transfer"
      },
      {
        id: "speech-recognition",
        title: "Speech Recognition System",
        description: "End-to-end speech recognition using Deep Speech and Wav2Vec2",
        category: "Deep Learning",
        difficulty: "Advanced",
        technologies: ["Wav2Vec2", "PyTorch", "librosa", "FastAPI"],
        features: ["Speech-to-text", "Audio preprocessing", "Language modeling"],
        imageUrl: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/speech-recognition/download",
        githubUrl: "https://github.com/aaai/speech-recognition"
      },
      {
        id: "gan-image-synthesis",
        title: "GAN Image Synthesis",
        description: "High-quality image generation using Progressive GANs and StyleGAN",
        category: "Deep Learning",
        difficulty: "Expert",
        technologies: ["StyleGAN", "Progressive GAN", "PyTorch", "Wandb"],
        features: ["High-resolution generation", "Progressive training", "Latent space exploration"],
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/gan-image-synthesis/download",
        githubUrl: "https://github.com/aaai/gan-image-synthesis"
      },
      {
        id: "transformer-machine-translation",
        title: "Transformer Translation",
        description: "Neural machine translation using Transformer architecture from scratch",
        category: "Deep Learning",
        difficulty: "Expert",
        technologies: ["Transformers", "PyTorch", "Tokenizers", "BLEU"],
        features: ["Attention mechanism", "Multi-head attention", "Positional encoding"],
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/transformer-machine-translation/download",
        githubUrl: "https://github.com/aaai/transformer-machine-translation"
      },
      {
        id: "reinforcement-learning-game",
        title: "RL Game AI Agent",
        description: "Reinforcement learning agent for complex game environments using DQN and PPO",
        category: "Deep Learning",
        difficulty: "Expert",
        technologies: ["DQN", "PPO", "OpenAI Gym", "Stable Baselines3"],
        features: ["Deep Q-Learning", "Policy optimization", "Experience replay"],
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/reinforcement-learning-game/download",
        githubUrl: "https://github.com/aaai/reinforcement-learning-game"
      },

      // Generative AI Projects (10)
      {
        id: "image-generator",
        title: "AI Image Generator",
        description: "Stable Diffusion pipeline with custom fine-tuning and LoRA adapters for artistic styles",
        category: "Generative AI",
        difficulty: "Advanced",
        technologies: ["Stable Diffusion", "LoRA", "Gradio", "PyTorch"],
        features: ["Stable Diffusion XL integration", "Custom LoRA training", "Web interface with Gradio"],
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/image-generator/download",
        githubUrl: "https://github.com/aaai/image-generator"
      },
      {
        id: "text-to-video-generator",
        title: "Text-to-Video Generator",
        description: "Generate videos from text descriptions using diffusion models and temporal consistency",
        category: "Generative AI",
        difficulty: "Expert",
        technologies: ["VideoCrafter", "Stable Video", "PyTorch", "CLIP"],
        features: ["Text-to-video generation", "Temporal consistency", "High-quality output"],
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/text-to-video-generator/download",
        githubUrl: "https://github.com/aaai/text-to-video-generator"
      },
      {
        id: "music-composition-ai",
        title: "AI Music Composer",
        description: "Generate original music compositions using MuseNet and MusicLM architectures",
        category: "Generative AI",
        difficulty: "Advanced",
        technologies: ["MuseNet", "MusicLM", "PyTorch", "librosa"],
        features: ["Multi-instrument composition", "Style conditioning", "MIDI generation"],
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/music-composition-ai/download",
        githubUrl: "https://github.com/aaai/music-composition-ai"
      },
      {
        id: "voice-cloning-system",
        title: "Voice Cloning System",
        description: "Real-time voice cloning and synthesis using advanced neural vocoders",
        category: "Generative AI",
        difficulty: "Expert",
        technologies: ["Tortoise TTS", "RVC", "PyTorch", "librosa"],
        features: ["Voice cloning", "Real-time synthesis", "Multi-speaker support"],
        imageUrl: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/voice-cloning-system/download",
        githubUrl: "https://github.com/aaai/voice-cloning-system"
      },
      {
        id: "3d-model-generator",
        title: "3D Model Generator",
        description: "Generate 3D models from text descriptions using NeRF and 3D diffusion models",
        category: "Generative AI",
        difficulty: "Expert",
        technologies: ["NeRF", "3D Diffusion", "PyTorch3D", "Open3D"],
        features: ["Text-to-3D generation", "NeRF rendering", "3D mesh export"],
        imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/3d-model-generator/download",
        githubUrl: "https://github.com/aaai/3d-model-generator"
      },
      {
        id: "code-generation-ai",
        title: "AI Code Generator",
        description: "Automated code generation and completion using CodeT5 and fine-tuned models",
        category: "Generative AI",
        difficulty: "Advanced",
        technologies: ["CodeT5", "Transformers", "Tree-sitter", "FastAPI"],
        features: ["Code completion", "Multi-language support", "Syntax highlighting"],
        imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/code-generation-ai/download",
        githubUrl: "https://github.com/aaai/code-generation-ai"
      },
      {
        id: "ai-art-style-mixer",
        title: "AI Art Style Mixer",
        description: "Blend multiple artistic styles using advanced diffusion models and ControlNet",
        category: "Generative AI",
        difficulty: "Advanced",
        technologies: ["ControlNet", "Stable Diffusion", "CLIP", "Gradio"],
        features: ["Style blending", "Pose control", "Edge conditioning"],
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/ai-art-style-mixer/download",
        githubUrl: "https://github.com/aaai/ai-art-style-mixer"
      },
      {
        id: "personalized-story-generator",
        title: "Personalized Story Generator",
        description: "Generate personalized stories and narratives using GPT models and character consistency",
        category: "Generative AI",
        difficulty: "Advanced",
        technologies: ["GPT-3.5", "LangChain", "Streamlit", "OpenAI API"],
        features: ["Character consistency", "Plot generation", "Interactive storytelling"],
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/personalized-story-generator/download",
        githubUrl: "https://github.com/aaai/personalized-story-generator"
      },
      {
        id: "ai-fashion-designer",
        title: "AI Fashion Designer",
        description: "Generate fashion designs and clothing patterns using conditional GANs",
        category: "Generative AI",
        difficulty: "Advanced",
        technologies: ["StyleGAN", "ControlNet", "FashionGAN", "PIL"],
        features: ["Fashion design generation", "Pattern creation", "Style transfer"],
        imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/ai-fashion-designer/download",
        githubUrl: "https://github.com/aaai/ai-fashion-designer"
      },
      {
        id: "procedural-game-content",
        title: "Procedural Game Content",
        description: "Generate game levels, textures, and assets using AI and procedural techniques",
        category: "Generative AI",
        difficulty: "Expert",
        technologies: ["PyGame", "Perlin Noise", "GANs", "Stable Diffusion"],
        features: ["Level generation", "Texture synthesis", "Asset creation"],
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/procedural-game-content/download",
        githubUrl: "https://github.com/aaai/procedural-game-content"
      },

      // Large Language Models Projects (10)
      {
        id: "custom-chatbot-gpt",
        title: "Custom ChatGPT Clone",
        description: "Build your own ChatGPT-like interface with RAG capabilities and memory management",
        category: "Large Language Models",
        difficulty: "Advanced",
        technologies: ["OpenAI API", "LangChain", "Streamlit", "ChromaDB"],
        features: ["Conversational AI", "RAG implementation", "Chat memory"],
        imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/custom-chatbot-gpt/download",
        githubUrl: "https://github.com/aaai/custom-chatbot-gpt"
      },
      {
        id: "llm-fine-tuning-lora",
        title: "LLM Fine-tuning with LoRA",
        description: "Fine-tune large language models using LoRA and QLoRA for specific domains",
        category: "Large Language Models",
        difficulty: "Expert",
        technologies: ["LoRA", "QLoRA", "Hugging Face", "PyTorch"],
        features: ["Parameter-efficient tuning", "Domain adaptation", "Model compression"],
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/llm-fine-tuning-lora/download",
        githubUrl: "https://github.com/aaai/llm-fine-tuning-lora"
      },
      {
        id: "rag-document-qa",
        title: "RAG Document Q&A System",
        description: "Advanced RAG system for document question-answering with vector databases",
        category: "Large Language Models",
        difficulty: "Advanced",
        technologies: ["LangChain", "ChromaDB", "FAISS", "OpenAI Embeddings"],
        features: ["Document ingestion", "Vector search", "Context-aware answers"],
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/rag-document-qa/download",
        githubUrl: "https://github.com/aaai/rag-document-qa"
      },
      {
        id: "llm-agent-framework",
        title: "LLM Agent Framework",
        description: "Build autonomous AI agents using LangChain and function calling capabilities",
        category: "Large Language Models",
        difficulty: "Expert",
        technologies: ["LangChain", "OpenAI Functions", "Autogen", "FastAPI"],
        features: ["Function calling", "Agent workflows", "Tool integration"],
        imageUrl: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/llm-agent-framework/download",
        githubUrl: "https://github.com/aaai/llm-agent-framework"
      },
      {
        id: "code-review-assistant",
        title: "AI Code Review Assistant",
        description: "Automated code review using fine-tuned CodeT5 and static analysis integration",
        category: "Large Language Models",
        difficulty: "Advanced",
        technologies: ["CodeT5", "AST", "GitHub API", "FastAPI"],
        features: ["Code analysis", "Bug detection", "Style suggestions"],
        imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/code-review-assistant/download",
        githubUrl: "https://github.com/aaai/code-review-assistant"
      },
      {
        id: "multilingual-translator",
        title: "Advanced Multilingual Translator",
        description: "Real-time translation system supporting 100+ languages with context awareness",
        category: "Large Language Models",
        difficulty: "Advanced",
        technologies: ["mT5", "MarianMT", "FastAPI", "Streamlit"],
        features: ["Multi-language support", "Context preservation", "Real-time translation"],
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/multilingual-translator/download",
        githubUrl: "https://github.com/aaai/multilingual-translator"
      },
      {
        id: "content-generation-platform",
        title: "AI Content Generation Platform",
        description: "Complete content creation platform for blogs, marketing copy, and social media",
        category: "Large Language Models",
        difficulty: "Advanced",
        technologies: ["GPT-4", "Claude", "Streamlit", "PostgreSQL"],
        features: ["Multi-format content", "Brand voice training", "SEO optimization"],
        imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/content-generation-platform/download",
        githubUrl: "https://github.com/aaai/content-generation-platform"
      },
      {
        id: "legal-document-analyzer",
        title: "Legal Document Analyzer",
        description: "AI-powered legal document analysis and contract review system",
        category: "Large Language Models",
        difficulty: "Expert",
        technologies: ["Legal-BERT", "spaCy", "NER", "Streamlit"],
        features: ["Contract analysis", "Risk assessment", "Clause extraction"],
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/legal-document-analyzer/download",
        githubUrl: "https://github.com/aaai/legal-document-analyzer"
      },
      {
        id: "personalized-tutor-ai",
        title: "Personalized AI Tutor",
        description: "Adaptive learning system that personalizes education content based on student progress",
        category: "Large Language Models",
        difficulty: "Expert",
        technologies: ["GPT-4", "Knowledge Graphs", "Streamlit", "SQLite"],
        features: ["Adaptive learning", "Progress tracking", "Personalized curriculum"],
        imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/personalized-tutor-ai/download",
        githubUrl: "https://github.com/aaai/personalized-tutor-ai"
      },
      {
        id: "research-paper-assistant",
        title: "Research Paper Assistant",
        description: "AI system for research paper analysis, summarization, and citation management",
        category: "Large Language Models",
        difficulty: "Advanced",
        technologies: ["SciBERT", "arXiv API", "LangChain", "Streamlit"],
        features: ["Paper summarization", "Citation analysis", "Research insights"],
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/research-paper-assistant/download",
        githubUrl: "https://github.com/aaai/research-paper-assistant"
      },

      // Multimodal AI Projects (10)
      {
        id: "multimodal-chatbot",
        title: "Multimodal RAG Chatbot",
        description: "Advanced chatbot that understands text, images, and documents using CLIP and LangChain",
        category: "Multimodal AI",
        difficulty: "Expert",
        technologies: ["CLIP", "LangChain", "Streamlit", "ChromaDB"],
        features: ["CLIP vision-language model", "LangChain RAG pipeline", "Streamlit chat interface"],
        imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/multimodal-chatbot/download",
        githubUrl: "https://github.com/aaai/multimodal-chatbot"
      },
      {
        id: "visual-question-answering",
        title: "Visual Question Answering",
        description: "Answer questions about images using BLIP2 and visual reasoning capabilities",
        category: "Multimodal AI",
        difficulty: "Advanced",
        technologies: ["BLIP2", "ViLBERT", "PyTorch", "Gradio"],
        features: ["Image understanding", "Natural language reasoning", "Multi-turn conversations"],
        imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/visual-question-answering/download",
        githubUrl: "https://github.com/aaai/visual-question-answering"
      },
      {
        id: "image-captioning-system",
        title: "Advanced Image Captioning",
        description: "Generate detailed, contextual captions for images using attention mechanisms",
        category: "Multimodal AI",
        difficulty: "Advanced",
        technologies: ["BLIP", "Show-Attend-Tell", "PyTorch", "OpenCV"],
        features: ["Attention visualization", "Context-aware captions", "Multi-language support"],
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/image-captioning-system/download",
        githubUrl: "https://github.com/aaai/image-captioning-system"
      },
      {
        id: "audio-visual-speech",
        title: "Audio-Visual Speech Recognition",
        description: "Combine audio and visual cues for robust speech recognition in noisy environments",
        category: "Multimodal AI",
        difficulty: "Expert",
        technologies: ["Wav2Vec2", "Video Processing", "PyTorch", "OpenCV"],
        features: ["Lip reading", "Audio-visual fusion", "Noise robustness"],
        imageUrl: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/audio-visual-speech/download",
        githubUrl: "https://github.com/aaai/audio-visual-speech"
      },
      {
        id: "text-to-image-search",
        title: "Text-to-Image Search Engine",
        description: "Search through large image collections using natural language descriptions",
        category: "Multimodal AI",
        difficulty: "Advanced",
        technologies: ["CLIP", "FAISS", "FastAPI", "Elasticsearch"],
        features: ["Semantic image search", "Vector indexing", "Real-time search"],
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/text-to-image-search/download",
        githubUrl: "https://github.com/aaai/text-to-image-search"
      },
      {
        id: "multimodal-sentiment",
        title: "Multimodal Sentiment Analysis",
        description: "Analyze sentiment from text, images, and audio using fusion techniques",
        category: "Multimodal AI",
        difficulty: "Advanced",
        technologies: ["BERT", "ResNet", "Wav2Vec2", "PyTorch"],
        features: ["Multi-modal fusion", "Emotion recognition", "Real-time analysis"],
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/multimodal-sentiment/download",
        githubUrl: "https://github.com/aaai/multimodal-sentiment"
      },
      {
        id: "video-understanding-ai",
        title: "Video Understanding AI",
        description: "Comprehensive video analysis including action recognition and scene understanding",
        category: "Multimodal AI",
        difficulty: "Expert",
        technologies: ["TimeSformer", "I3D", "PyTorch", "OpenCV"],
        features: ["Action recognition", "Temporal modeling", "Scene understanding"],
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/video-understanding-ai/download",
        githubUrl: "https://github.com/aaai/video-understanding-ai"
      },
      {
        id: "document-ai-ocr",
        title: "Intelligent Document AI",
        description: "Extract and understand information from complex documents using OCR and NLP",
        category: "Multimodal AI",
        difficulty: "Advanced",
        technologies: ["Tesseract", "LayoutLM", "spaCy", "FastAPI"],
        features: ["OCR processing", "Layout understanding", "Information extraction"],
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/document-ai-ocr/download",
        githubUrl: "https://github.com/aaai/document-ai-ocr"
      },
      {
        id: "ar-object-recognition",
        title: "AR Object Recognition",
        description: "Real-time object recognition and tracking for augmented reality applications",
        category: "Multimodal AI",
        difficulty: "Expert",
        technologies: ["ARCore", "YOLOv8", "OpenCV", "Unity"],
        features: ["Real-time tracking", "3D object detection", "AR visualization"],
        imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/ar-object-recognition/download",
        githubUrl: "https://github.com/aaai/ar-object-recognition"
      },
      {
        id: "multimodal-recommendation",
        title: "Multimodal Recommendation System",
        description: "Recommendation system that uses text, images, and user behavior for personalization",
        category: "Multimodal AI",
        difficulty: "Advanced",
        technologies: ["CLIP", "Collaborative Filtering", "PyTorch", "Redis"],
        features: ["Multi-modal embeddings", "Hybrid recommendations", "Real-time serving"],
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/multimodal-recommendation/download",
        githubUrl: "https://github.com/aaai/multimodal-recommendation"
      },

      // Quantum AI Projects (10)
      {
        id: "quantum-text-classifier",
        title: "Quantum Text Classifier",
        description: "Hybrid classical-quantum approach for text classification using Qiskit and VQC",
        category: "Quantum AI",
        difficulty: "Expert",
        technologies: ["Qiskit", "VQC", "Scikit-learn", "Numpy"],
        features: ["Variational Quantum Circuits", "Qiskit integration", "Hybrid quantum-classical model"],
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/quantum-text-classifier/download",
        githubUrl: "https://github.com/aaai/quantum-text-classifier"
      },
      {
        id: "quantum-neural-network",
        title: "Quantum Neural Networks",
        description: "Implement quantum neural networks using PennyLane for machine learning tasks",
        category: "Quantum AI",
        difficulty: "Expert",
        technologies: ["PennyLane", "PyTorch", "Qiskit", "NumPy"],
        features: ["Quantum layers", "Hybrid optimization", "Quantum gradients"],
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/quantum-neural-network/download",
        githubUrl: "https://github.com/aaai/quantum-neural-network"
      },
      {
        id: "quantum-reinforcement-learning",
        title: "Quantum Reinforcement Learning",
        description: "Quantum advantage in reinforcement learning using quantum approximate optimization",
        category: "Quantum AI",
        difficulty: "Expert",
        technologies: ["Cirq", "OpenAI Gym", "TensorFlow Quantum", "Qiskit"],
        features: ["Quantum policy gradients", "QAOA algorithms", "Quantum advantage"],
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/quantum-reinforcement-learning/download",
        githubUrl: "https://github.com/aaai/quantum-reinforcement-learning"
      },
      {
        id: "quantum-generative-models",
        title: "Quantum Generative Models",
        description: "Implement quantum GANs and quantum variational autoencoders for data generation",
        category: "Quantum AI",
        difficulty: "Expert",
        technologies: ["PennyLane", "Qiskit", "PyTorch", "Quantum GANs"],
        features: ["Quantum GANs", "Quantum VAEs", "Quantum data generation"],
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/quantum-generative-models/download",
        githubUrl: "https://github.com/aaai/quantum-generative-models"
      },
      {
        id: "quantum-optimization",
        title: "Quantum Optimization Algorithms",
        description: "Solve complex optimization problems using quantum annealing and QAOA",
        category: "Quantum AI",
        difficulty: "Expert",
        technologies: ["D-Wave", "QAOA", "Qiskit Optimization", "NetworkX"],
        features: ["Quantum annealing", "QAOA implementation", "Combinatorial optimization"],
        imageUrl: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/quantum-optimization/download",
        githubUrl: "https://github.com/aaai/quantum-optimization"
      },
      {
        id: "quantum-cryptography",
        title: "Quantum Cryptography Protocols",
        description: "Implement quantum key distribution and quantum-safe cryptographic protocols",
        category: "Quantum AI",
        difficulty: "Expert",
        technologies: ["Qiskit", "QKD", "Post-quantum crypto", "Cryptography"],
        features: ["Quantum key distribution", "BB84 protocol", "Quantum-safe algorithms"],
        imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/quantum-cryptography/download",
        githubUrl: "https://github.com/aaai/quantum-cryptography"
      },
      {
        id: "quantum-chemistry-simulation",
        title: "Quantum Chemistry Simulation",
        description: "Simulate molecular systems using quantum computing for drug discovery applications",
        category: "Quantum AI",
        difficulty: "Expert",
        technologies: ["Qiskit Nature", "PySCF", "OpenFermion", "Quantum VQE"],
        features: ["Molecular simulation", "VQE algorithms", "Drug discovery"],
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/quantum-chemistry-simulation/download",
        githubUrl: "https://github.com/aaai/quantum-chemistry-simulation"
      },
      {
        id: "quantum-language-models",
        title: "Quantum Language Models",
        description: "Develop quantum-enhanced language models using quantum attention mechanisms",
        category: "Quantum AI",
        difficulty: "Expert",
        technologies: ["TensorFlow Quantum", "Quantum Attention", "BERT", "Qiskit"],
        features: ["Quantum attention", "Hybrid language models", "Quantum speedup"],
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/quantum-language-models/download",
        githubUrl: "https://github.com/aaai/quantum-language-models"
      },
      {
        id: "quantum-computer-vision",
        title: "Quantum Computer Vision",
        description: "Quantum-enhanced image processing and pattern recognition algorithms",
        category: "Quantum AI",
        difficulty: "Expert",
        technologies: ["Quantum Fourier Transform", "QCNN", "PennyLane", "OpenCV"],
        features: ["Quantum image processing", "Quantum CNNs", "Pattern recognition"],
        imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/quantum-computer-vision/download",
        githubUrl: "https://github.com/aaai/quantum-computer-vision"
      },
      {
        id: "quantum-agi-framework",
        title: "Quantum AGI Framework",
        description: "Experimental quantum artificial general intelligence research framework",
        category: "Quantum AI",
        difficulty: "Expert",
        technologies: ["Multi-quantum systems", "Quantum memory", "AGI architectures", "Qiskit"],
        features: ["Quantum consciousness models", "Multi-qubit reasoning", "AGI simulation"],
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        downloadUrl: "/api/projects/quantum-agi-framework/download",
        githubUrl: "https://github.com/aaai/quantum-agi-framework"
      }
    ];

    projects.forEach(project => {
      this.projects.set(project.id, project);
    });

    // Seed code labs
    const codeLabs: CodeLab[] = [
      {
        id: "linear-regression-pytorch",
        title: "Linear Regression with PyTorch",
        description: "Build your first neural network using PyTorch for linear regression",
        difficulty: "Beginner",
        category: "Deep Learning",
        estimatedTime: 30,
        instructions: `# Linear Regression with PyTorch

## Objective
Learn to implement linear regression using PyTorch's neural network modules.

## Instructions
1. Complete the LinearRegression class implementation
2. Create a training loop with 1000 epochs  
3. Print the loss every 100 epochs
4. Plot the final results showing the fitted line

## Requirements
- Use nn.Linear for the layer
- Use MSELoss as criterion
- Use SGD optimizer with lr=0.01`,
        starterCode: `import torch
import torch.nn as nn
import torch.optim as optim
import matplotlib.pyplot as plt

# TODO: Create a simple linear regression model
class LinearRegression(nn.Module):
    def __init__(self):
        super().__init__()
        # Your code here
        self.linear = nn.Linear(1, 1)
    
    def forward(self, x):
        # Implement forward pass
        return self.linear(x)

# Generate sample data
x = torch.randn(100, 1)
y = 2 * x + 1 + torch.randn(100, 1) * 0.1

# TODO: Create model, loss function, and optimizer
model = LinearRegression()
criterion = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)

# TODO: Implement training loop
`,
        solution: `import torch
import torch.nn as nn
import torch.optim as optim
import matplotlib.pyplot as plt

class LinearRegression(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = nn.Linear(1, 1)
    
    def forward(self, x):
        return self.linear(x)

# Generate sample data
x = torch.randn(100, 1)
y = 2 * x + 1 + torch.randn(100, 1) * 0.1

# Create model, loss function, and optimizer
model = LinearRegression()
criterion = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)

# Training loop
for epoch in range(1000):
    optimizer.zero_grad()
    outputs = model(x)
    loss = criterion(outputs, y)
    loss.backward()
    optimizer.step()
    
    if (epoch + 1) % 100 == 0:
        print(f'Epoch [{epoch+1}/1000], Loss: {loss.item():.4f}')

# Plot results
with torch.no_grad():
    predicted = model(x).detach()
    plt.scatter(x.numpy(), y.numpy(), alpha=0.5)
    plt.plot(x.numpy(), predicted.numpy(), 'r-', linewidth=2)
    plt.show()
`,
        hints: [
          "Remember to call optimizer.zero_grad() before each backward pass",
          "Use loss.backward() to compute gradients",
          "Call optimizer.step() to update parameters"
        ]
      }
    ];

    codeLabs.forEach(lab => {
      this.codeLabs.set(lab.id, lab);
    });

    // Seed documentation
    const documentation: Documentation[] = [
      {
        id: "getting-started",
        title: "Getting Started with AAAI Curriculum",
        content: `# Getting Started with AAAI Curriculum

Welcome to the Anytime Anywhere AI comprehensive curriculum. This guide will help you set up your development environment and start your AI learning journey.

## Prerequisites

- Python 3.8 or higher
- Basic understanding of programming concepts
- Git for version control
- Docker for containerization (optional)

## Environment Setup

First, let's set up your Python environment with the required packages:

\`\`\`bash
# Create a virtual environment
python -m venv aaai-env

# Activate the environment
source aaai-env/bin/activate  # On Linux/Mac
aaai-env\\Scripts\\activate     # On Windows

# Install core packages
pip install torch torchvision tensorflow
pip install transformers datasets
pip install langchain chromadb
pip install scikit-learn pandas numpy
pip install jupyter matplotlib seaborn
\`\`\`

## Your First AI Model

Let's start with a simple linear regression model using PyTorch:

\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim

class SimpleModel(nn.Module):
    def __init__(self):
        super(SimpleModel, self).__init__()
        self.linear = nn.Linear(1, 1)
    
    def forward(self, x):
        return self.linear(x)

# Create model and optimizer
model = SimpleModel()
optimizer = optim.SGD(model.parameters(), lr=0.01)
criterion = nn.MSELoss()
\`\`\`

## Next Steps

1. **Foundation Course**: Master the fundamentals of Python, data handling, and MLOps
2. **Project Templates**: Explore ready-to-use AI project implementations
3. **Code Labs**: Practice with interactive coding exercises
4. **Community**: Join our learning community for support and collaboration
        `,
        category: "getting-started",
        tags: ["setup", "python", "pytorch", "beginner"],
        lastUpdated: new Date()
      }
    ];

    documentation.forEach(doc => {
      this.documentation.set(doc.id, doc);
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      progress: {},
      achievements: [],
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Courses
  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    this.courses.set(course.id, course);
    return course;
  }

  // Projects
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      project => project.category === category
    );
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    this.projects.set(project.id, project);
    return project;
  }

  // Code Labs
  async getAllCodeLabs(): Promise<CodeLab[]> {
    return Array.from(this.codeLabs.values());
  }

  async getCodeLabsByDifficulty(difficulty: string): Promise<CodeLab[]> {
    return Array.from(this.codeLabs.values()).filter(
      lab => lab.difficulty === difficulty
    );
  }

  async getCodeLab(id: string): Promise<CodeLab | undefined> {
    return this.codeLabs.get(id);
  }

  async createCodeLab(lab: InsertCodeLab): Promise<CodeLab> {
    this.codeLabs.set(lab.id, lab);
    return lab;
  }

  // Documentation
  async getAllDocumentation(): Promise<Documentation[]> {
    return Array.from(this.documentation.values());
  }

  async getDocumentationByCategory(category: string): Promise<Documentation[]> {
    return Array.from(this.documentation.values()).filter(
      doc => doc.category === category
    );
  }

  async getDocumentation(id: string): Promise<Documentation | undefined> {
    return this.documentation.get(id);
  }

  async searchDocumentation(query: string): Promise<Documentation[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.documentation.values()).filter(
      doc => 
        doc.title.toLowerCase().includes(lowercaseQuery) ||
        doc.content.toLowerCase().includes(lowercaseQuery) ||
        doc.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  async createDocumentation(doc: InsertDocumentation): Promise<Documentation> {
    const documentation: Documentation = {
      ...doc,
      lastUpdated: new Date()
    };
    this.documentation.set(doc.id, documentation);
    return documentation;
  }

  // User Progress
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(
      progress => progress.userId === userId
    );
  }

  async getUserCourseProgress(userId: string, courseId: string): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(
      progress => progress.userId === userId && progress.courseId === courseId
    );
  }

  async updateUserProgress(progressData: InsertUserProgress): Promise<UserProgress> {
    const id = randomUUID();
    const progress: UserProgress = {
      id,
      lastAccessed: new Date(),
      userId: progressData.userId || null,
      courseId: progressData.courseId || null,
      moduleId: progressData.moduleId || null,
      completed: progressData.completed || null,
      progress: progressData.progress || null
    };
    this.userProgress.set(id, progress);
    return progress;
  }
}

export const storage = new MemStorage();
