import { nanoid } from "nanoid";
import UrlSchema from "../models/Url.js";
import { isValidUrl } from "../utils/validUrl.js";

export const createUrl = async (req, res) => {
  const userId = req.user.id;

  const { originalUrl, customUrl } = req.body;

  if (!originalUrl || !isValidUrl(originalUrl)) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing URL",
    });
  }

  if (customUrl && !/^[a-zA-Z0-9_-]{3,30}$/.test(customUrl)) {
  return res.status(400).json({
    success: false,
    message: "Custom URL must be 3-30 chars, only letters, numbers, '-', '_'",
  });
}

  const shortId = customUrl || nanoid(5);

  const existing = await UrlSchema.findOne({ short_url: shortId });
  if (existing) {
    return res
      .status(400)
      .json({ success: false, message: "Custom name already exist" });
  }

  const newUrl = new UrlSchema({
    full_url: originalUrl,
    short_url: shortId,
    user:userId
  });

  await newUrl.save();
  res.status(201).json({ success: true, message: "Url Created", shortId:shortId });
};

export const fetchUrl = async (req, res) => {
  const { id } = req.params;
  const exist = await UrlSchema.findOneAndUpdate(
    { short_url: id },
    { $inc: { clicks: 1 } }
  );

  if (exist) {
    return res.redirect(exist.full_url);
  } else {
    return res
      .status(404)
      .json({ success: false, message: "ShortUrl not find" });
  }
};

export const getTopUrls = async (req, res) => {
  const userId = req.user.id;

  const urls = await UrlSchema.find({user:userId}).sort({ clicks: -1 });

  res.json({
    success: true,
    data: urls,
  });
};
