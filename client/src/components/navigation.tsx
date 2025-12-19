import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { AAI_Logo } from "./aaai-logo";

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/#curriculum", label: "Courses", active: location === "/" },
    { href: "/instructors", label: "Instructors", active: location === "/instructors" },
    { href: "/projects", label: "Projects", active: location === "/projects" },
    { href: "/docs", label: "Documentation", active: location.startsWith("/docs") },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 fixed w-full top-0 z-50 animate-nav-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <div className="cursor-pointer hover-lift group">
                <AAI_Logo size={45} showText={true} className="group-hover:scale-105 transition-all duration-300" />
              </div>
            </Link>
            <div className="hidden md:flex space-x-6">
              {navItems.map((item, index) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all duration-300 font-medium hover:scale-110 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 ${
                      item.active ? "text-primary dark:text-primary bg-blue-50 scale-105" : ""
                    }`}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden md:block group">
              <Input
                type="text"
                placeholder="Search curriculum..."
                className="w-64 pl-10 pr-4 hover:shadow-lg focus:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-200 hover:border-blue-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors animate-bounce-subtle" size={16} />
            </div>
            


            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary ${
                      item.active ? "text-primary dark:text-primary" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
            {/* Mobile Search */}
            <div className="mt-4">
              <Input
                type="text"
                placeholder="Search curriculum..."
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
