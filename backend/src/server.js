const app = require('./app');
const connectDb = require('./config/db');
const env = require('./config/env');
const seedPlans = require('./utils/seedPlans');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDb();
    await seedPlans();
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${env.nodeEnv} mode`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use. Set a different PORT or stop the existing process.`);
        process.exit(1);
      }

      console.log('Server failed to start', error);
      process.exit(1);
    });
  } catch (error) {
    console.log('Failed to start server', error);
    process.exit(1);
  }
};

startServer();
