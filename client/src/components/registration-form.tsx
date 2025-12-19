import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  BookOpen,
  Calendar,
  CheckCircle,
  Clock
} from "lucide-react";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  course: z.string().min(1, "Please select a course"),
  experience: z.string().min(1, "Please select your experience level"),
  education: z.string().min(1, "Please select your education background"),
  profession: z.string().min(1, "Please enter your profession"),
  city: z.string().min(2, "Please enter your city"),
  goals: z.string().min(10, "Please tell us about your goals (at least 10 characters)"),
  preferredSchedule: z.string().min(1, "Please select your preferred schedule"),
  paymentPlan: z.string().min(1, "Please select a payment plan"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse?: {
    id: string;
    title: string;
    price: number;
  };
}

const courses = [
  { id: "foundation", title: "Foundation Course", price: 25000 },
  { id: "machine-learning", title: "Machine Learning", price: 35000 },
  { id: "deep-learning", title: "Deep Learning", price: 40000 },
  { id: "generative-ai", title: "Generative AI", price: 45000 },
  { id: "llm", title: "Large Language Models", price: 50000 },
  { id: "multimodal-ai", title: "Multimodal AI", price: 48000 },
  { id: "quantum-ai", title: "Quantum AI", price: 55000 },
];

export default function RegistrationForm({ isOpen, onClose, selectedCourse }: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      course: selectedCourse?.id || "",
      experience: "",
      education: "",
      profession: "",
      city: "",
      goals: "",
      preferredSchedule: "",
      paymentPlan: "",
    },
  });

  const selectedCourseData = courses.find(c => c.id === form.watch("course"));

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: data.course,
          email: data.email,
          name: data.fullName,
          phone: data.phone,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create checkout session');
      }

      if (result.url) {
        window.location.href = result.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error: any) {
      toast({
        title: "Payment Setup Failed",
        description: error.message || "Please try again or contact support at +91 883 951 9103",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Start Your AI Journey
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Join thousands of students learning from IIT experts and industry professionals
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 9876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="md:col-span-1">
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Course Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Course Selection
              </h3>
              
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Course</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            <div className="flex items-center justify-between w-full">
                              <span>{course.title}</span>
                              <Badge variant="secondary" className="ml-2">
                                ₹{course.price.toLocaleString('en-IN')}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedCourseData && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-blue-900">{selectedCourseData.title}</h4>
                      <p className="text-sm text-blue-700">8-12 weeks • IIT Expert Instructors</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-900">
                        ₹{selectedCourseData.price.toLocaleString('en-IN')}
                      </div>
                      <p className="text-xs text-blue-600">One-time payment</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Background Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                Background Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education Background</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select education level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="high-school">High School</SelectItem>
                          <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                          <SelectItem value="masters">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AI/Programming Experience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Complete Beginner</SelectItem>
                          <SelectItem value="some-programming">Some Programming</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Current Profession</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Software Engineer, Student, Data Analyst" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Schedule and Payment */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Schedule & Payment
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="preferredSchedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Schedule</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select schedule" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="weekday-morning">Weekday Morning (9 AM - 12 PM)</SelectItem>
                          <SelectItem value="weekday-evening">Weekday Evening (6 PM - 9 PM)</SelectItem>
                          <SelectItem value="weekend">Weekend (10 AM - 4 PM)</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentPlan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Plan</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment plan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full-payment">Full Payment (5% discount)</SelectItem>
                          <SelectItem value="two-installments">2 Installments</SelectItem>
                          <SelectItem value="three-installments">3 Installments</SelectItem>
                          <SelectItem value="monthly">Monthly (EMI Available)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Goals */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Learning Goals & Expectations</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your career goals and what you hope to achieve with this course..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Benefits Highlight */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                What You Get:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Live interactive sessions
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  IIT expert instructors
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Project-based learning
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Industry certification
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isSubmitting}
                data-testid="button-proceed-to-payment"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}