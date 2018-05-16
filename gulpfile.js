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

// dist compile files...
// delete files dist
gulp.task('clean', function() {
	return gulp.src(['dist/css/**/*', 'dist/img/**/*', 'dist/js/**/*', 'dist/*.html', 'dist/fonts/**/*'])
	.pipe(clean());
});
// compressing img
gulp.task('distCompressingImg',['clean'] , function() {
	return gulp.src('app/img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img/'));
});
// compile css file
gulp.task('distCss',['distCompressingImg'] , function() {
	return gulp.src('app/css/**/*.css')
	.pipe(uncss(
		{
			html: ['app/**/*.html']
		}
	))
	.pipe(gulp.dest('dist/css/'));
});
// js files
gulp.task('distJs',['distCss'] , function() {
	return gulp.src('app/js/**/*.js')
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js/'));
});
// no modification files
gulp.task('distHtml',['distJs'] , function() {
	return gulp.src('app/**/*.html')
	.pipe(gulp.dest('dist/'));
});
// fonts
gulp.task('distfonts',['distHtml'] , function() {
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));
});
// libs files
gulp.task('dist',['distfonts'] , function() {
	return gulp.src('app/libs/**/*')
	.pipe(gulp.dest('dist/libs/'));
});

