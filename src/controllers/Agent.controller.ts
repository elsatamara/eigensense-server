import BaseController from "./Base.controller";
import e, { Request, Response, NextFunction } from "express";
import AgentModel from "../models/Agent.model";
import { AgentInterface } from "../interfaces/Agent.interface";

class Agent extends BaseController {
  public storeRecentlyViewedData = async (req: Request) => {
    const patternId = req.params.patternId;
    const agentId = req.params.agentId;
    const agent = await AgentModel.findOne(
      { agentId: agentId },
      function (error: Error) {
        if (error) throw new Error("Can't find agent id");
      }
    )
      .clone()
      .catch(function (err) {
        console.log(err);
      });
    if (agent) {
      agent.recentlyViewedAlert.push(patternId);
      agent.save(function (error) {
        if (error) throw new Error("Unable to save recently viewed alert");
      });
    }
  };

  public getAgentList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return this.makeRequest(
      async () => {
        const agentList: AgentInterface[] = await AgentModel.find();
        return {
          data: agentList,
        };
      },
      res,
      next
    );
  };
}

export default new Agent();
