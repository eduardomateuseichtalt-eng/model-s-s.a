import { Router, Request, Response } from "express";
import redis from "../redis";

const router = Router();

router.post("/cache-image", async (req: Request, res: Response) => {
  try {
    const { id, url } = req.body;

    if (!id || !url) {
      return res.status(400).json({ error: "Id e URL sao obrigatorios" });
    }

    await redis.set(`image:${id}`, url);
    return res.json({ status: "ok", id });
  } catch (error) {
    return res.status(500).json({
      error:
        error instanceof Error ? error.message : "Erro ao salvar no cache",
    });
  }
});

router.get("/get-image/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const url = await redis.get(`image:${id}`);

    if (!url) {
      return res.status(404).json({ error: "Imagem nao encontrada" });
    }

    return res.json({ id, url });
  } catch (error) {
    return res.status(500).json({
      error:
        error instanceof Error ? error.message : "Erro ao buscar no cache",
    });
  }
});

export default router;
