import e, { Request, Response, NextFunction } from "express";
import AgentModel from "../models/Agent.model";
import BaseController from "./Base.controller";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class Auth extends BaseController {
  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const agent = await AgentModel.findOne({ email: email });

    if (agent && (await bcrypt.compare(password, agent.password))) {
      const token = jwt.sign({ user_id: agent.agentId, email }, "TOKENTBDYO", {
        expiresIn: "2h",
      });
      agent.token = token;
      agent.save();
    }
  };

  public verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, "TOKENTOKEN");
      //   req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };
}

export default new Auth();
