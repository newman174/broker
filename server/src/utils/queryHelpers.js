export const findOrCreate = async (model, queryObj, newObj) => {
  return (
    (await model.query().findOne(queryObj)) ||
    (await model
      .query()
      .insert(newObj || queryObj)
      .returning("*"))
  );
};

export const findAndUpdateOrCreate = async (model, queryObj, newObj) => {
  return (
    (await model
      .query()
      .findOne(queryObj)
      .patch(newObj || queryObj)
      .returning("*")) ||
    (await model
      .query()
      .insert(newObj || queryObj)
      .returning("*"))
  );
}

export const fmtJG = (jg) => `[${jg.join(", ")}]`;

export const newGraphMiddleware = (model, allowedGraph) => {
  return (req, res, next) => {
    const { joinGraph: rawJoinGraph } = req.body;

    let query = model.query();

    if (allowedGraph) {
      query = query.allowGraph(`[${allowedGraph.join(", ")}]`);
    }

    if (rawJoinGraph) {
      const joinGraph = `[${rawJoinGraph.join(", ")}]`;
      query = query.withGraphJoined(joinGraph);
    }

    res.locals.query = query;
    next();
  };
};
