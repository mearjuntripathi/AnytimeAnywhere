import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Phone } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <div className="flex flex-col gap-2">
          {/* WhatsApp Button */}
          <Button
            onClick={() => window.open('https://wa.me/918839519103?text=Hi! I would like to know more about AAAI coaching programs.', '_blank')}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-subtle hover:scale-110 group relative"
            title="WhatsApp: +91 883 951 9103"
          >
            <MessageCircle className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 animate-pulse">
              New
            </div>
          </Button>

          {/* Live Chat Button */}
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group relative"
          >
            <MessageCircle className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full px-1 animate-pulse">
              Live
            </div>
          </Button>
          
          {/* Call Button */}
          <Button
            onClick={() => window.open('tel:+918839519103')}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group relative"
          >
            <Phone className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full px-1 animate-pulse">
              Call
            </div>
          </Button>
        </div>
      )}

      {isOpen && (
        <Card className="w-80 h-96 shadow-xl">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center animate-gradient-shift">
            <div>
              <h3 className="font-semibold">AAAI Expert Support</h3>
              <p className="text-sm text-blue-100">IIT Faculty Available Now!</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-4 h-64 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-blue-500 animate-fade-in-up">
                <p className="text-sm text-gray-800 font-medium">Welcome to AAAI Coaching! 🎓</p>
                <p className="text-sm text-gray-600 mt-1">Connect with our IIT experts for personalized AI/ML career guidance.</p>
              </div>
              
              <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <p className="text-sm text-gray-800 font-medium">Quick Support Options:</p>
                <div className="mt-2 space-y-1">
                  <button 
                    onClick={() => window.open('https://wa.me/918839519103?text=I want to know about AI/ML course curriculum and pricing.', '_blank')}
                    className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded transition-colors"
                  >
                    📚 Course Information & Pricing
                  </button>
                  <button 
                    onClick={() => window.open('https://wa.me/918839519103?text=I need guidance for IIT admissions and internship opportunities.', '_blank')}
                    className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded transition-colors"
                  >
                    🎯 IIT Admissions & Internships
                  </button>
                  <button 
                    onClick={() => window.open('https://wa.me/918839519103?text=I want to speak with a career counselor about AI/ML opportunities.', '_blank')}
                    className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded transition-colors"
                  >
                    💼 Career Counseling
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg shadow-sm animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <p className="text-sm text-green-800 font-medium">💬 WhatsApp: +91 883 951 9103</p>
                <p className="text-xs text-green-600 mt-1">Available 24/7 for instant responses</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t bg-gray-50">
            <Button 
              onClick={() => window.open('https://wa.me/918839519103?text=Hi! I would like to get more information about AAAI coaching programs.', '_blank')}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 transition-all duration-300 hover:scale-105 animate-pulse"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Continue on WhatsApp
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Get instant responses from our IIT experts
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}