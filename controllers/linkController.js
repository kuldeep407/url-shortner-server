import Link from "../models/linkModel.js";
import { generateShortId } from "../utils/shortIdUtil.js";

export const createShortLink = async (req, res) => {
  try {
    const { originalUrl, customAlias, expiration } = req.body;
    const shortId = customAlias || generateShortId();

    const newLink = new Link({
      userId: req.user._id,
      originalUrl,
      shortId,
      customAlias,
      expiration,
      shortUrl: `https://kc.com/${shortId}`,
    });

    await newLink.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Short url created !",
        newLink
      });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error !",
    });
  }
};

export const getShortLinks = async (req, res) => {
  try {
    const user = req.user;
    const links = await Link.find({ userId: user._id });

    if (!links || links.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No link found !",
      });
    }

    res.status(200).json({ success: true, message: "Links fetched !", links });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error !",
    });
  }
};
