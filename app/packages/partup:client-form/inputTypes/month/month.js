AutoForm.addInputType("month", {
  template: "PartupFormAfInputMonth",
  valueConverters: {
    "stringArray": function (val) {
      if (typeof val === "string" && val.length > 0) {
        return [val];
      }
      return val;
    }
  }
});