### 运行机制全概览
1.初始化及挂载。
- new Vue()后会调用_init函数进行初始化，初始化生命周期，事件，props，methods，data，computed，watch等
- 通过Object.defineProperty()设置setter与getter函数，
- 初始化后调用$mount进行挂载

2.编译。如果不存在render function而是存在template，需要进行编译，编译可以分为三个阶段，最终得到render function。
- parse：使用正则等方式解析template模板中的指令、class、style等数据，形成AST语法树
- optimize：标记static静态节点，这是Vue编译过程的一个优化，diff算法直接跳过静态节点，从而减少比较过程
- generate：将AST转化成

3.响应式
- render function被渲染的时候，会读取所需要对象的值，触发getter函数进行依赖收集
- 依赖收集的目的是将观察者Watcher对象放到当前闭包中的订阅者Dep的subs中。
- 一个对象(data中的数据)对应一个自身闭包中的Dep，而Dep的subs属性中存放了该对象的所有观察者(watchers)
- 修改值的时候，会触发数据的setter，通过setter通知之前依赖收集得到的存放在Dep subs中的每一个观察者
- 观察者(watcher)收到了数据变更的通知，会调用update来更新视图(这中间还有一个patch和异步队列更新的策略)

4.Virtual DOM。
- render functioin会被转化成VNode节点
- Virtual DOM是以JavaScript对象为基础而不依赖浏览器平台的，所以具有跨平台的能力

5.更新视图
- 更新一个对象值，会通过 setter -> watcher -> update的流程修改对应的视图
- 当数据变化后，执行render function可以得到新的VNode节点
- 新的VNode节点和旧的VNode节点会被传入patch进行比较，经过diff算法比较差异，实现差异化最小成本更新



