module.exports = {
  upload: async(req, res) => {
    try {
      sails.log.info(req.body);
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
    const upload = await Image.create({ filePath: fd, size, type, UserId });

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
    sails.log.info('Not implemented');
    res.ok({
      message: 'Delete Success',
      data: true,
    });
  }
}
