import express from 'express';
import fs from 'fs';
import { resize } from '../utilities/img';
import path from 'path';

const routes = express.Router();

routes.get('/', async (req: express.Request, res: express.Response) => {
    const fn = req.query.fileName;
    if (fn) {
        if (fs.existsSync(`res/${fn}.jpg`)) {
            let w = req.query.width;
            let h = req.query.height;
            if (
                typeof fn == 'string' &&
                (typeof w == 'string' || typeof w == 'undefined') &&
                (typeof h == 'string' || typeof h == 'undefined')
            ) {
                if (!w) w = '200';
                if (!h) h = '200';
                const w1 = parseInt(w.toString());
                const h1 = parseInt(h.toString());
                if (!w1 || !h1)
                    res.send(
                        'Height and width keys in the URL query must either be numeric or undefined'
                    );
                else {
                    const fileName = `res/${fn}${w}x${h}.jpg`;
                    if (!fs.existsSync(fileName))
                        await resize(fn.toString(), w1, h1).catch((err) => {
                            res.send(err);
                        });
                    res.sendFile(fileName, {
                        root: path.join(__dirname, '../../'),
                    });
                    console.log(`Image displayed: ${fn}${h}x${w}`);
                    console.log();
                }
            } else
                res.send(
                    "Don't define any key two or more times in the URL query"
                );
        } else
            res.send(
                'No file by this name. .jpg extension is automatically added, no need to add it to the fileName.'
            );
    } else
        res.send(
            'Please enter the name of the image file to resize using fileName key in the URL query'
        );
});

export default routes;
