import Vuex from 'vuex';
import defaultState from './state/state.js';
import Mutations from './mutations/mutations.js';
import Getters from './getters/getters.js';
import Actions from './actions/actions.js';

// const store = new Vuex.Store({
//     state: {
//         count: 0
//     },
//     // 用于修改state的mutations
//     mutations: {
//         updateCount(state, num) {
//             state.count = num;
//         }
//     }
// })

const isDev = process.env.NODE_ENV === 'development';

export default () => {
    return new Vuex.Store({
        static: isDev,   // 开发环境使用，禁止了在外部通过this.$store.state修改state中的数据
        state: defaultState,
        mutations: Mutations,
        getters: Getters,
        actions: Actions,
        // 模块的定义
        modules: {
            a: {
                namespaced: true,   // 设置命名空间，防止与全局的mutations名称起冲突
                state: {
                    text: 'a modules'
                },
                mutations: {
                    updateText(state, text) {
                        state.text = text;
                    }
                },
                getters: {
                    textPlus(state, getters, rootState) {
                        console.log('a moudules textPlus 中的gettters参数：', getters);
                        console.log('a moudules textPlus rootState参数：', rootState);
                        return state.text += '+getters';
                    }
                }
            },
            b: {
                state: {
                    text: 'b modules'
                }
            }
        },
        plugins: [
            
        ]
    })
};

