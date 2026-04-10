const express = require("express");
const {
  getUsers,
  getRoles,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const authenticated = require("../middleware/authenticated");
const hasRole = require("../middleware/hasRole");
const mapUser = require("../helpers/mapUser");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });

router.use(authenticated);

router.get("/", hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();

  res.send({ data: users.map(mapUser) });
});

router.get("/roles", hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = await getRoles();

  res.send({ data: roles });
});

router.patch("/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newuser = await updateUser(req.params.id, {
    role: req.body.roleId,
  });

  res.send({ data: mapUser(newuser) });
});

router.delete("/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id);

  res.send({ error: null });
});

module.exports = router;
