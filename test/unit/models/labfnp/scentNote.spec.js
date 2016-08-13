describe('test ScentNote.spec model operation', function() {

  let createdScentNote, createdScents, createdFeelings;
  it('create ScentNote Scent Feeling should be success.', async (done) => {
    try {
      let newScentNote = {
          color: "#FFA500",
          title: "Cirtus 柑橘色"
      }
      createdScentNote = await ScentNote.create(newScentNote);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('create Scent should be success.', async (done) => {
    try {
      let newScents = [
        {name: "T12"},
        {name: "M6"},
        {name: "TA53"}
      ]

      let promises = newScents.map((newScent) => {
        return Scent.create(newScent);
      })
      createdScents = await Promise.all(promises);

      done();
    } catch (e) {
      done(e);
    }
  });


  it('findAll Scent and format for APP be success.', async (done) => {
    try {
      let result = await Scent.findAllWithRelationFormatForApp();


      console.log("findScents: ", JSON.stringify(result, null, 2));

      done();
    } catch (e) {
      done(e);
    }
  });



});
