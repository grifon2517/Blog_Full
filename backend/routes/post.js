const express = require("express");
const {
  getPosts,
  getPost,
  addPost,
  editPost,
  deletePost,
} = require("../controllers/post");
const { addComment, deleteComment } = require("../controllers/comments");
const authenticated = require("../middleware/authenticated");
const hasRole = require("../middleware/hasRole");
const mapPost = require("../helpers/mapPost");
const mapComments = require("../helpers/mapComments");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { posts, lastPage } = await getPosts(
    req.query.search,
    req.query.limit,
    req.query.page,
  );

  res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

router.get("/:id", async (req, res) => {
  const post = await getPost(req.params.id);

  res.send({ data: mapPost(post) });
});

router.use(authenticated);

router.post("/:id/comments", async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });

  res.send({ data: mapComments(newComment) });
});

router.delete(
  "/:postId/comments/:commentId",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);

    res.send({ error: null });
  },
);

router.post("/", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newPost = await addPost({
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
  });

  res.send({ data: mapPost(newPost) });
});

router.patch("/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const updatePost = await editPost(req.params.id, {
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
  });

  res.send({ data: mapPost(updatePost) });
});

router.delete("/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deletePost(req.params.id);

  res.send({ error: null });
});

module.exports = router;
