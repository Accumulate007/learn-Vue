// actions.js
// 用于异步代码修改state

export default {
    updateCountAsync(state, data) {
        setTimeout(() => {
            state.commit('updateCount', data.num);
        }, data.time);
    }
}

