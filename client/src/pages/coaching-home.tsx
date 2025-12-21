import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Course } from "@shared/schema";
import { STATIC_COURSES } from "@/components/static-build";
import { 
  GraduationCap, 
  Building2, 
  Users, 
  MapPin, 
  Award, 
  BookOpen,
  Clock,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import ChatWidget from "@/components/chat-widget";
import RegistrationForm from "@/components/registration-form";
import rishirajPhoto from "@assets/Rishiraj_Adhikary_1754909218475.jpg";
import rakeshPhoto from "@assets/Profil_picture_1754909648480.jpg";
import chiragPhoto from "@assets/Chirag_1754909940579.jpg";

interface CoachingCourseCardProps {
  course: Course;
  onRegister: (course: {id: string, title: string, price: number}) => void;
}

function CoachingCourseCard({ course, onRegister }: CoachingCourseCardProps) {
  const [showModules, setShowModules] = useState(false);
  const modules = Array.isArray(course.modules) ? course.modules : [];

  const formatPrice = (price?: number | null) => {
    if (!price) return 'Contact Us';
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const getBadgeColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner level':
        return 'bg-green-100 text-green-800';
      case 'intermediate level': 
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced level':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="relative overflow-hidden border-2 border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-xl">
      <CardHeader className={`bg-gradient-to-r ${course.color} text-white p-6 relative`}>
        <div className="absolute top-4 right-4">
          <Badge className="bg-white/20 text-white text-xs px-2 py-1">
            {course.category}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{course.title}</h3>
          <p className="text-white/90 text-sm">{course.description}</p>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{modules.length} Modules</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{course.weeks || '8-12 weeks'}</span>
            </div>
          </div>
          <Badge className={getBadgeColor(course.difficulty)}>
            {course.difficulty}
          </Badge>
        </div>

        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setShowModules(!showModules)}
            className="w-full justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg"
          >
            <span className="font-medium">View Modules</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showModules ? 'rotate-180' : ''}`} />
          </Button>
          
          {showModules && (
            <div className="mt-3 space-y-2 bg-gray-50 p-4 rounded-lg">
              {modules.map((module, index) => (
                <div key={module.id || index} className="flex items-center text-sm">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                    {index + 1}
                  </span>
                  <span>{module.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-gray-900">
            {formatPrice(course.price)}
          </div>
        </div>

        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          onClick={() => onRegister({
            id: course.id,
            title: course.title,
            price: course.price || 0
          })}
        >
          Start Your Journey
        </Button>
      </CardContent>
    </Card>
  );
}

export default function CoachingHome() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{id: string, title: string, price: number} | undefined>();

  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
    // Use static data as fallback for production builds
    placeholderData: STATIC_COURSES as Course[],
  });

  const openRegistration = (course?: {id: string, title: string, price: number}) => {
    setSelectedCourse(course);
    setIsRegistrationOpen(true);
  };

  if (coursesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const allCourses = (courses || STATIC_COURSES) as Course[];

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Moving Robot Icons */}
          <div className="absolute top-20 left-0 animate-slide-right opacity-60">
            <svg className="w-8 h-8 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c1.1 0 2 .9 2 2v2h3c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h3V4c0-1.1.9-2 2-2zm0 4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm-1 2v4l3-2-3-2z"/>
              <circle cx="9" cy="15" r="1"/>
              <circle cx="15" cy="15" r="1"/>
            </svg>
          </div>
          <div className="absolute bottom-32 right-0 animate-slide-left opacity-50">
            <svg className="w-10 h-10 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c1.1 0 2 .9 2 2v2h3c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h3V4c0-1.1.9-2 2-2z"/>
              <circle cx="9" cy="9" r="1.5"/>
              <circle cx="15" cy="9" r="1.5"/>
              <path d="M9 13h6v2H9z"/>
            </svg>
          </div>

          {/* Neural Network Visualization */}
          <svg className="absolute top-10 right-10 w-32 h-32 opacity-30" viewBox="0 0 100 100">
            <circle cx="20" cy="20" r="3" fill="rgba(147,197,253,0.8)">
              <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="80" cy="30" r="3" fill="rgba(196,181,253,0.8)">
              <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="50" cy="70" r="3" fill="rgba(255,255,255,0.8)">
              <animate attributeName="r" values="2;4;2" dur="4s" repeatCount="indefinite"/>
            </circle>
            <line x1="20" y1="20" x2="80" y2="30" stroke="rgba(147,197,253,0.4)" strokeWidth="1">
              <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite"/>
            </line>
            <line x1="80" y1="30" x2="50" y2="70" stroke="rgba(196,181,253,0.4)" strokeWidth="1">
              <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="2.5s" repeatCount="indefinite"/>
            </line>
            <line x1="20" y1="20" x2="50" y2="70" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
              <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="4s" repeatCount="indefinite"/>
            </line>
          </svg>

          {/* Deep Learning Layers */}
          <div className="absolute bottom-10 left-10 opacity-40">
            <div className="space-y-1">
              <div className="w-16 h-2 bg-blue-300 rounded animate-pulse"></div>
              <div className="w-12 h-2 bg-purple-300 rounded animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-14 h-2 bg-white rounded animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="w-10 h-2 bg-blue-200 rounded animate-pulse" style={{animationDelay: '1.5s'}}></div>
            </div>
          </div>

          {/* GenAI Sparkle Effect */}
          <div className="absolute top-1/3 left-1/5 opacity-50">
            <div className="relative">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              <div className="absolute top-0 left-0 w-2 h-2 bg-purple-300 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="absolute top-2/3 right-1/4 opacity-40">
            <div className="relative">
              <div className="w-3 h-3 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>

          {/* ML Application Boxes */}
          <div className="absolute top-1/4 right-1/3 opacity-30">
            <div className="w-8 h-6 border border-blue-300 rounded animate-pulse flex items-center justify-center">
              <div className="w-4 h-1 bg-blue-300 rounded"></div>
            </div>
          </div>
          <div className="absolute bottom-1/3 left-1/3 opacity-40">
            <div className="w-10 h-8 border border-purple-300 rounded animate-bounce flex flex-col items-center justify-center space-y-1">
              <div className="w-6 h-1 bg-purple-300 rounded"></div>
              <div className="w-4 h-1 bg-purple-300 rounded"></div>
            </div>
          </div>

          {/* Floating AI/ML/DL Text with Enhanced Animation */}
          <div className="absolute top-24 right-10 text-blue-200 text-lg font-bold opacity-50 animate-float">AI</div>
          <div className="absolute bottom-32 left-32 text-purple-200 text-lg font-bold opacity-60 animate-float-delayed">ML</div>
          <div className="absolute top-1/2 right-16 text-white text-lg font-bold opacity-50 animate-float">DL</div>
          <div className="absolute bottom-1/4 left-16 text-blue-300 text-sm font-mono opacity-40 animate-bounce">Neural</div>
          <div className="absolute top-16 left-1/3 text-purple-300 text-sm font-mono opacity-50 animate-pulse">GenAI</div>
          <div className="absolute bottom-16 right-1/4 text-blue-200 text-sm font-mono opacity-40 animate-bounce">GPU</div>
          <div className="absolute top-40 left-20 text-white text-xs font-mono opacity-30 animate-pulse">Transformer</div>
          <div className="absolute bottom-40 right-20 text-purple-200 text-xs font-mono opacity-40 animate-bounce">CNN</div>

          {/* Data Flow Animation */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <path d="M0,50 Q25,25 50,50 T100,50" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none">
              <animate attributeName="stroke-dasharray" values="0,200;100,100;0,200" dur="6s" repeatCount="indefinite"/>
            </path>
            <path d="M100,30 Q75,10 50,30 T0,30" stroke="rgba(147,197,253,0.4)" strokeWidth="1" fill="none">
              <animate attributeName="stroke-dasharray" values="0,200;100,100;0,200" dur="4s" repeatCount="indefinite"/>
            </path>
            <path d="M0,80 Q25,60 50,80 T100,80" stroke="rgba(196,181,253,0.3)" strokeWidth="1" fill="none">
              <animate attributeName="stroke-dasharray" values="0,200;100,100;0,200" dur="5s" repeatCount="indefinite"/>
            </path>
          </svg>

          {/* Quantum Computing Visualization */}
          <div className="absolute top-20 left-1/2 opacity-30">
            <div className="w-6 h-6 border-2 border-white rounded-full animate-spin">
              <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1 animate-ping"></div>
            </div>
          </div>

          {/* Matrix-style Digital Rain */}
          <div className="absolute top-0 left-1/4 opacity-20 animate-matrix-fall">
            <div className="text-green-300 text-xs font-mono space-y-1">
              <div className="animate-pulse">1</div>
              <div className="animate-pulse" style={{animationDelay: '0.2s'}}>0</div>
              <div className="animate-pulse" style={{animationDelay: '0.4s'}}>1</div>
              <div className="animate-pulse" style={{animationDelay: '0.6s'}}>1</div>
              <div className="animate-pulse" style={{animationDelay: '0.8s'}}>0</div>
            </div>
          </div>
          <div className="absolute top-0 right-1/3 opacity-15 animate-matrix-fall-delayed">
            <div className="text-blue-300 text-xs font-mono space-y-1">
              <div className="animate-pulse">0</div>
              <div className="animate-pulse" style={{animationDelay: '0.3s'}}>1</div>
              <div className="animate-pulse" style={{animationDelay: '0.6s'}}>0</div>
              <div className="animate-pulse" style={{animationDelay: '0.9s'}}>1</div>
            </div>
          </div>

          {/* Floating Geometric Particles */}
          <div className="absolute top-1/4 left-1/6 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rotate-45 animate-float-particle opacity-40"></div>
          <div className="absolute top-3/4 right-1/6 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float-particle-delayed opacity-50"></div>
          <div className="absolute top-1/2 left-1/8 w-2 h-6 bg-gradient-to-b from-blue-300 to-cyan-300 animate-rotate-particle opacity-35"></div>
          <div className="absolute bottom-1/4 right-1/8 w-5 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse-particle opacity-45"></div>

          {/* AI Brain Visualization */}
          <div className="absolute top-16 right-1/6 opacity-25">
            <svg className="w-16 h-16 animate-pulse-slow" viewBox="0 0 50 50">
              <circle cx="25" cy="15" r="2" fill="rgba(147,197,253,0.8)">
                <animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
              </circle>
              <circle cx="15" cy="25" r="2" fill="rgba(196,181,253,0.8)">
                <animate attributeName="r" values="1;3;1" dur="3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="35" cy="25" r="2" fill="rgba(255,255,255,0.8)">
                <animate attributeName="r" values="1;3;1" dur="5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="25" cy="35" r="2" fill="rgba(147,197,253,0.8)">
                <animate attributeName="r" values="1;3;1" dur="3.5s" repeatCount="indefinite"/>
              </circle>
              <path d="M25,15 L15,25 L25,35 L35,25 Z" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" fill="none">
                <animate attributeName="stroke-opacity" values="0.1;0.6;0.1" dur="6s" repeatCount="indefinite"/>
              </path>
            </svg>
          </div>

          {/* Particle System */}
          <div className="absolute top-10 left-20 w-1 h-1 bg-white rounded-full animate-particle-drift opacity-60"></div>
          <div className="absolute top-32 right-32 w-1 h-1 bg-blue-300 rounded-full animate-particle-drift-delayed opacity-50"></div>
          <div className="absolute bottom-20 left-40 w-1 h-1 bg-purple-300 rounded-full animate-particle-orbit opacity-40"></div>
          <div className="absolute bottom-40 right-20 w-1 h-1 bg-cyan-300 rounded-full animate-particle-spiral opacity-55"></div>
          <div className="absolute top-2/3 left-10 w-1 h-1 bg-pink-300 rounded-full animate-particle-bounce opacity-45"></div>
          <div className="absolute top-1/3 right-10 w-1 h-1 bg-green-300 rounded-full animate-particle-zigzag opacity-50"></div>

          {/* Code Blocks Animation */}
          <div className="absolute bottom-1/2 left-5 opacity-20 animate-code-scroll">
            <div className="text-xs font-mono text-blue-200 space-y-1">
              <div>def ai_model():</div>
              <div>&nbsp;&nbsp;return "GPT"</div>
            </div>
          </div>
          <div className="absolute top-1/3 right-5 opacity-15 animate-code-scroll-delayed">
            <div className="text-xs font-mono text-purple-200 space-y-1">
              <div>import torch</div>
              <div>model.train()</div>
            </div>
          </div>

          {/* DNA Helix Animation */}
          <svg className="absolute bottom-10 right-10 w-24 h-24 opacity-20" viewBox="0 0 100 100">
            <path d="M20,10 Q50,30 80,10" stroke="rgba(147,197,253,0.5)" strokeWidth="2" fill="none">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50" dur="8s" repeatCount="indefinite"/>
            </path>
            <path d="M20,30 Q50,50 80,30" stroke="rgba(196,181,253,0.5)" strokeWidth="2" fill="none">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="120 50 50" to="480 50 50" dur="8s" repeatCount="indefinite"/>
            </path>
            <path d="M20,50 Q50,70 80,50" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="240 50 50" to="600 50 50" dur="8s" repeatCount="indefinite"/>
            </path>
          </svg>

          {/* Tech Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
              <div className="border-r border-b border-white animate-grid-pulse"></div>
              <div className="border-r border-b border-white animate-grid-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="border-r border-b border-white animate-grid-pulse" style={{animationDelay: '1s'}}></div>
              <div className="border-r border-b border-white animate-grid-pulse" style={{animationDelay: '1.5s'}}></div>
              <div className="border-r border-b border-white animate-grid-pulse" style={{animationDelay: '2s'}}></div>
              <div className="border-r border-b border-white animate-grid-pulse" style={{animationDelay: '0.8s'}}></div>
            </div>
          </div>

          {/* Energy Waves */}
          <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 400 300">
            <circle cx="50" cy="150" r="30" stroke="rgba(147,197,253,0.4)" strokeWidth="1" fill="none">
              <animate attributeName="r" values="10;40;10" dur="6s" repeatCount="indefinite"/>
              <animate attributeName="stroke-opacity" values="0.8;0.2;0.8" dur="6s" repeatCount="indefinite"/>
            </circle>
            <circle cx="350" cy="100" r="25" stroke="rgba(196,181,253,0.4)" strokeWidth="1" fill="none">
              <animate attributeName="r" values="15;35;15" dur="5s" repeatCount="indefinite"/>
              <animate attributeName="stroke-opacity" values="0.8;0.2;0.8" dur="5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="200" cy="200" r="35" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none">
              <animate attributeName="r" values="20;45;20" dur="7s" repeatCount="indefinite"/>
              <animate attributeName="stroke-opacity" values="0.8;0.2;0.8" dur="7s" repeatCount="indefinite"/>
            </circle>
          </svg>

          {/* Agentic AI Decision Trees */}
          <div className="absolute top-12 left-1/3 opacity-30">
            <svg className="w-20 h-20 animate-agent-thinking" viewBox="0 0 80 80">
              <circle cx="40" cy="15" r="3" fill="rgba(34,197,94,0.8)">
                <animate attributeName="fill" values="rgba(34,197,94,0.8);rgba(59,130,246,0.8);rgba(34,197,94,0.8)" dur="3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="25" cy="35" r="2" fill="rgba(59,130,246,0.6)">
                <animate attributeName="fill" values="rgba(59,130,246,0.6);rgba(168,85,247,0.6);rgba(59,130,246,0.6)" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="55" cy="35" r="2" fill="rgba(168,85,247,0.6)">
                <animate attributeName="fill" values="rgba(168,85,247,0.6);rgba(34,197,94,0.6);rgba(168,85,247,0.6)" dur="2.8s" repeatCount="indefinite"/>
              </circle>
              <circle cx="15" cy="55" r="1.5" fill="rgba(239,68,68,0.7)">
                <animate attributeName="r" values="1;2.5;1" dur="4s" repeatCount="indefinite"/>
              </circle>
              <circle cx="35" cy="55" r="1.5" fill="rgba(34,197,94,0.7)">
                <animate attributeName="r" values="1;2.5;1" dur="3.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="45" cy="55" r="1.5" fill="rgba(59,130,246,0.7)">
                <animate attributeName="r" values="1;2.5;1" dur="4.2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="65" cy="55" r="1.5" fill="rgba(168,85,247,0.7)">
                <animate attributeName="r" values="1;2.5;1" dur="3.8s" repeatCount="indefinite"/>
              </circle>
              <line x1="40" y1="15" x2="25" y2="35" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite"/>
              </line>
              <line x1="40" y1="15" x2="55" y2="35" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3.2s" repeatCount="indefinite"/>
              </line>
              <line x1="25" y1="35" x2="15" y2="55" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8">
                <animate attributeName="stroke-opacity" values="0.1;0.6;0.1" dur="2.5s" repeatCount="indefinite"/>
              </line>
              <line x1="25" y1="35" x2="35" y2="55" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8">
                <animate attributeName="stroke-opacity" values="0.1;0.6;0.1" dur="2.8s" repeatCount="indefinite"/>
              </line>
              <line x1="55" y1="35" x2="45" y2="55" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8">
                <animate attributeName="stroke-opacity" values="0.1;0.6;0.1" dur="3.1s" repeatCount="indefinite"/>
              </line>
              <line x1="55" y1="35" x2="65" y2="55" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8">
                <animate attributeName="stroke-opacity" values="0.1;0.6;0.1" dur="3.3s" repeatCount="indefinite"/>
              </line>
            </svg>
          </div>

          {/* Autonomous Agent Pathfinding */}
          <div className="absolute bottom-16 left-1/4 opacity-25">
            <svg className="w-24 h-16 animate-pathfinding" viewBox="0 0 100 60">
              <circle cx="10" cy="30" r="2" fill="rgba(34,197,94,0.8)" className="animate-agent-start">
                <animate attributeName="fill" values="rgba(34,197,94,0.8);rgba(59,130,246,0.8);rgba(34,197,94,0.8)" dur="1s" repeatCount="indefinite"/>
              </circle>
              <circle cx="90" cy="30" r="2" fill="rgba(239,68,68,0.8)" className="animate-pulse">
                <animate attributeName="fill" values="rgba(239,68,68,0.8);rgba(168,85,247,0.8);rgba(239,68,68,0.8)" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              <path d="M10,30 Q30,15 50,30 T90,30" stroke="rgba(34,197,94,0.5)" strokeWidth="2" fill="none" strokeDasharray="5,3">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="4s" repeatCount="indefinite"/>
              </path>
              <circle cx="10" cy="30" r="1" fill="rgba(34,197,94,1)" className="animate-agent-move">
                <animateMotion dur="8s" repeatCount="indefinite">
                  <mpath href="#agentPath"/>
                </animateMotion>
              </circle>
              <path id="agentPath" d="M10,30 Q30,15 50,30 T90,30" fill="none"/>
            </svg>
          </div>

          {/* Multi-Agent Swarm Intelligence */}
          <div className="absolute top-1/2 right-1/5 opacity-30">
            <div className="relative w-16 h-16">
              <div className="absolute top-2 left-2 w-2 h-2 bg-blue-400 rounded-full animate-swarm-agent-1"></div>
              <div className="absolute top-8 right-2 w-2 h-2 bg-green-400 rounded-full animate-swarm-agent-2"></div>
              <div className="absolute bottom-2 left-4 w-2 h-2 bg-purple-400 rounded-full animate-swarm-agent-3"></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-pink-400 rounded-full animate-swarm-agent-4"></div>
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-cyan-400 rounded-full animate-swarm-center transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>

          {/* Reasoning Chain Animation */}
          <div className="absolute bottom-1/3 right-1/6 opacity-25 animate-reasoning-chain">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-300 rounded animate-reason-step-1"></div>
              <div className="w-1 h-1 bg-white rounded animate-reason-arrow-1"></div>
              <div className="w-3 h-3 bg-purple-300 rounded animate-reason-step-2"></div>
              <div className="w-1 h-1 bg-white rounded animate-reason-arrow-2"></div>
              <div className="w-3 h-3 bg-green-300 rounded animate-reason-step-3"></div>
            </div>
          </div>

          {/* Planning Algorithm Visualization */}
          <div className="absolute top-1/4 left-1/8 opacity-20">
            <svg className="w-18 h-18 animate-planning-algo" viewBox="0 0 70 70">
              <rect x="10" y="10" width="8" height="8" fill="rgba(59,130,246,0.6)" rx="1">
                <animate attributeName="fill" values="rgba(59,130,246,0.6);rgba(34,197,94,0.8);rgba(59,130,246,0.6)" dur="2s" repeatCount="indefinite"/>
              </rect>
              <rect x="30" y="10" width="8" height="8" fill="rgba(168,85,247,0.6)" rx="1">
                <animate attributeName="fill" values="rgba(168,85,247,0.6);rgba(34,197,94,0.8);rgba(168,85,247,0.6)" dur="2.5s" repeatCount="indefinite"/>
              </rect>
              <rect x="50" y="10" width="8" height="8" fill="rgba(34,197,94,0.6)" rx="1">
                <animate attributeName="fill" values="rgba(34,197,94,0.6);rgba(59,130,246,0.8);rgba(34,197,94,0.6)" dur="3s" repeatCount="indefinite"/>
              </rect>
              <rect x="10" y="30" width="8" height="8" fill="rgba(239,68,68,0.6)" rx="1">
                <animate attributeName="fill" values="rgba(239,68,68,0.6);rgba(168,85,247,0.8);rgba(239,68,68,0.6)" dur="1.8s" repeatCount="indefinite"/>
              </rect>
              <rect x="30" y="30" width="8" height="8" fill="rgba(34,197,94,0.6)" rx="1">
                <animate attributeName="fill" values="rgba(34,197,94,0.6);rgba(239,68,68,0.8);rgba(34,197,94,0.6)" dur="2.2s" repeatCount="indefinite"/>
              </rect>
              <rect x="50" y="30" width="8" height="8" fill="rgba(59,130,246,0.6)" rx="1">
                <animate attributeName="fill" values="rgba(59,130,246,0.6);rgba(34,197,94,0.8);rgba(59,130,246,0.6)" dur="2.8s" repeatCount="indefinite"/>
              </rect>
              <rect x="10" y="50" width="8" height="8" fill="rgba(168,85,247,0.6)" rx="1">
                <animate attributeName="fill" values="rgba(168,85,247,0.6);rgba(59,130,246,0.8);rgba(168,85,247,0.6)" dur="3.2s" repeatCount="indefinite"/>
              </rect>
              <rect x="30" y="50" width="8" height="8" fill="rgba(34,197,94,0.6)" rx="1">
                <animate attributeName="fill" values="rgba(34,197,94,0.6);rgba(168,85,247,0.8);rgba(34,197,94,0.6)" dur="1.5s" repeatCount="indefinite"/>
              </rect>
              <rect x="50" y="50" width="8" height="8" fill="rgba(239,68,68,0.6)" rx="1">
                <animate attributeName="fill" values="rgba(239,68,68,0.6);rgba(34,197,94,0.8);rgba(239,68,68,0.6)" dur="2.7s" repeatCount="indefinite"/>
              </rect>
            </svg>
          </div>

          {/* Agent Communication Network */}
          <div className="absolute top-2/3 left-1/2 opacity-25 transform -translate-x-1/2">
            <svg className="w-20 h-12 animate-agent-network" viewBox="0 0 80 50">
              <circle cx="15" cy="25" r="3" fill="rgba(59,130,246,0.7)">
                <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="40" cy="15" r="3" fill="rgba(34,197,94,0.7)">
                <animate attributeName="r" values="2;4;2" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="65" cy="25" r="3" fill="rgba(168,85,247,0.7)">
                <animate attributeName="r" values="2;4;2" dur="3.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="40" cy="35" r="3" fill="rgba(239,68,68,0.7)">
                <animate attributeName="r" values="2;4;2" dur="2.8s" repeatCount="indefinite"/>
              </circle>
              <line x1="15" y1="25" x2="40" y2="15" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="4s" repeatCount="indefinite"/>
              </line>
              <line x1="40" y1="15" x2="65" y2="25" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3.5s" repeatCount="indefinite"/>
              </line>
              <line x1="65" y1="25" x2="40" y2="35" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3.8s" repeatCount="indefinite"/>
              </line>
              <line x1="40" y1="35" x2="15" y2="25" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="4.2s" repeatCount="indefinite"/>
              </line>
            </svg>
          </div>

          {/* Reinforcement Learning Reward Signal */}
          <div className="absolute top-3/4 right-1/3 opacity-30">
            <div className="relative">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-reward-signal">
                <div className="absolute inset-0 bg-green-300 rounded-full animate-ping"></div>
              </div>
              <div className="absolute -top-1 -right-1 text-xs text-green-300 font-bold animate-pulse">+R</div>
            </div>
          </div>

          {/* LLM Agent Text Generation */}
          <div className="absolute bottom-1/4 left-1/6 opacity-20">
            <div className="text-xs font-mono text-cyan-300 space-y-0.5 animate-text-generation">
              <div className="animate-typing-1">Thinking...</div>
              <div className="animate-typing-2">Planning...</div>
              <div className="animate-typing-3">Acting...</div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-hero-title-reveal">
              RTPR AI PathShala            
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-hero-subtitle-reveal">
              Expert AI/ML career support with IIT alumni and top professionals from Google, Jio, IISc Bangalore, and leading research institutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <Button
                size="lg"
                onClick={() => openRegistration()}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold transform hover:scale-110 transition-all duration-300 hover:shadow-2xl animate-button-pulse"
              >
                Start Your Journey
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  const coursesSection = document.getElementById('courses-section');
                  coursesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold transform hover:scale-110 transition-all duration-300 hover:shadow-2xl animate-button-pulse"
                style={{animationDelay: '0.2s'}}
              >
                View Courses
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide Section */}
      <section className="py-16 bg-white animate-section-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-text-glow">
              What We Provide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-text-fade-in">
              Comprehensive support and opportunities for your AI/ML career journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-card-float hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 group">
              <CardContent className="pt-6">
                <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-700 transition-colors">Certificate of Completion</h3>
                <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">From a reputed foreign (abroad) university</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-card-float hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 group" style={{animationDelay: '0.1s'}}>
              <CardContent className="pt-6">
                <Building2 className="h-12 w-12 text-green-600 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <h3 className="text-lg font-semibold mb-2 group-hover:text-green-700 transition-colors">Internship Opportunities</h3>
                <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">At IITs, reputed companies, IISc, and international universities</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-card-float hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 group" style={{animationDelay: '0.2s'}}>
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-700 transition-colors">Placement Assistance</h3>
                <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">Help secure job opportunities after course completion</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-card-float hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100 group" style={{animationDelay: '0.3s'}}>
              <CardContent className="pt-6">
                <MapPin className="h-12 w-12 text-red-600 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <h3 className="text-lg font-semibold mb-2 group-hover:text-red-700 transition-colors">Educational Visits</h3>
                <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">Support for visits to minimum three IITs or all IITs</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-card-float hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100 group" style={{animationDelay: '0.4s'}}>
              <CardContent className="pt-6">
                <Building2 className="h-12 w-12 text-orange-600 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-700 transition-colors">Industry Exposure</h3>
                <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">Visits to at least three top-tier companies</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-card-float hover:bg-gradient-to-br hover:from-indigo-50 hover:to-indigo-100 group" style={{animationDelay: '0.5s'}}>
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-indigo-600 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-700 transition-colors">Expert Faculty</h3>
                <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">From domain-specific and interdisciplinary departments</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses-section" className="py-16 bg-gray-50 animate-section-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-text-glow">
              Curriculum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-text-fade-in">
              Choose from our comprehensive AI/ML curriculum designed for career success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCourses.map((course, index) => (
              <div key={course.id} className="animate-card-stagger" style={{animationDelay: `${index * 0.1}s`}}>
                <CoachingCourseCard course={course} onRegister={openRegistration} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Instructors */}
      <section className="py-16 bg-white animate-section-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-text-glow">
              Meet Our Instructors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-text-fade-in">
              Industry experts with extensive experience in AI/ML research and implementation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-card-float hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 group animate-card-stagger">
              <CardContent className="pt-6">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src={rishirajPhoto} 
                    alt="Dr. Rishiraj Adhikary"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-700 transition-colors">Dr. Rishiraj Adhikary</h3>
                <p className="text-blue-600 font-medium mb-2">Research Data Scientist at Reliance</p>
                <div className="text-sm text-gray-600 space-y-1 group-hover:text-gray-700 transition-colors">
                  <p>Ph.D. Computer Science - IIT Gandhinagar</p>
                  <p>Prime Minister Research Fellow</p>
                  <p>Fulbright Visiting Researcher - CMU</p>
                  <p>Commendation for Outstanding Research</p>
                </div>
              </CardContent>
            </Card>



            <Card className="text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-card-float hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 group animate-card-stagger" style={{animationDelay: '0.2s'}}>
              <CardContent className="pt-6">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full group-hover:scale-110 transition-all duration-300">
                  <img 
                    src={chiragPhoto} 
                    alt="Chirag Modi"
                    className="w-full h-full object-cover object-top scale-150"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-purple-700 transition-colors">Chirag Modi</h3>
                <p className="text-purple-600 font-medium mb-2">Data Scientist at Turing</p>
                <div className="text-sm text-gray-600 space-y-1 group-hover:text-gray-700 transition-colors">
                  <p>M.Tech CSE - IIT Gandhinagar (9.12 CGPA)</p>
                  <p>GATE AIR 543 / 80K candidates</p>
                  <p>Ex Software Engineer - WiseDV</p>
                  <p>6-star HackerRank & 350+ LeetCode</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-card-float hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100 group animate-card-stagger" style={{animationDelay: '0.3s'}}>
              <CardContent className="pt-6">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full group-hover:scale-110 transition-all duration-300">
                  <img 
                    src={rakeshPhoto} 
                    alt="Rakesh Thakur"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-orange-700 transition-colors">Rakesh Thakur</h3>
                <p className="text-orange-600 font-medium mb-2">Researcher at IISc Bangalore & AI Scientist</p>
                <div className="text-sm text-gray-600 space-y-1 group-hover:text-gray-700 transition-colors">
                  <p>Dual M.Tech - IIT Gandhinagar</p>
                  <p>Assistant Prof - Chandigarh & Amity</p>
                  <p>16 Published Research Papers</p>
                  <p>₹4 Crore ICMR Projects Collaborator</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
                  Hands-On Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Build real-world applications and contribute to open-source projects that showcase your skills to potential employers.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Users className="h-6 w-6 mr-3 text-green-600" />
                  Community & Mentorship
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Join a thriving community of learners and get personalized mentorship throughout your journey and beyond.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Award className="h-6 w-6 mr-3 text-purple-600" />
                  Career Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Resume reviews, mock interviews, and direct connections to our hiring partner network of 200+ companies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* International Students Guidance Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🇮🇳🇳🇵🇧🇹 Specialized Support for Regional Students
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Comprehensive guidance and support for Indian, Nepali, and Bhutani students seeking IIT admissions, research internships, and career opportunities at premier Indian institutes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* IIT Admission Guidance */}
            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-blue-700">
                  <GraduationCap className="h-6 w-6 mr-3" />
                  IIT Admission Guidance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• JEE Advanced preparation strategies</li>
                  <li>• GATE exam guidance for postgraduate programs</li>
                  <li>• Application process for international students</li>
                  <li>• Scholarship opportunities and financial aid</li>
                  <li>• Document preparation and visa assistance</li>
                </ul>
              </CardContent>
            </Card>

            {/* Research Internships */}
            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-green-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-green-700">
                  <Building2 className="h-6 w-6 mr-3" />
                  Research Internships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Summer Research Fellowship Program (SRFP)</li>
                  <li>• IISc and IIT research opportunities</li>
                  <li>• AI/ML research project placements</li>
                  <li>• Quantum computing research positions</li>
                  <li>• Industry collaboration programs</li>
                </ul>
              </CardContent>
            </Card>

            {/* Cultural Integration */}
            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-purple-700">
                  <Users className="h-6 w-6 mr-3" />
                  Cultural Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Regional student community networks</li>
                  <li>• Language support for academic success</li>
                  <li>• Cultural adaptation workshops</li>
                  <li>• Peer mentorship programs</li>
                  <li>• Alumni network connections</li>
                </ul>
              </CardContent>
            </Card>

            {/* Career Pathways */}
            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-orange-700">
                  <MapPin className="h-6 w-6 mr-3" />
                  Career Pathways
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Tech industry placement assistance</li>
                  <li>• Startup ecosystem introductions</li>
                  <li>• Government research opportunities</li>
                  <li>• International collaboration projects</li>
                  <li>• Return-to-home-country programs</li>
                </ul>
              </CardContent>
            </Card>

            {/* Special Programs */}
            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-red-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-red-700">
                  <Award className="h-6 w-6 mr-3" />
                  Special Programs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• SAARC scholarship applications</li>
                  <li>• Cross-border research initiatives</li>
                  <li>• Regional technology exchanges</li>
                  <li>• Himalayan AI research consortium</li>
                  <li>• South Asian innovation networks</li>
                </ul>
              </CardContent>
            </Card>

            {/* Success Stories */}
            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-teal-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-teal-700">
                  <BookOpen className="h-6 w-6 mr-3" />
                  Success Stories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• 200+ successful IIT admissions</li>
                  <li>• 150+ research internship placements</li>
                  <li>• 95% visa approval rate</li>
                  <li>• Top tech company placements</li>
                  <li>• Alumni in leading AI research labs</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Begin Your AI Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our specialized counselors understand the unique challenges faced by regional students and provide personalized guidance for every step of your academic journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => openRegistration()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Schedule Admission Counseling
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
                Download IIT Preparation Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <ChatWidget />

      {/* Registration Form */}
      <RegistrationForm 
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        selectedCourse={selectedCourse}
      />
    </main>
  );
}