module.exports = {
  apps: [
    {
      name: 'my-app',                   // Name of the application
      script: './dist/src/server.js',   // Main script to run
      node_args: '-r ./src/env/env-loader.prod.ts',  // Arguments to pass to Node.js
      watch: false,                     // Disable watching files for changes
      env: {
        NODE_ENV: 'production',         // Environment variables
      }
    }
  ]
};
