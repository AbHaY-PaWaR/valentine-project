import SpecialPassword from "../models/SpecialPassword.js";

export const storeSpecialPassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || !password.trim()) {
      return res.status(400).json({ error: "Password is required." });
    }

    const saved = await SpecialPassword.create({
      password: password.trim(),
    });

    return res.status(201).json({ id: saved._id });
  } catch (err) {
    return res.status(500).json({ error: "Failed to store password." });
  }
};
