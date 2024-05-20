// 文件夹路径
var folderPath = "D:/CODE/sensing-system/data_object_image_2/training/folder1";
var outputFolderPath = "D:/CODE/AE_rain/test_data_output/folder1";
// var folderPath = "D:/CODE/AE_rain/test_data";
// var outputFolderPath = "D:/CODE/AE_rain/test_data_output";

// 确保输出文件夹存在，如果不存在则创建
var outputFolder = new Folder(outputFolderPath);
if (!outputFolder.exists) {
    outputFolder.create();
}

// 获取文件夹中的所有文件
var files = Folder(folderPath).getFiles();

// 循环处理每个文件
for (var i = 0; i < files.length; i++) {
    var file = files[i];

    // 创建新的项目
    var project = app.newProject();

    // 导入图片到项目
    var importOptions = new ImportOptions(file);
    var footageItem = project.importFile(importOptions);

    // 创建合成
    var comp = project.items.addComp("RainComp", 1242, 375, 1, 1, 1);
    // comp.displayStartTime = i; // 设置开始时间码为i秒
    // comp.duration = 1/500; // 设置持续时间为1/500秒,1帧

    // 将图片添加到合成中
    var footageLayer = comp.layers.add(footageItem); // 添加您导入的图片
    footageLayer.name = "Footage Layer"; // 可选：给图层命名

    // 在合成上添加CC Rain效果
    var rainEffect = comp.layers.addSolid([0, 0, 0], "Rain", comp.width, comp.height, 1);
    rainEffect.adjustmentLayer = true;
    // var ccRainFall = rainEffect.applyPreset(File("D:/CODE/AE_rain/rain.ffx")); 

    // 获取CC Rain效果对象
    // var ccRainEffect = rainEffect.property("ADBE CC Rain DROPS");
    var ccRainEffect = rainEffect.Effects.addProperty('CC Rainfall');

    // 设置CC Snowfall效果的参数值
    // ccSnowfall.property("Flakes").setValue(750);
    ccRainEffect.property("Drops").setValue(750);
    ccRainEffect.property("Size").setValue(6.00);
    ccRainEffect.property("Scene Depth").setValue(5000);
    ccRainEffect.property("Speed").setValue(70);
    ccRainEffect.property("Wind").setValue(30.0);
    ccRainEffect.property("Variation % (Wind)").setValue(50.0);
    ccRainEffect.property("Spread").setValue(0.0);
    ccRainEffect.property("Opacity").setValue(25.0);
    // ccSnowfall.property("Variation % (Size)").setValue(100);
    // ccSnowfall.property("Scene Depth").setValue(4000.0);
    // ccSnowfall.property("Speed").setValue(100);
    // ccSnowfall.property("Variation % (Speed)").setValue(50.0);
    // ccSnowfall.property("Wind").setValue(0);
    // ccSnowfall.property("Variation % (Wind)").setValue(0.0);
    // ccSnowfall.property("Spread").setValue(0.0); 
    // ccSnowfall.property("Amount").setValue(20);
    // ccSnowfall.property("Variation % (Amount)").setValue(0.0);
    // ccSnowfall.property("Frequency").setValue(1.00);
    // ccSnowfall.property("Variation % (Frequency)").setValue(75.0);
    // ccSnowfall.property("Stochastic Wiggle").setValue(false);
    // ccSnowfall.property("Opacity").setValue(100.0);
    // ccSnowfall.property("Influence %").setValue(70.0);
    // ccSnowfall.property("Transfer Mode").setValue(1); // "Composite"对应的值
    // ccSnowfall.property("Composite With Original").setValue(true);
    // ccSnowfall.property("Ground Level %").setValue(80.0);

    var fileName = file.name;
    var seed = hashStringToInteger(fileName) % 1000;
    if (seed < 0) seed += 1000;

    ccRainEffect.property("Random Seed").setValue(seed);

    // 哈希函数的一个简单示例
    function hashStringToInteger(str) {
        var hash = 0, i, chr;
        if (str.length === 0) return hash;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // 确保结果是32位有符号整数
        }
        return hash;
    }

    // 导出合成的第一帧为图片
    var renderQueue = app.project.renderQueue;
    var renderComp = renderQueue.items.add(comp);

    

    // 设置输出模块格式为 PNG
    renderComp.outputModule(1).applyTemplate("rain_output");

    // // 自定义渲染设置模板 "one_frame" 中的起始时间、结束时间和持续时间
    // var renderSetting = renderComp.outputModule(1).getSettings();
    // renderSetting.startFrame = 0;  // 设置起始时间为00:00:00:00
    // renderSetting.endFrame = 1;    // 设置结束时间为00:00:00:01
    // renderSetting.duration = 1;     // 设置持续时间为00:00:00:01

    // // 设置帧速率为1帧/秒
    // renderComp.frameRate = 1;

    // 自定义渲染设置模板 "one_frame" 中的起始时间、结束时间和持续时间
    // var renderSetting = renderComp.getSetting("one_frame");
    var renderSetting = renderComp.outputModule(1).getSettings();
    renderSetting.startFrame = 0;  // 设置起始时间为00:00:00:00
    renderSetting.endFrame = 1;    // 设置结束时间为00:00:00:01
    renderSetting.duration = 1;     // 设置持续时间为00:00:00:01

    // 设置帧速率为1帧/秒
    renderComp.frameRate = 1;

    //设置渲染设置模板为 "one_frame"
    //var renderSettings = renderComp.applyTemplate("one_frame");
    renderComp.applyTemplate("one_frame");


    // 设置输出文件的路径为 PNG 格式
    var outputPath = new File(outputFolderPath + "/" + file.name.slice(0, -4) + ".png");
    // 确保输出路径是唯一的
    outputPath.changePath(outputPath.fsName);
    renderComp.outputModule(1).file = outputPath;

    // 开始撤销组
    app.beginUndoGroup("Rain Rendering");

    // 渲染整个合成
    renderQueue.render();
    // 等待渲染完成
    while (renderQueue.rendering) {
        $.sleep(2000); // 等待一秒钟，然后再次检查渲染状态
    }

    // 关闭项目
    project.close(CloseOptions.DO_NOT_SAVE_CHANGES);

    // 结束撤销组
    app.endUndoGroup();
}
