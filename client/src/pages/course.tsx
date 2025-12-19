import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Clock, Users, BookOpen } from "lucide-react";
import { Course } from "@shared/schema";
import { DIFFICULTY_COLORS } from "@/lib/constants";
import { Link } from "wouter";

export default function CoursePage() {
  const [, params] = useRoute("/course/:id");
  const courseId = params?.id;

  const { data: course, isLoading } = useQuery<Course>({
    queryKey: ["/api/courses", courseId],
    enabled: !!courseId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Not Found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const completedModules = course.modules?.filter((m: any) => m.completed)?.length || 0;
  const totalModules = course.modules?.length || 0;
  const progressPercentage = Math.round((completedModules / totalModules) * 100);

  return (
    <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Course Header */}
      <section className={`bg-gradient-to-r ${course.color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                ← Back to Curriculum
              </Button>
            </Link>
            <Badge className="bg-white/20 text-white">
              {course.category}
            </Badge>
          </div>
          
          <div className="flex items-start space-x-6">
            <i className={`${course.icon} text-4xl mb-4`}></i>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-white/90 mb-6 max-w-3xl">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{course.estimatedHours} hours</span>
                </div>
                <Badge className={`${DIFFICULTY_COLORS[course.difficulty as keyof typeof DIFFICULTY_COLORS]} bg-white/20`}>
                  {course.difficulty}
                </Badge>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span>{totalModules} modules</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-white/20 rounded-full p-1 max-w-md">
                <div className="flex justify-between text-sm mb-1">
                  <span>Course Progress</span>
                  <span>{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3 bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Course Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  This comprehensive course covers all essential aspects of {course.title.toLowerCase()}, 
                  designed to take you from beginner to advanced level with hands-on projects and real-world applications.
                </p>
                
                <h3 className="font-semibold mb-4">What you'll learn:</h3>
                <ul className="space-y-2">
                  {course.modules?.map((module: any, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">{module.title}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Course Modules */}
            <Card>
              <CardHeader>
                <CardTitle>Course Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.modules?.map((module: any, index) => (
                    <div 
                      key={index} 
                      className={`p-4 border rounded-lg ${
                        module.completed 
                          ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                          : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {module.completed ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            <Circle className="h-6 w-6 text-gray-400" />
                          )}
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              Module {index + 1}: {module.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {module.completed ? 'Completed' : 'Not started'}
                            </p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant={module.completed ? "outline" : "default"}
                          disabled={!module.completed && index > 0 && !course.modules[index - 1].completed}
                        >
                          {module.completed ? 'Review' : 'Start'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Prerequisites</h4>
                  {course.prerequisites && course.prerequisites.length > 0 ? (
                    <ul className="space-y-1">
                      {course.prerequisites.map((prereq) => (
                        <li key={prereq} className="text-sm text-gray-600 dark:text-gray-400">
                          • {prereq}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">No prerequisites required</p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Technologies Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.technologies?.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Course Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                      <span>{course.estimatedHours} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Modules:</span>
                      <span>{totalModules}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Completed:</span>
                      <span>{completedModules}/{totalModules}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/projects">
                  <Button className="w-full" variant="outline">
                    <i className="fas fa-code mr-2"></i>
                    Browse Projects
                  </Button>
                </Link>
                <Link href="/labs">
                  <Button className="w-full" variant="outline">
                    <i className="fas fa-flask mr-2"></i>
                    Practice Labs
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button className="w-full" variant="outline">
                    <i className="fas fa-book mr-2"></i>
                    Read Documentation
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
