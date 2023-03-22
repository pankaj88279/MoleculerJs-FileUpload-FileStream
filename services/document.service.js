
const multer = require("multer");

const upload = require("../storage/st");
const path = require("path");


module.exports = {
	name: "document",


	settings: {

	},
	dependencies: [],

	
		actions: {
			

			add: {
				rest: {
					method: "POST",
					path: "/"
				},
				async handler({params}) {
					return this.add(params)
				},
			},
		},
	methods: {
		async add(req, res) {
				//return "pankaj rathore"
			
				//return "pankaj"
					upload.single('file')(req, res, function (err) {
						if (err) {
							
							// A Multer error occurred when uploading.
							res.json({msg: err.message})
						} else {
							// Everything went fine.
							// req.file
							// {
							//   fieldname: 'filename_here',
							//   originalname: 'nhancv_dep_trai.png',
							//   encoding: '7bit',
							//   mimetype: 'image/png',
							//   destination: '/tmp/',
							//   filename: 'filename_here-1607694392023-220481630',
							//   path: '/tmp/filename_here-1607694392023-220481630',
							//   size: 5907
							// }
							const file = req.file;
							console.log("file--->",file);
				
							// Delete tmp
							try {
								// fs.unlinkSync(file.path);
							} catch (e) {
								
								// Ignore
								console.error(e);
							}
							res.json({msg: 'ok'});
						}
					});
				}
		}	
    
}