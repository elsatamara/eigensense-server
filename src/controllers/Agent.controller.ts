import BaseController from "./Base.controller";
import e, { Request, Response, NextFunction } from "express";
import AgentModel from "../models/Agent.model";

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
}

export default new Agent();
