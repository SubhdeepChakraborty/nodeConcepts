import e from "express"
import {client} from "./client.js"
import axios from "axios"
import cors from "cors"

const Port = 3000

const app = e()
app.use(e.json())
app.use(cors())

app.get("/photos", async (req, res, next) => {
  const albumId = req.query.albumId;
  let cacheKey
  if(albumId) cacheKey = `photos:${albumId}`;

  try {
    client.get(cacheKey, async (error, photos) => {
      if (error) {
        console.error("Redis Error:", error);
        return res.status(500).json({ status: false, message: "Redis error" });
      }

      if (photos) {
        console.log("📦 Served from cache");
        return res.json(JSON.parse(photos));
      }

      // If not cached, fetch from API
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/photos",
        { params: { albumId } }
      );

      // Store in Redis for 10 minutes (600 seconds)
      client.setex(cacheKey, 600, JSON.stringify(data));
      console.log("🌐 Fetched from API and cached");

      return res.json(data);
    });
  } catch (err) {
    console.error("Error fetching photos:", err);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
});

app.get('/photos/:id', async(req, res) => {
    const {data} = await axios.get(`https://jsonplaceholder.typicode.com/photos/${req.params.id}`);
    res.send(data)
})

app.listen(Port, (req, res) => {
    console.log(`Server is listening on ${Port}`)
})