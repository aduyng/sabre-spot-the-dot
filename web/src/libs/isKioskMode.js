let kioskMode;

export default function isKioskMode() {
  if (kioskMode !== undefined) {
    return kioskMode;
  }

  if (process.env.REACT_APP_MODE === "kiosk") {
    kioskMode = true;
    return kioskMode;
  }

  if (window.location.pathname.includes("event-check-in-kiosk")) {
    kioskMode = true;
    return kioskMode;
  }
  kioskMode = false;
  return kioskMode;
}
