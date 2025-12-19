import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import CodeLabComponent from "@/components/code-lab";
import { CodeLab } from "@shared/schema";
import { LAB_DIFFICULTIES, DIFFICULTY_COLORS } from "@/lib/constants";
import { Search, Clock, Code, Zap } from "lucide-react";

export default function Labs() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("Beginner");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLab, setSelectedLab] = useState<CodeLab | null>(null);

  const { data: labs, isLoading } = useQuery<CodeLab[]>({
    queryKey: ["/api/labs"],
  });

  const filteredLabs = labs?.filter((lab) => {
    const matchesDifficulty = lab.difficulty === selectedDifficulty;
    const matchesSearch = lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lab.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (selectedLab) {
    return (
      <main className="pt-16 min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              className="text-white hover:text-gray-300"
              onClick={() => setSelectedLab(null)}
            >
              ← Back to Labs
            </Button>
          </div>
          <CodeLabComponent lab={selectedLab} />
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 py-16 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Interactive Code Labs
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Hands-on coding exercises with real-time feedback and guided learning
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search labs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          {/* Difficulty Tabs */}
          <div className="flex flex-wrap justify-center mb-8 space-x-4">
            {LAB_DIFFICULTIES.map((difficulty) => (
              <Button
                key={difficulty}
                className={`px-6 py-2 rounded-lg font-medium mb-2 transition-colors ${
                  selectedDifficulty === difficulty
                    ? "bg-primary text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lab Example */}
      {selectedDifficulty === "Beginner" && filteredLabs.length > 0 && (
        <section className="py-8 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Lab Preview
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Get a taste of our interactive learning environment
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <CodeLabComponent lab={filteredLabs[0]} />
            </div>
          </div>
        </section>
      )}

      {/* Labs Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredLabs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <Code className="mx-auto h-16 w-16" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No labs found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or difficulty filter
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredLabs.length} lab{filteredLabs.length !== 1 ? 's' : ''} 
                  {` for ${selectedDifficulty} level`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredLabs.map((lab) => (
                  <Card key={lab.id} className="hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        onClick={() => setSelectedLab(lab)}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Badge className={DIFFICULTY_COLORS[lab.difficulty as keyof typeof DIFFICULTY_COLORS]}>
                          {lab.difficulty}
                        </Badge>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">{lab.estimatedTime}min</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {lab.title}
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-400">
                        {lab.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Code className="h-4 w-4 mr-2 text-primary" />
                          <span>Category: {lab.category}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                          <span>{lab.hints?.length || 0} hints available</span>
                        </div>
                      </div>
                      <Button className="w-full">
                        Start Lab
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More Button */}
              {filteredLabs.length >= 6 && (
                <div className="text-center mt-12">
                  <Button size="lg" className="px-8 py-3">
                    Load More Labs
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lab Features */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Code Labs?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Experience hands-on learning with our advanced interactive coding environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Real-time Execution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Run your code instantly and see results in real-time with our integrated Python environment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Smart Hints</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Get contextual hints and guidance when you're stuck, helping you learn without frustration.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Track your progress through each lab and build up your coding skills systematically.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
