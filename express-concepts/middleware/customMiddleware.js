//Creating custom middleware thing

const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const istTime = new Date(timestamp).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata", // IST
      hour12: true, // AM/PM format
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const method = req.method;
    const url = req.url;
    const userAgent = req.get('user-Agent');
    console.log(`[${istTime}] ${method} ${url} - ${userAgent}`);
    next()
}

const addTimeStamp = (req, res, next) => {
    req.timestamp = new Date().toISOString()
    next()
}

export {requestLogger, addTimeStamp}