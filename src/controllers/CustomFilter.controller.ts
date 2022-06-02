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
    await CustomFilterModel.deleteOne(
      { customFilterId: req.params.filterid },
      function (err) {
        if (err) throw Error("Unable to delete filter");
      }
    ).clone();
  };

  public postNewFilter = async (req: Request) => {
    let decodedParams = new URLSearchParams(req.params.urlquery);
    let name = decodedParams.get("name");
    let agent = decodedParams.get("agent")?.split(",");
    let location = decodedParams.get("location")?.split(",");
    let queue = decodedParams.get("queue")?.split(",");
    let status = decodedParams.get("status")?.split(",");
    let type = decodedParams.get("type")?.split(",");
    let from = decodedParams.get("from");
    let to = decodedParams.get("to");

    if (from == "null") {
      from = null;
    }
    if (to == "null") {
      to = null;
    }

    const newFilter = new CustomFilterModel({
      customFilterId: Date.now().toString(),
      name: name,
      location: location,
      agent: agent,
      queue: queue,
      status: status,
      type: type,
      from: from,
      to: to,
    });

    console.log("printing new filter", newFilter);

    await newFilter.save(function (err) {
      if (err) throw Error("Unable to create new entry");
    });
  };

  public editFilter = async (req: Request) => {
    let decodedParams = new URLSearchParams(req.params.urlquery);
    let name = decodedParams.get("name")!;
    let agent = decodedParams.get("agent")?.split(",")!;
    let location = decodedParams.get("location")?.split(",")!;
    let queue = decodedParams.get("queue")?.split(",")!;
    let status = decodedParams.get("status")?.split(",")!;
    let type = decodedParams.get("type")?.split(",")!;
    let from = parseInt(decodedParams.get("from")!, 10);
    let to = parseInt(decodedParams.get("to")!, 10);
    let filterId = decodedParams.get("customFilterId")!;

    console.log("from", new Date(from));
    console.log("to", new Date(to));
    console.log(to);

    const filterToEdit = await CustomFilterModel.findOne({
      customFilterId: filterId,
    });

    if (filterToEdit) {
      filterToEdit.name = name;
      filterToEdit.agent = agent;
      filterToEdit.location = location;
      filterToEdit.queue = queue;
      filterToEdit.status = status;
      filterToEdit.type = type;
      filterToEdit.from = new Date(from);
      filterToEdit.to = new Date(to);
      filterToEdit.save();
    }
  };
}

export default new CustomFilter();
