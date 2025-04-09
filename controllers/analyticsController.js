import Link from "../models/linkModel.js";
import { parseDeviceInfo } from "../utils/deviceUtil.js";

export const redirectAndLog = async (req, res) => {
  try {
    const { shortId } = req.params;
    const link = await Link.findOne({ shortId });

    if (!link) return res.status(404).json({ message: "Link not found!" });

    if (link.expiration && new Date(link.expiration) < Date.now()) {
      return res.status(410).json({ message: "Link expired!" });
    }

    (async () => {
      const analyticsData = parseDeviceInfo(req);
      link.analytics.push({ timestamp: new Date(), ...analyticsData });
      link.clicks += 1;
      await link.save();
    })();

    return res.status(200).json({ originalUrl: link.originalUrl });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error!",
    });
  }
};

export async function searchLink(req, res) {
  try {
    const { query } = req.query;
    const user = req.user;

    const link = await Link.find({
      userId: user._id,
      originalUrl: { $regex: query, $options: "i" },
    });

    return res.status(200).json({
      success: true,
      message: "Link retrieved successfully!",
      link,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error!",
    });
  }
}
