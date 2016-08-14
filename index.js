import fs from 'fs';
import handleBars from 'handlebars';
import fse from 'fs-extra';
import {
    exec
} from 'child_process';
import chalk from 'chalk';
import watch from 'watch';
import g from 'glob';

export function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, txt) => {
            if (err) {
                reject(err);
            } else {
                resolve(txt);
            }
        });
    });
}


export async function templateAsync(filePath, args) {
    const template = await readFileAsync(filePath);
    return handleBars.compile(template)(args);
}

export function copyDirAsync(src, dest, clobber = false) {
    return new Promise((resolve, reject) => {
        fse.copy(src, dest, {
            clobber: clobber
        }, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

export function writeFileAsync(filePath, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

export function unlinkAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

export function execAsync(command) {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            resolve({
                stdout: stdout,
                stderr: stderr,
                err: err
            });
        });
    });
}

export function* watchItr(src, options) {
    let resolver = {};
    watch.watchTree(src, options, (f, curr, prev) => {
        resolver.resolve(f);
    });
    while (true) {
        const p = new Promise((resolve, reject) => {
            resolver.resolve = resolve;
        });
        yield p;
    }
}

export function emptyDir(src) {
    return new Promise((resolve, reject) => {
        fse.emptyDir(src, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

export function glob(globRegex) {
    return new Promise((resolve, reject) => {
        g(globRegex, (err, files) => {
            if (err) reject(err);
            resolve(files);
        });
    });
}