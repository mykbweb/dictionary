var gulp         = require('gulp'),
	less         = require('gulp-less'),
	concat       = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	csso         = require('gulp-csso'),
	gcmq         = require('gulp-group-css-media-queries'),
	browserSync  = require('browser-sync'),
	smartgrid = require('smart-grid'),
	imagemin = require('gulp-imagemin'),
	uncss = require('gulp-uncss'),
	clean = require('gulp-clean'),
	uglify = require('gulp-uglify');

gulp.task('compileLESS', function() {
	gulp.src(['app/less/style.less','app/less/**/*.less'])
	.pipe(less())
	.pipe(concat('style.css'))
	.pipe(autoprefixer())
	.pipe(csso())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

var gridSettings = {
    outputStyle: 'less', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '560px'
        }
        /* 
        We can create any quantity of break points.

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};
smartgrid('./app/less', gridSettings);

gulp.task('watch', ['compileLESS', 'browser-sync'], function() {
	gulp.watch('app/less/**/*.less', ['compileLESS']);
	gulp.watch('app/*.html', browserSync.reload);
});

