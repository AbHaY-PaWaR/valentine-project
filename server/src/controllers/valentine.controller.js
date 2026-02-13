
import Valentine from "../models/Valentine.js";

const createUniqueSlug = async () => {
  for (let i = 0; i < 5; i += 1) {
    const slug = Math.random().toString(36).substring(2, 9);
    const exists = await Valentine.exists({ slug });
    if (!exists) return slug;
  }
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
};

export const createValentine = async (req, res) => {
  try {
    const { day, senderName, receiverName, message, gender } = req.body;
    const slug = await createUniqueSlug();

    await Valentine.create({
      day,
      senderName,
      receiverName,
      message,
      gender,
      slug,
    });

    res.status(201).json({
      link: `/v/${day}/${slug}`,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create Valentine" });
  }
};

export const getValentine = async (req, res) => {
  try {
    const valentine = await Valentine.findOne({ slug: req.params.slug });
    if (!valentine) return res.status(404).json({ error: "Not found" });

    return res.json(valentine);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch Valentine" });
  }
};

