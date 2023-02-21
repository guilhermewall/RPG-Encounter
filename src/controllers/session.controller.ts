import { Request, Response } from "express";
import { ISessionRequest } from "../interfaces/sessions";
import createSessionService from "../services/sessions/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  const sessionData: ISessionRequest = req.body;
  const token = await createSessionService(sessionData);
  return res.json({ token });
};

export { createSessionController };
