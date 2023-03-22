const path = require("path");
fs = require('fs');
const { createWriteStream } = require("fs");

module.exports = {
    name: "file",
    actions: {
      save: {
        handler(ctx) {
          console.log("ctx.params", ctx.params);
          //this.singleUpload(ctx.params);
          this.storeFS(ctx.params,`anil${Math.floor(Math.random() * 1000000) + 1}.png`);
          console.log("ctx.meta.$params", ctx.meta.$params);
          console.log("ctx.meta.$multipart", ctx.meta.$multipart);
          return 'save';
        }
      }
    },
    methods:{
        storeFS: (stream, filename) => {
            const uploadDir = './uploads';
            const path = `${uploadDir}/${filename}`;
            return new Promise((resolve, reject) =>
              stream
                .on('error', error => {
                  if (stream.truncated)
                    // delete the truncated file
                    fs.unlinkSync(path);
                  reject(error);
                })
                .pipe(fs.createWriteStream(path))
                .on('error', error => reject(error))
                .on('finish', () => resolve({ path }))
            );
        }
    }
  };
  