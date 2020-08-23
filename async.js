function a() {
    console.log('a')
}

function b() {
    console.log('b')
}

a()
b()

// a
// b

function a() {
    setTimeout(function() {
        console.log('a') // 1초후 실행
    }, 1000)
}

function b() {
    console.log('b')
}

a()
b()

// b
// a

function a(cb) {
    setTimeout(function() {
        console.log('a')
        cb()
    }, 1000)
}

function b() {
    console.log('b')
}

a(function () {
    b()
})

// a -> b 실행되도록 callback 함수 사용
// a
// b

function a(cb) {
    setTimeout(function() {
        console.log('a')
        cb()
    }, 1000)
}

function b(cb) {
    setTimeout(function() {
        console.log('b')
        cb()
    }, 1000)
}

function c(cb) {
    setTimeout(function() {
        console.log('c')
        cb()
    }, 1000)
}

function d(cb) {
    setTimeout(function() {
        console.log('d')
        cb()
    }, 1000)
}

// 콜백 지옥
a(function() {
    b(function () {
        c(function () {
            d()
        })
    })
})

function a() {
    return new Promise(resolve => {
        setTimeout(function () {
            console.log('a')
            resolve()
        }, 1000)
    })
}

function b() {
    return new Promise(resolve => {
        setTimeout(function () {
            console.log('b')
            resolve()
        }, 1000)
    })
}

function c() {
    return new Promise(resolve => {
        setTimeout(function () {
            console.log('c')
            resolve()
        }, 1000)
    })
}

function d() {
    return new Promise(resolve => {
        setTimeout(function () {
            console.log('d')
            resolve()
        }, 1000)
    })
}

a()
    .then(() => b())
    .then(() => c())
    .then(() => d())
// a -> b -> c -> d 순서 보장

// promise 객체를 반환해야 한다.
// await는 async 함수 내에서만 실행
async function asyncFunc() {
    await a()
    await b()
    await c()
    await d()
    console.log('done')
} 

function a() {
    // reject : 문제 발생 시 실행
    return new Promise((resolve, reject) => {
        if (isError) {
            reject(Error) // reject이 실행 되면 reject 아래 코드는 무시
        }
        setTimeout(() => {
            console.log('a')
            resolve('done')
        }, 1000)
    })
}

a()
    .then((res) => { // 정상이면 resolve로 실행되어 then으로 이동
        console.log(res)
    }) 
    .catch((error) => { // 문제 발생 시 rejct가 실행되어 catch로 이동
        console.log(error)
        alert(error.message)
    })
    .finally(() => { // resolve, reject와 상관없이 무조건 1번은 호출 

    })
    
async function asyncFunc() {
    try {
        const res = await a()
        console.log(res)
    } catch (error) {
        console.log(error)
        alert(error.message)
    } finally {
        console.log('done')
    }
}

asyncFunc()