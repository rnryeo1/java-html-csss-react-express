const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
});

router.post("/", validateToken, async (req, res) => {
  // validateToken에서 검증되어 -> req.body,req.user.username에 값이 들어잇어 create된다고 설명하는듯
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id; //jwt token 떄문에 접근가능 인증돼면.
  await Posts.create(post);
  res.json(post);
});

router.put("/title", validateToken, async (req, res) => {
  // validateToken에서 검증되어 -> req.body,req.user.username에 값이 들어잇어 create된다고 설명하는듯
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id: id } });
  res.json(newTitle);
});

router.put("/postText", validateToken, async (req, res) => {
  // validateToken에서 검증되어 -> req.body,req.user.username에 값이 들어잇어 create된다고 설명하는듯
  const { newText, id } = req.body;
  await Posts.update({ postText: newText }, { where: { id: id } });
  res.json(newText);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("delete successfully");
});

module.exports = router;
