// Folder paths
var folderPath = "E:/audodrive_project/data/augumentation/allsnow_image/severe";
var outputFolderPath = "E:/audodrive_project/data/augumentation/augumented_allsnow_1/severe";

// Ensure the output folder exists, if not, create it
var outputFolder = new Folder(outputFolderPath);
if (!outputFolder.exists) {
    outputFolder.create();
}

// Get all files in the folder
var files = Folder(folderPath).getFiles();

// Iterate through each file
for (var i = 0; i < files.length; i++) {
    var file = files[i];

    // Create a new project
    var project = app.newProject();

    // Import the image into the project
    var importOptions = new ImportOptions(file);
    var footageItem = project.importFile(importOptions);

    // Create a composition
    var comp = app.project.items.addComp("SnowfallComp", 1242, 375, 1.0, 1, 500);
    comp.displayStartTime = i; // Set the start timecode to i seconds
    comp.duration = 1/500; // Set the duration to 1/500 seconds, 1 frame

    // Add the image to the composition
    var footageLayer = comp.layers.add(footageItem); 
    footageLayer.name = "Footage Layer"; 

    // Add CC Snowfall effect to the composition
    var snowfallEffect = comp.layers.addSolid([0, 0, 0], "Snowfall", comp.width, comp.height, 1);
    snowfallEffect.adjustmentLayer = true;

    // Get the CC Snowfall effect
    var ccSnowfall = snowfallEffect.Effects.addProperty('CC Snowfall');

    // Set parameters for the CC Snowfall effect
    // (Note: Values are set according to your requirements, adjust as needed)
    ccSnowfall.property("Flakes").setValue(30000);
    ccSnowfall.property("Size").setValue(8.00);
    // Add more property settings...

    // Calculate a seed based on the file name
    var fileName = file.name;
    var seed = hashStringToInteger(fileName) % 1000;
    if (seed < 0) seed += 1000;

    ccSnowfall.property("Random Seed").setValue(seed);

    // Hash function example
    function hashStringToInteger(str) {
        var hash = 0, i, chr;
        if (str.length === 0) return hash;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0;
        }
        return hash;
    }

    // Add the composition to the render queue
    var renderQueue = app.project.renderQueue;
    var renderComp = renderQueue.items.add(comp);

    // Set render settings template to "one_frame"
    var renderSettings = renderComp.applyTemplate("one_frame");

    // Set output module format to PNG
    renderComp.outputModule(1).applyTemplate("snowfall_image");
    // Set output file path to PNG format
    var outputPath = new File(outputFolderPath + "/" + file.name.slice(0, -4) + ".png");
    outputPath.changePath(outputPath.fsName);
    renderComp.outputModule(1).file = outputPath;

    // Begin undo group
    app.beginUndoGroup("Snowfall Rendering");

    // Render the entire composition
    renderQueue.render();
    // Wait for rendering to complete
    while (renderQueue.rendering) {
        $.sleep(2000); // Wait for one second, then check rendering status again
    }

    // Close the project
    project.close(CloseOptions.DO_NOT_SAVE_CHANGES);

    // End undo group
    app.endUndoGroup();
}



// in chinese：

// // 文件夹路径
// var folderPath = "E:/audodrive_project/data/augumentation/allsnow_image/severe";
// var outputFolderPath = "E:/audodrive_project/data/augumentation/augumented_allsnow_1/severe";

// // 确保输出文件夹存在，如果不存在则创建
// var outputFolder = new Folder(outputFolderPath);
// if (!outputFolder.exists) {
//     outputFolder.create();
// }

// // 获取文件夹中的所有文件
// var files = Folder(folderPath).getFiles();

// // 循环处理每个文件
// for (var i = 0; i < files.length; i++) {
//     var file = files[i];

//     // 创建新的项目
//     var project = app.newProject();

//     // 导入图片到项目
//     var importOptions = new ImportOptions(file);
//     var footageItem = project.importFile(importOptions);

