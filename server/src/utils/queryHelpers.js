export const findOrCreate = async (model, queryObj, newObj) => {
  return (
    (await model.query().findOne(queryObj)) ||
    (await model
      .query()
      .insert(newObj || queryObj)
      .returning("*"))
  );
};
