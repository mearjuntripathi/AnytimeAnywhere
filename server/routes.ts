import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCourseSchema,
  insertProjectSchema,
  insertCodeLabSchema,
  insertDocumentationSchema,
  insertUserProgressSchema
} from "@shared/schema";
import { stripeService } from "./stripeService";
import { getStripePublishableKey } from "./stripeClient";

export async function registerRoutes(app: Express): Promise<Server> {
  // Courses API
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const validatedData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(validatedData);
      res.status(201).json(course);
    } catch (error) {
      res.status(400).json({ message: "Invalid course data" });
    }
  });

  // Projects API
  app.get("/api/projects", async (req, res) => {
    try {
      const { category } = req.query;
      let projects;
      
      if (category && typeof category === 'string') {
        projects = await storage.getProjectsByCategory(category);
      } else {
        projects = await storage.getAllProjects();
      }
      
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  // Code Labs API
  app.get("/api/labs", async (req, res) => {
    try {
      const { difficulty } = req.query;
      let labs;
      
      if (difficulty && typeof difficulty === 'string') {
        labs = await storage.getCodeLabsByDifficulty(difficulty);
      } else {
        labs = await storage.getAllCodeLabs();
      }
      
      res.json(labs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch code labs" });
    }
  });

  app.get("/api/labs/:id", async (req, res) => {
    try {
      const lab = await storage.getCodeLab(req.params.id);
      if (!lab) {
        return res.status(404).json({ message: "Code lab not found" });
      }
      res.json(lab);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch code lab" });
    }
  });

  app.post("/api/labs", async (req, res) => {
    try {
      const validatedData = insertCodeLabSchema.parse(req.body);
      const lab = await storage.createCodeLab(validatedData);
      res.status(201).json(lab);
    } catch (error) {
      res.status(400).json({ message: "Invalid code lab data" });
    }
  });

  // Documentation API
  app.get("/api/docs", async (req, res) => {
    try {
      const { category, search } = req.query;
      let docs;
      
      if (search && typeof search === 'string') {
        docs = await storage.searchDocumentation(search);
      } else if (category && typeof category === 'string') {
        docs = await storage.getDocumentationByCategory(category);
      } else {
        docs = await storage.getAllDocumentation();
      }
      
      res.json(docs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documentation" });
    }
  });

  app.get("/api/docs/:id", async (req, res) => {
    try {
      const doc = await storage.getDocumentation(req.params.id);
      if (!doc) {
        return res.status(404).json({ message: "Documentation not found" });
      }
      res.json(doc);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documentation" });
    }
  });

  app.post("/api/docs", async (req, res) => {
    try {
      const validatedData = insertDocumentationSchema.parse(req.body);
      const doc = await storage.createDocumentation(validatedData);
      res.status(201).json(doc);
    } catch (error) {
      res.status(400).json({ message: "Invalid documentation data" });
    }
  });

  // User Progress API
  app.get("/api/users/:userId/progress", async (req, res) => {
    try {
      const { courseId } = req.query;
      let progress;
      
      if (courseId && typeof courseId === 'string') {
        progress = await storage.getUserCourseProgress(req.params.userId, courseId);
      } else {
        progress = await storage.getUserProgress(req.params.userId);
      }
      
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  app.post("/api/users/:userId/progress", async (req, res) => {
    try {
      const validatedData = insertUserProgressSchema.parse({
        ...req.body,
        userId: req.params.userId
      });
      const progress = await storage.updateUserProgress(validatedData);
      res.status(201).json(progress);
    } catch (error) {
      res.status(400).json({ message: "Invalid progress data" });
    }
  });

  // Stats API
  app.get("/api/stats", async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      const projects = await storage.getAllProjects();
      const labs = await storage.getAllCodeLabs();
      const docs = await storage.getAllDocumentation();

      const stats = {
        courses: courses.length,
        projects: projects.length,
        labs: labs.length,
        technologies: Array.from(new Set([
          ...courses.flatMap(c => c.technologies || []),
          ...projects.flatMap(p => p.technologies || [])
        ])).length
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Stripe Payment API
  app.get("/api/stripe/publishable-key", async (req, res) => {
    try {
      const publishableKey = await getStripePublishableKey();
      res.json({ publishableKey });
    } catch (error) {
      console.error("Error getting publishable key:", error);
      res.status(500).json({ message: "Failed to get Stripe configuration" });
    }
  });

  app.get("/api/stripe/products", async (req, res) => {
    try {
      const products = await stripeService.listProducts();
      const prices = await stripeService.listPrices();
      
      const productsWithPrices = products.data.map(product => {
        const productPrices = prices.data.filter(price => price.product === product.id);
        return {
          ...product,
          prices: productPrices
        };
      });
      
      res.json({ products: productsWithPrices });
    } catch (error) {
      console.error("Error listing products:", error);
      res.status(500).json({ message: "Failed to list products" });
    }
  });

  app.post("/api/checkout", async (req, res) => {
    try {
      const { courseId, email, name, phone } = req.body;
      
      if (!courseId) {
        return res.status(400).json({ message: "Course ID is required" });
      }

      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const baseUrl = `${req.protocol}://${req.get('host')}`;
      
      const products = await stripeService.listProducts();
      let stripeProduct = products.data.find(
        p => p.metadata?.courseId === courseId
      );

      if (!stripeProduct) {
        stripeProduct = await stripeService.createProduct(
          course.title,
          course.description,
          { courseId: course.id }
        );
        
        await stripeService.createPrice(
          stripeProduct.id,
          (course.price || 25000) * 100,
          'inr'
        );
      }

      const prices = await stripeService.listPrices(stripeProduct.id);
      const priceId = prices.data[0]?.id;

      if (!priceId) {
        return res.status(500).json({ message: "No price found for this course" });
      }

      const session = await stripeService.createCheckoutSession(
        priceId,
        `${baseUrl}/payment/success?courseId=${courseId}`,
        `${baseUrl}/payment/cancel?courseId=${courseId}`,
        email,
        {
          courseId,
          courseName: course.title,
          customerName: name || '',
          customerPhone: phone || ''
        }
      );

      res.json({ url: session.url, sessionId: session.id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ message: "Failed to create checkout session" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
