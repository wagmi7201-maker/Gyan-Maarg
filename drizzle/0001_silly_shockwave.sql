CREATE TABLE `career_paths` (
	`id` int AUTO_INCREMENT NOT NULL,
	`student_id` int NOT NULL,
	`target_role` varchar(255) NOT NULL,
	`current_level` varchar(100),
	`target_level` varchar(100),
	`skill_gaps` json,
	`recommended_courses` json,
	`recommended_projects` json,
	`estimated_time_months` int,
	`generated_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `career_paths_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cohort_analytics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cohort_name` varchar(255) NOT NULL,
	`institution_id` int,
	`total_students` int,
	`average_gpa` decimal(3,2),
	`placement_rate` decimal(5,2),
	`average_salary` varchar(100),
	`top_skills` json,
	`skill_gap_summary` json,
	`industry_trends` json,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cohort_analytics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `job_market_data` (
	`id` int AUTO_INCREMENT NOT NULL,
	`job_title` varchar(255) NOT NULL,
	`required_skills` json NOT NULL,
	`preferred_skills` json,
	`experience` varchar(100),
	`salary` varchar(100),
	`industry` varchar(100),
	`company` varchar(255),
	`location` varchar(255),
	`job_count` int DEFAULT 0,
	`demand_trend` enum('increasing','stable','decreasing'),
	`source` varchar(100),
	`last_updated` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `job_market_data_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `learning_resources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`resource_name` varchar(255) NOT NULL,
	`resource_type` enum('course','project','certification','article','video') NOT NULL,
	`skills` json,
	`platform` varchar(100),
	`duration` varchar(100),
	`difficulty` enum('beginner','intermediate','advanced'),
	`link` varchar(500),
	`rating` decimal(2,1),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `learning_resources_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `skill_gap_analysis` (
	`id` int AUTO_INCREMENT NOT NULL,
	`student_id` int NOT NULL,
	`target_job_id` int,
	`skill_name` varchar(100) NOT NULL,
	`student_level` varchar(50),
	`required_level` varchar(50),
	`gap_severity` enum('critical','high','medium','low'),
	`priority` int,
	`recommended_action` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `skill_gap_analysis_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`institution_name` varchar(255),
	`degree` varchar(100),
	`major` varchar(100),
	`graduation_year` int,
	`gpa` decimal(3,2),
	`career_interests` json,
	`bio` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `student_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`student_id` int NOT NULL,
	`career_path_id` int,
	`skill_id` int,
	`progress_percentage` decimal(5,2),
	`status` enum('not_started','in_progress','completed','paused'),
	`completed_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `student_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student_projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`student_id` int NOT NULL,
	`project_name` varchar(255) NOT NULL,
	`description` text,
	`technologies` json,
	`duration` varchar(100),
	`link` varchar(500),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `student_projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student_skills` (
	`id` int AUTO_INCREMENT NOT NULL,
	`student_id` int NOT NULL,
	`skill_name` varchar(100) NOT NULL,
	`proficiency_level` enum('beginner','intermediate','advanced','expert') NOT NULL,
	`years_of_experience` decimal(3,1),
	`source` enum('academic','project','internship','self_taught','certification') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `student_skills_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','placement_cell') NOT NULL DEFAULT 'user';--> statement-breakpoint
CREATE INDEX `idx_student_id` ON `career_paths` (`student_id`);--> statement-breakpoint
CREATE INDEX `idx_job_title` ON `job_market_data` (`job_title`);--> statement-breakpoint
CREATE INDEX `idx_resource_type` ON `learning_resources` (`resource_type`);--> statement-breakpoint
CREATE INDEX `idx_student_id` ON `skill_gap_analysis` (`student_id`);--> statement-breakpoint
CREATE INDEX `idx_user_id` ON `student_profiles` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_student_id` ON `student_progress` (`student_id`);--> statement-breakpoint
CREATE INDEX `idx_student_id` ON `student_projects` (`student_id`);--> statement-breakpoint
CREATE INDEX `idx_student_id` ON `student_skills` (`student_id`);