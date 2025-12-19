import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  progress: jsonb("progress").default({}),
  achievements: text("achievements").array().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  modules: jsonb("modules").notNull(),
  prerequisites: text("prerequisites").array().default([]),
  technologies: text("technologies").array().default([]),
  estimatedHours: integer("estimated_hours").default(0),
  price: integer("price"),
  weeks: text("weeks"),
  color: text("color").notNull(),
  icon: text("icon").notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  technologies: text("technologies").array().default([]),
  features: text("features").array().default([]),
  downloadUrl: text("download_url"),
  imageUrl: text("image_url"),
  githubUrl: text("github_url"),
});

export const codeLabs = pgTable("code_labs", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(),
  category: text("category").notNull(),
  instructions: text("instructions").notNull(),
  starterCode: text("starter_code").notNull(),
  solution: text("solution").notNull(),
  hints: text("hints").array().default([]),
  estimatedTime: integer("estimated_time").default(0),
});

export const documentation = pgTable("documentation", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array().default([]),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  courseId: varchar("course_id").references(() => courses.id),
  moduleId: text("module_id"),
  completed: boolean("completed").default(false),
  progress: integer("progress").default(0),
  lastAccessed: timestamp("last_accessed").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCourseSchema = createInsertSchema(courses);

export const insertProjectSchema = createInsertSchema(projects);

export const insertCodeLabSchema = createInsertSchema(codeLabs);

export const insertDocumentationSchema = createInsertSchema(documentation).omit({
  lastUpdated: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastAccessed: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type CodeLab = typeof codeLabs.$inferSelect;
export type InsertCodeLab = z.infer<typeof insertCodeLabSchema>;

export type Documentation = typeof documentation.$inferSelect;
export type InsertDocumentation = z.infer<typeof insertDocumentationSchema>;

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
