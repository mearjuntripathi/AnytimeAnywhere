import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, Circle } from "lucide-react";
import { Course } from "@shared/schema";
import { DIFFICULTY_COLORS } from "@/lib/constants";
import { Link } from "wouter";

interface CourseCardProps {
  course: Course;
  progress?: number;
}

export default function CourseCard({ course, progress = 0 }: CourseCardProps) {
  const modules = course.modules || [];
  const completedModules = modules.filter((m) => m.completed).length;
  const totalModules = modules.length;
  const isStarted = progress > 0;
  const isCompleted = progress >= 100;

  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      <CardHeader className={`bg-gradient-to-r ${course.color} p-6 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <i className={`${course.icon} text-2xl`}></i>
          <Badge className="bg-white/20 text-white hover:bg-white/30">
            Course {course.id === 'foundation' ? '1' : course.id === 'machine-learning' ? '2' : course.id === 'deep-learning' ? '3' : course.id === 'generative-ai' ? '4' : course.id === 'llm' ? '5' : course.id === 'multimodal-ai' ? '6' : '7'}
          </Badge>
        </div>
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-white/90">{course.description}</p>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-3 mb-6">
          {modules.slice(0, 4).map((module, index) => (
            <div key={module.id || index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              {module.completed ? (
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              ) : (
                <Circle className="h-4 w-4 text-gray-300 mr-2" />
              )}
              <span>{module.title}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round((completedModules / totalModules) * 100)}%</span>
          </div>
          <Progress value={(completedModules / totalModules) * 100} className="h-2" />
        </div>

        {/* Course Info */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.estimatedHours}h</span>
          </div>
          <Badge className={DIFFICULTY_COLORS[course.difficulty as keyof typeof DIFFICULTY_COLORS]}>
            {course.difficulty}
          </Badge>
        </div>

        <Link href={`/course/${course.id}`}>
          <Button 
            className="w-full"
            variant={isCompleted ? "outline" : "default"}
          >
            {isCompleted ? "Review Course" : isStarted ? "Continue Learning" : "Start Course"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
