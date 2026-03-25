import express from "express"

import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { singleUpload } from "../middleware/multer.js"
import {createBlog, deleteBlog, dislikeBlog, getAllBlogs, getMyTotalBlogLikes, getOwnBlogs, getPublishedBlog, likeBlog, togglePublishBlog, updateBlog } from "../controllers/blog.controller.js"

const router = express.Router()

// IMPORTANT: Specific routes MUST come before parameterized routes
router.route("/").post(isAuthenticated, createBlog)
router.route("/get-all-blogs").get(getAllBlogs)
router.route("/get-published-blogs").get(getPublishedBlog)
router.route("/get-own-blogs").get(isAuthenticated, getOwnBlogs)
router.get('/my-blogs/likes', isAuthenticated, getMyTotalBlogLikes)
router.route("/delete/:id").delete(isAuthenticated, deleteBlog);
router.get("/:id/like", isAuthenticated, likeBlog);
router.get("/:id/dislike", isAuthenticated, dislikeBlog);

// Parameterized routes MUST come last
router.route("/:blogId").put(isAuthenticated, singleUpload, updateBlog)
router.route("/:blogId").patch(isAuthenticated, togglePublishBlog);

export default router;