module.exports.init = async () => {
  try {
    const {environment} = sails.config;

    const ModuleRecord = await Module.create({
      name: "New Module",
      width: 640,
      height: 480,
      status: true,
      settings: "none to setting",
    });

    const LayoutModuleRecord = await LayoutModule.create({
      sort_order: 3
    });

    const ModuleTypeRecord = await ModuleType.create({
      name: "SOME TYPE"
    });

    const PositionRecord = await Position.create({
      name: "TOP"
    });

    LayoutModuleRecord.setPosition(PositionRecord);
    LayoutModuleRecord.setModule(ModuleRecord);
    ModuleRecord.setModuleType(ModuleTypeRecord);


  } catch (e) {
    console.error(e);
  }
};
