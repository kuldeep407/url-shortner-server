import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";

export const parseDeviceInfo = (req) => {
  const parser = new UAParser(req.headers["user-agent"]);
  const ua = parser.getResult();

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    req.ip;

  const geo = geoip.lookup(ip);

  return {
    device: ua.device.type || "desktop",
    browser: ua.browser.name,
    ip,
    location: geo
      ? `${geo.city || "Unknown"}, ${geo.country || "Unknown"}`
      : "Unknown",
  };
};
