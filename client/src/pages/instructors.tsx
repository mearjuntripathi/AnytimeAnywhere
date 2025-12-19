import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Building2, 
  Users, 
  MapPin, 
  Award, 
  BookOpen,
  Mail,
  Linkedin,
  ExternalLink
} from "lucide-react";
import rishirajPhoto from "@assets/Rishiraj_Adhikary_1754909218475.jpg";
import ashinPhoto from "@assets/WhatsApp Image 2025-08-11 at 16.22.42_1754909591338.jpeg";
import rakeshPhoto from "@assets/Profil_picture_1754909648480.jpg";
import chiragPhoto from "@assets/Chirag_1754909940579.jpg";

const instructors = [
  {
    id: 1,
    name: "Dr. Rishiraj Adhikary",
    title: "Research Data Scientist at Reliance",
    education: "Ph.D. Computer Science, IIT Gandhinagar (January 2025)",
    specializations: ["Ubiquitous Computing", "Health Sensing", "Signal Processing", "Thermal Imaging", "Respiratory Monitoring"],
    experience: "PhD in Computer Science with specialization in health sensing systems",
    description: "Research Data Scientist at Reliance with PhD in Computer Science from IIT Gandhinagar, specializing in Ubiquitous Computing and health sensing. Awarded Commendation for Outstanding Research and finalist for UbiComp Gaetano Borriello Outstanding Student Award. Former Fulbright Visiting Researcher at Carnegie Mellon University's SMASH Lab.",
    photo: rishirajPhoto,
    courses: ["Foundation Course", "Machine Learning", "Health Sensing Systems"],
    achievements: [
      "Commendation for Outstanding Research in PhD at IIT Gandhinagar's 14th Convocation",
      "Finalist for UbiComp Gaetano Borriello Outstanding Student Award (2023)",
      "Fulbright Visiting Researcher at Carnegie Mellon University's SMASH Lab",
      "Best poster award in PhD Research Showcase at IIT Gandhinagar (2023)",
      "Prime Minister's Research Fellowship recipient",
      "Google Summer of Code (GSoC) Participant - TensorFlow Lite contributor",
      "Published in top-tier venues: ACM IMWUT, ACM HEALTH, ACM CSCW, UbiComp/ISWC",
      "Presented at 11th Heidelberg Laureate Forum (HLF)"
    ]
  },
  {
    id: 2,
    name: "Ashin Shanty",
    title: "Software Engineer III (SW3) at Google",
    education: "M.Tech Computer Science & Engineering, IIT Gandhinagar",
    specializations: ["Software Engineering", "System Design", "Cloud Computing", "Machine Learning", "Scalable Systems"],
    experience: "4+ years in software engineering at top tech companies (Google, Oracle)",
    description: "Software Engineer III at Google with Master's in Technology from IIT Gandhinagar. Director's Silver Medal winner with expertise in large-scale system design and distributed systems. Former Member of Technical Staff at Oracle Cloud Infrastructure and Research Scientist Intern at TCS Research Labs.",
    photo: ashinPhoto,
    courses: ["Software Engineering", "System Design", "Cloud Computing", "Scalable Systems"],
    achievements: [
      "Software Engineer III (SW3) at Google",
      "Director's Silver Medal for Academic Excellence at IIT Gandhinagar (9.0/10 CGPA)",
      "Former Member of Technical Staff at Oracle Cloud Infrastructure",
      "Architected petabyte-scale ETL pipelines using PySpark on OCI",
      "Designed enterprise-wide Generative AI RAG chatbot with 60% automation",
      "ICPC 2018 Regional Finalist",
      "Published research at ACM IKDD CODS and COMAD conferences",
      "Former Research Scientist Intern at TCS Research Labs"
    ]
  },
  {
    id: 3,
    name: "Rakesh Thakur",
    title: "Researcher at IISc Bangalore & AI Scientist",
    education: "Dual M.Tech (Computer Science & Biological Engineering), IIT Gandhinagar",
    specializations: ["AI/ML Research", "NLP", "Generative AI", "Multimodal AI", "LLM Fine-tuning", "Data Science"],
    experience: "5+ years in AI research, academia, and teaching with extensive industry experience",
    description: "AI Researcher at IISc Bangalore and experienced AI Scientist with dual M.Tech degrees from IIT Gandhinagar and 16 published research papers. Extensive teaching experience as Assistant Professor at both Chandigarh University and Amity University. Expert in developing multimodal AI models for healthcare institutions including AIIMS and KGMU.",
    photo: rakeshPhoto,
    courses: ["Foundation Course", "Machine Learning", "NLP", "Generative AI", "Research Methodology"],
    achievements: [
      "Researcher at IISc Bangalore & AI Scientist",
      "Assistant Professor at Chandigarh University (Jul 2024 - Dec 2024)",
      "Assistant Professor at Amity University (Jan 2025 - Present)",
      "Dual M.Tech degrees from IIT Gandhinagar (Computer Science & Biological Engineering)",
      "Published 16 research papers in IEEE conferences, bioRxiv, and arXiv",
      "Collaborator in ₹4 Crore ICMR research projects with AIIMS and KGMU",
      "AI Researcher at IIT Gandhinagar Lingo Lab (2021-2024)",
      "Granted 2 Design Registrations for AI devices",
      "Expert in LLM fine-tuning (GPT, BERT, RoBERTa) and RAG systems"
    ]
  },
  {
    id: 4,
    name: "Chirag Modi",
    title: "Data Scientist at Turing",
    education: "M.Tech Computer Science & Engineering, IIT Gandhinagar (CGPA: 9.12)",
    specializations: ["Data Science", "Machine Learning", "Distributed Systems", "Software Engineering", "Cloud Computing"],
    experience: "4+ years in data science and software engineering with expertise in ML and distributed systems",
    description: "Data Scientist at Turing with M.Tech from IIT Gandhinagar (CGPA: 9.12) and strong software engineering background. Expert in machine learning, distributed systems, and cloud infrastructure. Former Software Engineer at WiseDV India and intern at crime detection AI startup.",
    photo: chiragPhoto,
    courses: ["Data Science", "Machine Learning", "Distributed Systems", "Software Engineering"],
    achievements: [
      "Data Scientist at Turing",
      "M.Tech CSE at IIT Gandhinagar with 9.12 CGPA (2023-2025)",
      "AIR 543 in GATE 2023 among 80,000 candidates",
      "Cleared BARC OCES/DGFS exam and selected for interview",
      "6-star badge in problem-solving on HackerRank",
      "Solved 350+ problems on LeetCode",
      "Former Software Engineer at WiseDV India (2021-2023)",
      "Appointed as 'Sanchar Mitra' by Department of Telecommunication"
    ]
  }
];

