var gulp=require("gulp"),
    spritesmith=require('gulp.spritesmith');

/**
 * 
 * 注释1：此选项有5种生成图片排列的方式分别为: 
 * top-down、left-rught、diagonal、alt-diagonal、binary-tree
 * 
 */

 /**
 * 
 * 注释2：cssTemplate 是生成css的模板文件可以是字符串也可以是函数。
 * 是字符串是对于相对于的模板地址 对于模板文件样式格式是：
 * 
 */

gulp.task('default', function () {

    return gulp.src('images/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的地址
            cssName: 'css/sprite.css',//保存合并后对于css样式的地址
            padding:5,//合并时两个图片的间距
            algorithm: 'top-down',//注释1
            cssTemplate:"css/handlebarsStr.css"
            /*cssTemplate: function (data) {  //注释2
                var arr=[];
                data.sprites.forEach(function (sprite) {
                    arr.push(".icon-"+sprite.name+
                    "{" +
                    "background-image: url('"+sprite.escaped_image+"');"+
                    "background-position: "+sprite.px.offset_x+" "+sprite.px.offset_y+";"+
                    "width:"+sprite.px.width+";"+
                    "height:"+sprite.px.height+";"+
                    "}\n");
                });
                return arr.join("");
            }*/

        }))
        .pipe(gulp.dest('dist/'));
});