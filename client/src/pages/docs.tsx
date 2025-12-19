import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Documentation } from "@shared/schema";
import { Search, BookOpen, ExternalLink, Clock, Tag } from "lucide-react";
import { Link } from "wouter";

export default function Docs() {
  const [, params] = useRoute("/docs/:id");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const docId = params?.id;

  const { data: docs, isLoading } = useQuery<Documentation[]>({
    queryKey: ["/api/docs"],
  });

  const { data: selectedDoc } = useQuery<Documentation>({
    queryKey: ["/api/docs", docId],
    enabled: !!docId,
  });

  // Extract unique categories from docs
  const categories = useMemo(() => {
    if (!docs) return [];
    const uniqueCategories = Array.from(new Set(docs.map(doc => doc.category)));
    return ["all", ...uniqueCategories];
  }, [docs]);

  const filteredDocs = useMemo(() => {
    if (!docs) return [];
    
    return docs.filter((doc) => {
      const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
      const matchesSearch = searchQuery === "" || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [docs, selectedCategory, searchQuery]);

  const navigationItems = [
    { id: "getting-started", title: "Getting Started", active: !docId || docId === "getting-started" },
    { id: "pytorch-basics", title: "PyTorch Basics", active: docId === "pytorch-basics" },
    { id: "ml-algorithms", title: "ML Algorithms", active: docId === "ml-algorithms" },
    { id: "deep-learning", title: "Deep Learning", active: docId === "deep-learning" },
    { id: "transformers", title: "Transformers", active: docId === "transformers" },
    { id: "deployment", title: "Deployment", active: docId === "deployment" },
    { id: "quantum-ai", title: "Quantum AI", active: docId === "quantum-ai" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show specific documentation page
  if (docId && selectedDoc) {
    return (
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Documentation Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="font-semibold text-gray-900 dark:text-white">
                    Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {navigationItems.map((item) => (
                      <Link key={item.id} href={item.id === "getting-started" ? "/docs" : `/docs/${item.id}`}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start py-2 px-3 rounded-lg transition-colors ${
                            item.active
                              ? "text-primary font-medium bg-blue-50 dark:bg-blue-900/20"
                              : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          {item.title}
                        </Button>
                      </Link>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Documentation Content */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <Link href="/docs">
                      <Button variant="ghost" className="text-gray-600 dark:text-gray-400">
                        ← Back to Documentation
                      </Button>
                    </Link>
                    <div className="flex items-center space-x-2">
                      {selectedDoc.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      {selectedDoc.title}
                    </h1>
                    
                    <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedDoc.content.split('```').map((section, index) => {
                        if (index % 2 === 1) {
                          // This is a code block
                          const lines = section.split('\n');
                          const language = lines[0] || 'text';
                          const code = lines.slice(1).join('\n');
                          
                          return (
                            <div key={index} className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto">
                              <pre className="text-gray-300 font-mono text-sm">
                                <code>{code}</code>
                              </pre>
                            </div>
                          );
                        } else {
                          // Regular text content
                          return (
                            <div key={index} className="my-4">
                              {section.split('\n').map((line, lineIndex) => {
                                if (line.startsWith('# ')) {
                                  return <h1 key={lineIndex} className="text-3xl font-bold mt-8 mb-4">{line.slice(2)}</h1>;
                                } else if (line.startsWith('## ')) {
                                  return <h2 key={lineIndex} className="text-2xl font-semibold mt-6 mb-3">{line.slice(3)}</h2>;
                                } else if (line.startsWith('- ')) {
                                  return <li key={lineIndex} className="ml-4">{line.slice(2)}</li>;
                                } else if (line.trim() === '') {
                                  return <br key={lineIndex} />;
                                } else {
                                  return <p key={lineIndex} className="mb-4">{line}</p>;
                                }
                              })}
                            </div>
                          );
                        }
                      })}
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 my-8">
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-blue-500 mr-3" />
                        <div>
                          <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                            Quick Tip
                          </h4>
                          <p className="text-blue-800 dark:text-blue-200 mt-1">
                            Start with the Foundation course to build a solid understanding of the tools and concepts before moving to advanced topics.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Next Steps */}
                    <div className="mt-12">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                        Next Steps
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border border-gray-200 dark:border-gray-700">
                          <CardContent className="p-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                              Foundation Course
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                              Master the fundamentals of Python, data handling, and MLOps
                            </p>
                            <Link href="/course/foundation">
                              <Button variant="outline" size="sm">
                                Start Learning →
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                        <Card className="border border-gray-200 dark:border-gray-700">
                          <CardContent className="p-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                              Project Templates
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                              Explore ready-to-use AI project implementations
                            </p>
                            <Link href="/projects">
                              <Button variant="outline" size="sm">
                                Browse Projects →
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Show documentation index page
  return (
    <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 py-16 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Documentation & Guides
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Comprehensive documentation with code examples and implementation guides
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category === "all" ? "All Categories" : category.replace(/-/g, ' ')}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDocs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <BookOpen className="mx-auto h-16 w-16" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No documentation found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or category filter
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredDocs.length} document{filteredDocs.length !== 1 ? 's' : ''}
                  {selectedCategory !== "all" && ` in ${selectedCategory.replace(/-/g, ' ')}`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDocs.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="capitalize">
                          {doc.category.replace(/-/g, ' ')}
                        </Badge>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Updated {doc.lastUpdated ? new Date(doc.lastUpdated).toLocaleDateString() : 'Recently'}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {doc.title}
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                        {doc.content.slice(0, 150)}...
                      </p>
                    </CardHeader>
                    <CardContent>
                      {doc.tags && doc.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {doc.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <Link href={`/docs/${doc.id}`}>
                        <Button className="w-full">
                          Read Documentation
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Start Guides
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Jump right into the most popular topics and get started quickly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {navigationItems.slice(0, 4).map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href={item.id === "getting-started" ? "/docs" : `/docs/${item.id}`}>
                    <Button className="w-full" variant="outline">
                      Read Guide
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
