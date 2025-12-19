import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import ProjectCard from "@/components/project-card";
import { Project } from "@shared/schema";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { Search } from "lucide-react";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const filteredProjects = projects?.filter((project) => {
    const matchesCategory = selectedCategory === "All Projects" || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 py-16 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Project Template Gallery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Production-ready project templates with complete implementation examples
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200 dark:border-gray-700">
            {PROJECT_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                  selectedCategory === category
                    ? "text-primary border-primary"
                    : "text-gray-600 dark:text-gray-400 border-transparent hover:text-primary dark:hover:text-primary"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <i className="fas fa-search text-4xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or category filter
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} 
                  {selectedCategory !== "All Projects" && ` in ${selectedCategory}`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {/* Load More Button */}
              {filteredProjects.length >= 6 && (
                <div className="text-center mt-12">
                  <Button size="lg" className="px-8 py-3">
                    Load More Projects
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Build Your Own?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Start with our interactive code labs and work your way up to building production-ready AI applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3">
              Start Coding Labs
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3">
              Browse Curriculum
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
