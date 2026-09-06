const wait5Seconds = async () => {
    console.log("Đang chờ 5 giây...");
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log("Bài 26 - Đã chờ xong 5 giây!");
};

wait5Seconds();