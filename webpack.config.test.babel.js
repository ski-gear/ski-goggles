import nodeExternals from 'webpack-node-externals';

class NodePathReplacePlugin {
    apply(compiler) {
        function setModuleConstant(expressionName, fn) {
            compiler.plugin('compilation', function (compilation, params) {
                params.normalModuleFactory.plugin('parser', function (parser, _parserOptions) {
                    parser.plugin(`expression ${expressionName}`, function () {
                        this.state.current.addVariable(expressionName, JSON.stringify(fn(this.state.module)));
                        return true;
                    });
                });
            });
        }

        setModuleConstant('__filename', module => module.resource);
        setModuleConstant('__dirname', module => module.context);
    }
}

export default {
    target: 'node',
    externals: [nodeExternals()],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new NodePathReplacePlugin()
    ]
};
