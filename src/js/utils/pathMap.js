'use strict';

module.exports = {
    build: {
        html: './build/',
        js: './build/js/',
        style: './build/css/',
        img: './build/img/'
    },
    src: {
        html: './src/*.html',
        js: './src/js/*.js',
        style: './src/scss/*.scss',
        img: './src/img/*'
    },
    watch: {
        html: './src/**/*.html',
        js: './src/js/**/*.js',
        style: './src/scss/**/*.scss',
        img: './src/img/*'
    },
    clean: {
        html: './build/*.html',
        style: './build/css/',
        js: './build/js/'
    }
};