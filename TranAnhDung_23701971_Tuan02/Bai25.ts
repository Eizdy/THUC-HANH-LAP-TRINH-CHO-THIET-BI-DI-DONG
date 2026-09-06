const downloadFile = async () => {
    console.log("Bắt đầu tải file...");
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log("Bài 25 - Tải file hoàn tất!");
};

downloadFile();