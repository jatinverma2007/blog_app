import express from "express"

import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { createComment, deleteComment, editComment, getAllCommentsOnMyBlogs, getCommentsOfPost, likeComment } from "../controllers/comment.controller.js";

const router = express.Router()

// IMPORTANT: Specific routes MUST come before parameterized routes
router.get('/my-blogs/comments', isAuthenticated, getAllCommentsOnMyBlogs)

// Parameterized routes come after
router.post('/:id/create', isAuthenticated, createComment);
router.delete("/:id/delete", isAuthenticated, deleteComment);
router.put("/:id/edit", isAuthenticated, editComment);
router.route("/:id/comment/all").get(getCommentsOfPost);
router.get('/:id/like', isAuthenticated, likeComment);


export default router;