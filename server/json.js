/**
 * Created by sergeyzubov on 24/09/2016.
 */
import fs from 'fs';

const readJSON = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, res) => {
            if (err) {
                reject(err);
            }
            try {
                res = JSON.parse(res);
                resolve(res);
            } catch (e) {
                reject(e);
            }
        });
    });
};

const writeJSON = (filename, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

export {
    readJSON,
    writeJSON,
};
