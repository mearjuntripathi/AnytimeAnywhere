import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink, Github, Eye } from "lucide-react";
import { Project } from "@shared/schema";
import { DIFFICULTY_COLORS } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      {project.imageUrl && (
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge className={DIFFICULTY_COLORS[project.difficulty as keyof typeof DIFFICULTY_COLORS]}>
            {project.category}
          </Badge>
          <div className="flex items-center space-x-2">
            {project.technologies?.slice(0, 2).map((tech) => (
              <div key={tech} className="w-6 h-6 flex items-center justify-center">
                <i className={`fab fa-${tech.toLowerCase()} text-lg`} title={tech}></i>
              </div>
            ))}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <div className="space-y-2 mb-6">
          {project.features?.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex space-x-3">
          <Button 
            className="flex-1"
            onClick={() => {
              if (project.downloadUrl) {
                window.open(project.downloadUrl, '_blank');
              }
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              if (project.githubUrl) {
                window.open(project.githubUrl, '_blank');
              }
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
