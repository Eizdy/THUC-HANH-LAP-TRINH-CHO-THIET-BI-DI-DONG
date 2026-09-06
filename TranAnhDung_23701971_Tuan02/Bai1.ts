const helloPromise = new Promise<string>((resolve) => {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});

helloPromise.then((result)=> {
    console.log(result)
});   