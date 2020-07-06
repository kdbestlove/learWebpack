let b = (str)=>{
    return new Promise((resolve,reject)=>{
        if(str == '1'){
            resolve('成功')
        }else{
            reject('失败')
        }
    });
}
b().then((res)=>{
    console.log(res)
})
.catch((res)=>{
    console.log(res)
})