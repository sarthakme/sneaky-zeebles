import sharp from 'sharp';
import { resize } from './utilities/img';

sharp('res/fjord.jpg')
    .resize(300, 300)
    .toFile('res/fjord300x300.jpg')
    .then((val) => {
        console.log(val);
    });
resize('fjord', 400, 400).then((val) => {
    console.log(val);
});
