import path from 'path';
describe('about ImageService.', function() {
  let home = process.cwd();
  it('testing resize', async (done) => {
    try {
      await ImageService.resize({
        src: path.join(home, './test/assets/1080p.jpg'),
        dst: path.join(home, './test/assets/480p.jpg'),
        width: 480,
        height: null,
        option: '>',
        quality: 92,
      });
      done();
    } catch (e) {
      done(e)
    }
  });

  it('testing get dominantColor', async (done) => {
    try {
      let result = await ImageService.dominantColor({
        src: path.join(home, './test/assets/1080p.jpg'),
      });
      sails.log.info(result);
      done();
    } catch (e) {
      done(e)
    }
  });

  it('testing imageInfo', async (done) => {
    try {
      let result = await ImageService.imageInfo({
        src: path.join(home, './test/assets/480p.jpg'),
      });
      sails.log.info(result);
      done();
    } catch (e) {
      done(e)
    }
  });

  it('testing watermark', async (done) => {
    try {
      await ImageService.watermark({
        src: path.join(home, './test/assets/1080p.jpg'),
        dst: path.join(home, './test/assets/watermark.jpg'),
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        watermarkSrc: path.join(home, './test/assets/watermark.png'),
      });
      done();
    } catch (e) {
      done(e)
    }
  });

  it('testing resizeAndWatermark center', async (done) => {
    try {
      await ImageService.resizeAndWatermark({
        imgSrc: path.join(home, './test/assets/1080p.jpg'),
        watermarkImgSrc: path.join(home, './test/assets/watermark.png'),
        watermarkPostion: 'center',
        dst: path.join(home, './test/assets/center.jpg'),
        size: 'm',
        quality: 92,
      });
      done();
    } catch (e) {
      done(e)
    }
  });

  it('testing resizeAndWatermark left-top', async (done) => {
    try {
      await ImageService.resizeAndWatermark({
        imgSrc: path.join(home, './test/assets/1080p.jpg'),
        watermarkImgSrc: path.join(home, './test/assets/watermark.png'),
        watermarkPostion: 'left-top',
        dst: path.join(home, './test/assets/left-top.jpg'),
        size: 'm',
        quality: 92,
      });
      done();
    } catch (e) {
      done(e)
    }
  });

  it('testing resizeAndWatermark center-top', async (done) => {
    try {
      await ImageService.resizeAndWatermark({
        imgSrc: path.join(home, './test/assets/1080p.jpg'),
        watermarkImgSrc: path.join(home, './test/assets/watermark.png'),
        watermarkPostion: 'center-top',
        dst: path.join(home, './test/assets/center-top.jpg'),
        size: 'm',
        quality: 92,
      });
      done();
    } catch (e) {
      done(e)
    }
  });

  it('testing resizeAndWatermark right-top', async (done) => {
    try {
      await ImageService.resizeAndWatermark({
        imgSrc: path.join(home, './test/assets/1080p.jpg'),
        watermarkImgSrc: path.join(home, './test/assets/watermark.png'),
        watermarkPostion: 'right-top',
        dst: path.join(home, './test/assets/right-top.jpg'),
        size: 'm',
        quality: 92,
      });
      done();
    } catch (e) {
      done(e)
    }
  });

  it('testing resizeAndWatermark left-center', async (done) => {
    try {
      await ImageService.resizeAndWatermark({
        imgSrc: path.join(home, './test/assets/1080p.jpg'),
        watermarkImgSrc: path.join(home, './test/assets/watermark.png'),
        watermarkPostion: 'left-center',
        dst: path.join(home, './test/assets/left-center.jpg'),
        size: 'm',
        quality: 92,
      });
      done();
    } catch (e) {
      done(e)
    }
  });

  it('testing resizeAndWatermark right-center', async (done) => {
    try {
      await ImageService.resizeAndWatermark({
        imgSrc: path.join(home, './test/assets/1080p.jpg'),
        watermarkImgSrc: path.join(home, './test/assets/watermark.png'),
        watermarkPostion: 'right-center',
        dst: path.join(home, './test/assets/right-center.jpg'),
        size: 'm',
        quality: 92,
      });
      done();
    } catch (e) {
      done(e)
    }
  });

  it('testing resizeAndWatermark bottom-left', async (done) => {
    try {
      await ImageService.resizeAndWatermark({
        imgSrc: path.join(home, './test/assets/1080p.jpg'),
        watermarkImgSrc: path.join(home, './test/assets/watermark.png'),
        watermarkPostion: 'bottom-left',
        dst: path.join(home, './test/assets/bottom-left.jpg'),
        size: 'm',
        quality: 92,
      });
      done();
    } catch (e) {
      done(e)
    }
  });

  it('testing resizeAndWatermark bottom-center', async (done) => {
    try {
      await ImageService.resizeAndWatermark({
        imgSrc: path.join(home, './test/assets/1080p.jpg'),
        watermarkImgSrc: path.join(home, './test/assets/watermark.png'),
        watermarkPostion: 'bottom-center',
        dst: path.join(home, './test/assets/bottom-center.jpg'),
        size: 'm',
        quality: 92,
      });
      done();
    } catch (e) {
      done(e)
    }
  });

  it('testing resizeAndWatermark bottom-right', async (done) => {
    try {
      await ImageService.resizeAndWatermark({
        imgSrc: path.join(home, './test/assets/1080p.jpg'),
        watermarkImgSrc: path.join(home, './test/assets/watermark.png'),
        watermarkPostion: 'bottom-right',
        dst: path.join(home, './test/assets/bottom-right.jpg'),
        size: 'm',
        quality: 92,
      });
      done();
    } catch (e) {
      done(e)
    }
  });

  it('testing resizeAndWatermark full', async (done) => {
    try {
      await ImageService.resizeAndWatermark({
        imgSrc: path.join(home, './test/assets/1080p.jpg'),
        watermarkImgSrc: path.join(home, './test/assets/watermark.png'),
        watermarkPostion: 'full',
        dst: path.join(home, './test/assets/full.jpg'),
        size: 'm',
        quality: 92,
      });
      done();
    } catch (e) {
      done(e)
    }
  });

  it('testing resizeAndWatermark tiny', async (done) => {
    try {
      await ImageService.resizeAndWatermark({
        imgSrc: path.join(home, './test/assets/1080p.jpg'),
        dst: path.join(home, './test/assets/tiny.jpg'),
        size: 'tiny',
        quality: 92,
      });
      done();
    } catch (e) {
      done(e)
    }
  });

});
