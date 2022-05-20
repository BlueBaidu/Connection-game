module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],

    rules: {
        "vue/no-unused-components": "off", // 当存在定义而未使用的组件时，关闭报错
        "no-self-assign":"off",
        "no-debugger":"off",
        'no-unused-vars': [2, {//禁止出现未使用过的变量
            'vars': 'all',
            'args': 'none'
        }],
        "vue/multi-word-component-names": ["error", {
            "ignores": []
        }],
    }
}