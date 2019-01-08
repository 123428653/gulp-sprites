# Gulp生成雪碧图

```js
// clone 到本地
git clone https://github.com/123428653/gulp-sprites.git

//进入到clone的目录下
cd gulp-sprites

//安装项目依赖
npm i 或者 cnpm i  

//运行gulp，即可把images目录下的图片合并为雪碧图然后导出到dist目录下
gulp


```

利用<code style="color: red">gulp、gulp.spritesmith</code>库把png格式的图片合并为雪碧图

```js
var gulp=require("gulp"),
    spritesmith=require('gulp.spritesmith');

/**
 * 
 * 注释1：此选项有5种生成图片排列的方式分别为: 
 * top-down、left-rught、diagonal、alt-diagonal、binary-tree
 * 
 */

gulp.task('default', function () {

    return gulp.src('images/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的地址
            cssName: 'css/sprite.css',//保存合并后对于css样式的地址
            padding:5,//合并时两个图片的间距
            algorithm: 'top-down',//注释1
            //cssTemplate:"css/handlebarsStr.css"
            cssTemplate: function (data) {  //注释2
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
            }

        }))
        .pipe(gulp.dest('dist/'));
});
```


```js

 /**
 * 
 * 注释2：cssTemplate 是生成css的模板文件可以是字符串也可以是函数。
 * 是字符串是对于相对于的模板地址 对于模板文件样式格式是：
 * 
 */
 
{{#sprites}}
.icon-{{name}}{
    background-image: url("{{escaped_image}}");
    background-position: {{px.offset_x}} {{px.offset_y}};
    width: {{px.width}};
    height: {{px.height}};
}
{{/sprites}}
```