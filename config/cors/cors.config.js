/**
 * CORS (Cross-Origin Resource Sharing) is a security feature in web browsers that controls how resources are shared
 * between different origins (domains, protocols, or ports).
 * This configuration helps prevent unwanted or unauthorized access to your resources by restricting which websites
 * can make requests to your server.
 *
 * You can add or remove URLs from the `whitelist` array to specify which domains are allowed to make requests to your server.
 *
 * Example:
 * To allow requests from a new domain like 'http://example.com', simply add it to the whitelist:
 *   const whitelist = ["http://localhost:8000/", "http://127.0.0.1:8000/", "http://example.com"];
 *  List of allowed origins (domains). These are the only domains that can access resources from your server.
 *  In this case, the whitelist includes localhost and 127.0.0.1 for development purposes.
 */

import whitelist from "./whitelist.js";

export const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.some((pattern) => pattern.test(origin)) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
