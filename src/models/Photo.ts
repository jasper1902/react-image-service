import { z } from "zod";

export const ImagesFeedSchema = z
  .object({
    photo: z.array(
      z.object({
        id: z.string(),
        filename: z.string(),
        url: z.string(),
        width: z.number(),
        height: z.number(),
        alt: z.string().optional(),
        createdAt: z.string(),
        updatedAt: z.string(),
        uploader: z.string(),
        tagList: z.array(z.string()).optional(),
      })
    ),
    totalPages: z.number(),
    totalPhotos: z.number(),
    currentPage: z.number(),
    nextPage: z.union([z.number(), z.null()]),
    prevPage: z.union([z.number(), z.null()]),
  })
  .optional();

export type ImagesFeed = z.infer<typeof ImagesFeedSchema>;
