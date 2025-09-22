import { Router } from "express";

const profileRoutes = Router();

profileRoutes.get("/user", async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("No user found");
    }
    res.status(200).send({
      ok: true,
      ...user,
    });
  } catch (err) {
    res.status(420).send({
      ok: false,
    });
  }
});

export default profileRoutes;
