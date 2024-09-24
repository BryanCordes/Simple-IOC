import fs from 'fs';
import path from 'path';
import url from 'url';
import {rollup} from 'rollup';

async function build() {
    cleanDist();

    const inputOptions = {
        input: './src/ioc.js'
    };

    const outputOptions = {
        file: './dist/simple-ioc.js',
        format: 'es',
        sourcemap: true
    };

    const bundle = await rollup( inputOptions );

    await bundle.write( outputOptions );

    await bundle.close();
}

function cleanDist() {
    const baseDir = path.dirname( url.fileURLToPath( import.meta.url ) );

    const dist = path.resolve( baseDir, '../dist' );

    deleteFolderRecursive( dist );
}

function deleteFolderRecursive(dir) {
    if ( fs.existsSync( dir ) && fs.lstatSync( dir ).isDirectory() ) {
        fs.readdirSync( dir ).forEach( ( file, index ) => {
            let currPath = path.join( dir, file );

            if ( fs.lstatSync( currPath ).isDirectory() ) {
                deleteFolderRecursive( dir );
            } else {
                fs.unlinkSync( currPath );
            }
        } );

        fs.rmdirSync( dir );
    }
}

build();