//     // 创建合成
//     var comp = app.project.items.addComp("SnowfallComp", 1242, 375, 1.0, 1, 500);
//     comp.displayStartTime = i; // 设置开始时间码为i秒
//     comp.duration = 1/500; // 设置持续时间为1/500秒,1帧

//     // 将图片添加到合成中
//     var footageLayer = comp.layers.add(footageItem); 
//     footageLayer.name = "Footage Layer"; 

//     // 在合成上添加CC Snowfall效果
//     var snowfallEffect = comp.layers.addSolid([0, 0, 0], "Snowfall", comp.width, comp.height, 1);
//     snowfallEffect.adjustmentLayer = true;

//     // 获取CC Snowfall效果
//     var ccSnowfall = snowfallEffect.Effects.addProperty('CC Snowfall');

//     // 设置CC Snowfall效果的参数值
//     ccSnowfall.property("Flakes").setValue(30000);
//     ccSnowfall.property("Size").setValue(8.00);
//     ccSnowfall.property("Variation % (Size)").setValue(100);
//     ccSnowfall.property("Scene Depth").setValue(4000.0);
//     ccSnowfall.property("Speed").setValue(100);
//     ccSnowfall.property("Variation % (Speed)").setValue(50.0);
//     ccSnowfall.property("Wind").setValue(0);
//     ccSnowfall.property("Variation % (Wind)").setValue(0.0);
//     ccSnowfall.property("Spread").setValue(0.0); 
//     ccSnowfall.property("Amount").setValue(20);
//     ccSnowfall.property("Variation % (Amount)").setValue(0.0);
//     ccSnowfall.property("Frequency").setValue(1.00);
//     ccSnowfall.property("Variation % (Frequency)").setValue(75.0);
//     ccSnowfall.property("Stochastic Wiggle").setValue(false);
//     ccSnowfall.property("Opacity").setValue(100.0);
//     ccSnowfall.property("Influence %").setValue(70.0);
//     ccSnowfall.property("Transfer Mode").setValue(1); // "Composite"对应的值
//     ccSnowfall.property("Composite With Original").setValue(true);
//     ccSnowfall.property("Ground Level %").setValue(80.0);

//     var fileName = file.name;
//     var seed = hashStringToInteger(fileName) % 1000; // 取模运算将哈希值限制在0-1000之间
//     if (seed < 0) seed += 1000; // 处理负数的情况

//     ccSnowfall.property("Random Seed").setValue(seed);

//     // 哈希函数的一个简单示例
//     function hashStringToInteger(str) {
//     var hash = 0, i, chr;
//     if (str.length === 0) return hash;
//     for (i = 0; i < str.length; i++) {
//         chr = str.charCodeAt(i);
//         hash = (hash << 5) - hash + chr;
//         hash |= 0; // 确保结果是32位有符号整数
//     }
//     return hash;
//     }

//     // 将合成添加到渲染队列
//     var renderQueue = app.project.renderQueue;
//     var renderComp = renderQueue.items.add(comp);

//     // 设置渲染设置模板为 "one_frame"
//     var renderSettings = renderComp.applyTemplate("one_frame");

//     // 设置输出模块格式为 PNG
//     renderComp.outputModule(1).applyTemplate("snowfall_image");
//     // 设置输出文件的路径为 PNG 格式
//     var outputPath = new File(outputFolderPath + "/" + file.name.slice(0, -4) + ".png");
//     // 确保输出路径是唯一的
//     outputPath.changePath(outputPath.fsName);
//     renderComp.outputModule(1).file = outputPath;

//     // 开始撤销组
//     app.beginUndoGroup("Snowfall Rendering");

//     // 渲染整个合成
//     renderQueue.render();
//     // 等待渲染完成
//     while (renderQueue.rendering) {
//         $.sleep(2000); // 等待一秒钟，然后再次检查渲染状态
//     }

//     // 关闭项目
//     project.close(CloseOptions.DO_NOT_SAVE_CHANGES);

//     // 结束撤销组
//     app.endUndoGroup();
// }







