// mutations.js
// mutation内部不能有异步代码，只能是同步

export default {
    updateCount(state, num) {
        // mutation方法只能有两个参数，如果需要传多个数据，可以将第二个参数以对象形式包装数据传进来
        state.count = num;
    }
}
