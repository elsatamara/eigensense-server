import e, { Request, Response, NextFunction } from "express";
import CustomFilterModel from "../models/CustomFilter.model";
import BaseController from "./Base.controller";

class CustomFilter extends BaseController {
  public getCustomFilterList = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return this.makeRequest(
      async () => {
        const customFilterList = await CustomFilterModel.find();
        return {
          data: customFilterList,
        };
      },
      res,
      next
    );
  };

  public deleteFilter = async (req: Request) => {
    console.log("hereee");
    await CustomFilterModel.deleteOne({ name: req.params.name });
  };

  public postNewFilter = async (req: Request) => {
    const newFilter = new CustomFilterModel({
      name: req.params.name,
      location: req.params.location,
      agent: req.params.agent,
      queue: req.params.queue,
      status: req.params.status,
      type: req.params.type,
      from: req.params.from,
      to: req.params.to,
    });

    newFilter.save(function (err) {
      if (err) throw Error("Unable to create new entry");
    });
  };
}

export default new CustomFilter();
