import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, BookOpen, ChevronDown } from "lucide-react";
import { Course } from "@shared/schema";
import { useState } from "react";

interface CoachingCourseCardProps {
  course: Course;
}

export default function CoachingCourseCard({ course }: CoachingCourseCardProps) {
  const [showModules, setShowModules] = useState(false);
  const modules = course.modules || [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getBadgeColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner level':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate level':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced level':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="relative overflow-hidden border-2 border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-xl">
      {/* Header with gradient background */}
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
        {/* Course Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{modules.length} Modules</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{course.weeks}</span>
            </div>
          </div>
          <Badge className={getBadgeColor(course.difficulty)}>
            {course.difficulty}
          </Badge>
        </div>

        {/* Modules Dropdown */}
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

        {/* Price */}
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-gray-900">
            {course.price ? formatPrice(course.price) : 'Contact Us'}
          </div>
        </div>

        {/* CTA Button */}
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}