import Promise from "bluebird";
import gm from "gm";
import path from 'path';
Promise.promisifyAll(gm.prototype);

module.exports = {

  dominantColor: async({ src }) => {
    try {
      let buffer = await gm(src).resize(250, 250).colors(1).toBufferAsync('RGB');
      return buffer.slice(0, 3).toString('hex');
    } catch (e) {
      throw e;
    }
  },

  imageInfo: async({ src }) => {
    try {
      return await gm(src).identifyAsync();
    } catch (e) {
      throw e;
    }
  },

  watermark: async({ src, dst, x, y, width, height, watermarkSrc }) => {
    try {
      await gm(src).draw([`image over ${x},${y} ${width || 0},${height || 0} '${watermarkSrc}'`]).writeAsync(dst);
    } catch (e) {
      throw e;
    }
  },

  resize: async ({ src, dst, width, height, option, quality }) => {
    try {
      sails.log.info({src, dst, width, height, option, quality});
      await gm(src).resize(width, height, option).strip().quality(quality).writeAsync(dst);
    } catch (e) {
      throw e;
    }
  },

  resizeAndWatermark: async({imgSrc, dst, size, quality, watermarkImgSrc, watermarkPostion }) => {
    try {
      const imgInfo = await ImageService.imageInfo({src: imgSrc});
      if (watermarkImgSrc) {
        const watermarkImgInfo = await ImageService.imageInfo({src: watermarkImgSrc});
        let watermarkConfig = {
          src: imgSrc,
          dst,
          watermarkSrc: watermarkImgSrc,
        };

        switch (watermarkPostion) {
          case 'center':
          watermarkConfig.x = imgInfo.size.width / 2 - watermarkImgInfo.size.width / 2;
          watermarkConfig.y = imgInfo.size.height / 2 - watermarkImgInfo.size.height / 2;
          break;
          case 'left-top':
          watermarkConfig.x = 5;
          watermarkConfig.y = 5;
          break;
          case 'center-top':
          watermarkConfig.x = imgInfo.size.width / 2 - watermarkImgInfo.size.width / 2;
          watermarkConfig.y = 5;
          break;
          case 'right-top':
          watermarkConfig.x = imgInfo.size.width - watermarkImgInfo.size.width - 5;
          watermarkConfig.y = 5;
          break;
          case 'left-center':
          watermarkConfig.x = 5;
          watermarkConfig.y = imgInfo.size.height / 2 - watermarkImgInfo.size.height / 2;
          break;
          case 'right-center':
          watermarkConfig.x = imgInfo.size.width - watermarkImgInfo.size.width - 5;
          watermarkConfig.y = imgInfo.size.height / 2 - watermarkImgInfo.size.height / 2;
          break;
          case 'bottom-left':
          watermarkConfig.x = 5
          watermarkConfig.y = imgInfo.size.height - watermarkImgInfo.size.height - 5;
          break;
          case 'bottom-center':
          watermarkConfig.x = imgInfo.size.width / 2 - watermarkImgInfo.size.width / 2;
          watermarkConfig.y = imgInfo.size.height - watermarkImgInfo.size.height - 5;
          break;
          case 'bottom-right':
          watermarkConfig.x = imgInfo.size.width - watermarkImgInfo.size.width - 5;
          watermarkConfig.y = imgInfo.size.height - watermarkImgInfo.size.height - 5;
          break;
          case 'full':
          let bufferImgSrc = path.join(process.cwd(), './.tmp/newWatermark.png');
          await ImageService.resize({
            src: watermarkImgSrc,
            dst: bufferImgSrc,
            width: imgInfo.size.width,
            height: imgInfo.size.height,
            option: '<',
          });
          watermarkConfig.watermarkSrc = bufferImgSrc;
          const newWatermarkImgInfo = await ImageService.imageInfo({src: bufferImgSrc});
          watermarkConfig.x = imgInfo.size.width / 2 - newWatermarkImgInfo.size.width / 2;
          watermarkConfig.y = imgInfo.size.height / 2 - newWatermarkImgInfo.size.height / 2;
          break;
          default:
          watermarkConfig.x = 0
          watermarkConfig.y = 0
        }
        await ImageService.watermark(watermarkConfig);
      }
      let outputSize = {};
      switch (size) {
        case 'xl':
          outputSize.width = 1920;
          outputSize.height = 1080;
          break;
        case 'l':
          outputSize.width = 1280;
          outputSize.height = 720;
          break;
        case 'm':
          outputSize.width = 854;
          outputSize.height = 480;
          break;
        case 'x':
          outputSize.width = 480;
          outputSize.height = 360;
          break;
        case 'xs':
          outputSize.width = 352;
          outputSize.height = 240;
          break;
        case 'tiny':
          outputSize.width = 3;
          outputSize.height = 3;
          break;
        default:
          outputSize.width = 1920;
          outputSize.height = 1080;
      }
      await ImageService.resize({
        src: watermarkImgSrc ? dst : imgSrc,
        dst: dst,
        ...outputSize,
        option: '>',
        quality,
      });
    } catch (e) {
      throw e;
    }
  },

}
