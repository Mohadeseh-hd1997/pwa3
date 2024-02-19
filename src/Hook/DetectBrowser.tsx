import React, { useState, useEffect } from "react";
import platform from "platform";

export const CheckPermission = () => {
  const [permit, setPermit] = useState<{}>();

  useEffect(() => {
    switch (platform.name) {
      case "Chrome":
      case "Edge":
        setPermit({
          ImageCapture: true,
        });
        break;

      case "Firefox":
      case "Opera":
      case "Safari":
      case "Chrome Android":
      case "Firefox for Android":
      case "Opera Android":
      case "Safari on iOS":
      case "Samsung Internet":
      case "WebView Android":
        setPermit({
          ImageCapture: false,
        });
        break;

      default:
        setPermit({
          ImageCapture: false,
        });
        break;
    }
  }, []);

  return permit;
};
