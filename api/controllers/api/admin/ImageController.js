module.exports = {
  upload: async(req, res) => {
    try {
      sails.log.info(req.body);
      sails.log.info(req.query);
      const dirname = '../../.tmp/public/uploads/';
      let promise = new Promise((resolve, reject) => {
      req.file('uploadPic').upload({ dirname }, async(err, files) => {
        resolve(files);
      });
    });
    let files = await promise.then();

    const { size, type, fd } = files[0];
    const user = AuthService.getSessionUser(req);
    const UserId = user ? user.id : null;
    let upload;
    if (req.query.type === 'image') {
      upload = await Image.create({ filePath: fd, size, type, UserId });
    } else {
      upload = await File.create({ filePath: fd, size, type, UserId, note: req.body.qqfilename});
    }

    res.ok({
      message: 'Upload Success',
      data: upload,
    });
    } catch (e) {
      res.serverError({
        // error 是 FineUploader 的格式
        error: e.message,
        message: e.message,
        data: {}
      });
    }
  },
  destroy: async (req, res) => {
    try {
      sails.log.info('Not implemented', req.body, req.params.id);
      res.ok({
        message: 'Delete Success',
        data: true,
      });
    } catch (e) {
      res.serverError(e);
    }
  }
}
