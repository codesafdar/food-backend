// import {diskStorage} from 'multer'
// import { extname } from 'path';

// // multer storage configuration
// export const multerOptions = {
//   fileFilter: (req: any, file: any, cb: any) => {
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//       return cb(new Error('Only image files are allowed'));
//     }
//     cb(null, true);
//   },
//   storage: diskStorage({
//     destination: './uploads',
//     filename: (req:any,res:any,file:any,cb:any) => {
//       const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
//       return cb(null, `${randomName}${extname(file.originalname)}`);

//     }
//   })
// }