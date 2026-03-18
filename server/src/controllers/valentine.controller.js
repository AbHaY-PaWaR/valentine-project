
import { randomBytes } from "crypto";
import Valentine from "../models/Valentine.js";

const generateSlug = () => randomBytes(6).toString("hex");

export const createValentine = async (req, res) => {
  try {
    const { day, senderName, receiverName, message, gender } = req.body;

    let slug = generateSlug();
    let doc;
    try {
      doc = await Valentine.create({
        day,
        senderName,
        receiverName,
        message,
        gender,
        slug,
      });
    } catch (err) {
      if (err.code !== 11000) throw err;
      // Extremely rare slug collision — retry once with a fresh slug.
      // A second consecutive collision (with 48-bit entropy slugs) is
      // treated as a server error and the outer catch returns 500.
      slug = generateSlug();
      doc = await Valentine.create({
        day,
        senderName,
        receiverName,
        message,
        gender,
        slug,
      });
    }

    res.status(201).json({
      link: `/v/${doc.day}/${doc.slug}`,
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

