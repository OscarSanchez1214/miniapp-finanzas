export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { payload } = req.body;
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  } else {
    res.status(405).end();
  }
}