function InstructorCard({ instructor }: { instructor: typeof instructors[0] }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 overflow-hidden rounded-full border-4 border-white">
            <img 
              src={instructor.photo} 
              alt={instructor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold">{instructor.name}</h3>
            <p className="text-blue-100 font-medium">{instructor.title}</p>
            <p className="text-blue-200 text-sm">{instructor.education}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-gray-600 text-sm leading-relaxed">
            {instructor.description}
          </p>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Specializations</h4>
            <div className="flex flex-wrap gap-2">
              {instructor.specializations.map((spec, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Courses Teaching</h4>
            <div className="flex flex-wrap gap-2">
              {instructor.courses.map((course, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                  {course}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Key Achievements</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {instructor.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Award className="h-4 w-4 mr-1" />
            <span>{instructor.experience}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Instructors() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Meet Our Expert Instructors
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Learn from industry experts and IIT alumni with extensive experience in AI/ML research and development
            </p>
            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center">
                <GraduationCap className="h-6 w-6 mr-2" />
                <span>IIT Alumni</span>
              </div>
              <div className="flex items-center">
                <Building2 className="h-6 w-6 mr-2" />
                <span>Industry Experts</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 mr-2" />
                <span>Research Leaders</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Faculty
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              World-class instructors with deep expertise in AI/ML, bringing real-world industry experience to your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {instructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Learn From Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Learn From Our Instructors?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our instructors bring a unique combination of academic excellence and industry experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Academic Excellence</h3>
                <p className="text-gray-600 text-sm">All instructors are graduates from prestigious IITs and NITs with advanced degrees</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Building2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Industry Experience</h3>
                <p className="text-gray-600 text-sm">Working professionals at top companies like Microsoft, Reliance Jio, and Tech Mahindra</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Research Expertise</h3>
                <p className="text-gray-600 text-sm">Published researchers with contributions to AI/ML conferences and journals</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Mentorship Focus</h3>
                <p className="text-gray-600 text-sm">Dedicated to student success with personalized guidance and career counseling</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <ExternalLink className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Real-World Projects</h3>
                <p className="text-gray-600 text-sm">Hands-on experience with production systems and industry-standard practices</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Proven Track Record</h3>
                <p className="text-gray-600 text-sm">Successfully mentored 200+ students into top tech companies and research positions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Learn from the Best?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have transformed their careers with guidance from our expert instructors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              Enroll Now
            </Button>
            <Button
              size="lg"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold transition-all duration-200"
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}