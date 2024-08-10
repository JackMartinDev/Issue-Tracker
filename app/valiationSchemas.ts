import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(255).optional(),
  assignedUserId: z.string().min(1).max(255).optional().nullable(),
});
