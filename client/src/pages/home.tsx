import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/hero-section";
import CourseCard from "@/components/course-card";
import ProgressDashboard from "@/components/progress-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Course } from "@shared/schema";
import { TECH_STACK_CATEGORIES } from "@/lib/constants";
import { Link } from "wouter";

export default function Home() {
  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  // Fallback stats data
  const statsData = stats || {
    courses: 7,
    projects: 150,
    labs: 300,
    technologies: 50
  };

  if (coursesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Overview */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{statsData.courses}</div>
              <div className="text-gray-600 dark:text-gray-400">Core Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">{statsData.projects}+</div>
              <div className="text-gray-600 dark:text-gray-400">Project Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">{statsData.labs}+</div>
              <div className="text-gray-600 dark:text-gray-400">Code Labs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">{statsData.technologies}+</div>
              <div className="text-gray-600 dark:text-gray-400">Technologies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Browser */}
      <section id="curriculum" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete AI Curriculum
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From foundations to quantum AI, master every aspect of artificial intelligence with our comprehensive 7-course roadmap
            </p>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses?.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course}
                progress={course.id === 'foundation' ? 75 : course.id === 'machine-learning' ? 45 : 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Overview */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Technology Stack
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Learn with industry-standard tools and frameworks used by top AI companies worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(TECH_STACK_CATEGORIES).map(([category, info]) => (
              <Card key={category} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center mb-4`}>
                    <i className={`${info.icon} text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {info.technologies.map((tech) => (
                      <div key={tech} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {tech}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links to Other Sections */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore More
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Dive deeper into hands-on projects, interactive labs, and comprehensive documentation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <i className="fas fa-code mr-3 text-primary"></i>
                  Project Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Production-ready project implementations covering fraud detection, image generation, and more.
                </p>
                <Link href="/projects">
                  <Button className="w-full">Browse Projects</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <i className="fas fa-flask mr-3 text-secondary"></i>
                  Interactive Labs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Hands-on coding exercises with real-time feedback and guided learning experiences.
                </p>
                <Link href="/labs">
                  <Button className="w-full">Start Coding</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <i className="fas fa-book mr-3 text-accent"></i>
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Comprehensive guides, API references, and implementation tutorials for every topic.
                </p>
                <Link href="/docs">
                  <Button className="w-full">Read Docs</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Progress Dashboard */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your Learning Progress
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Track your progress across all courses and celebrate your achievements
            </p>
          </div>
          <ProgressDashboard />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <i className="fas fa-brain text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Anytime Anywhere AI</h3>
                  <p className="text-gray-400">Master AI from Classical to Quantum</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Building the next generation of AI engineers with comprehensive, hands-on curriculum covering everything from foundations to quantum AI.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-youtube text-xl"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Curriculum</h4>
              <ul className="space-y-2 text-gray-400">
                {courses?.map((course) => (
                  <li key={course.id}>
                    <Link href={`/course/${course.id}`}>
                      <a className="hover:text-white transition-colors">{course.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/projects"><a className="hover:text-white transition-colors">Project Templates</a></Link></li>
                <li><Link href="/labs"><a className="hover:text-white transition-colors">Code Labs</a></Link></li>
                <li><Link href="/docs"><a className="hover:text-white transition-colors">Documentation</a></Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Anytime Anywhere AI (AAAI). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
