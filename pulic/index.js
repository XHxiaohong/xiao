
console.log(new Date(2019, 3, 32))

// let a = new Promise((reslove, reject)=> {
//   console.log(1);

//   setTimeout(()=> {
//     reslove(2)
//     console.log(3)
//   })

//   reject('error')
// });


// a.then((res)=> {
//   console.log(res)
//   console.log(5)
// }).catch(err=> {
//   console.log(err)
// })

// const timeout = ms => new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve();
//   }, ms);});
  
//   const ajax1 = () => timeout(2000).then(() => {
//     console.log('1');
//     return 1;
//   });
  
//   const ajax2 = () => timeout(1000).then(() => {
//     console.log('2');
//     return 2;
//   });
  
//   const ajax3 = () => timeout(2000).then(() => {
//     console.log('3');
//     return 3;
//   });
  
//   const mergePromise = ajaxArray => {
//    // 在这里实现你的代码

//     let Arr = [];
//     // let a = Promise.reslove();

//     // let p = Promise.resolve();
//     let a = new Promise((reslove, reject)=> {
//       reslove()
//     })

//     ajaxArray.forEach(itme=> {
//       a = a.then(itme).then(data=> {
//         Arr.push(data)
//         return Arr
//       })
//     })

//     return a;
//   };
  
//   mergePromise([ajax1, ajax2, ajax3])
//   .then(data => {
//     console.log('done');
//     console.log(data); // data 为 [1, 2, 3]
//   });


  // 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]

// console.log(ajax3().then((a)=> {
//   console.log(a, 1)
// }),123)


function red(){
  console.log('red');
}

function green(){
  console.log('green');
}

function yellow(){
  console.log('yellow');
}

function a () {
  let color = new Promise((reslove, reject)=> {
    reslove()
  })
}