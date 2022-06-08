import mongoose from 'mongoose';
var logger = require('winston');
import { catchAsync } from '@otmilms/common';
import { app } from './app';


logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  level: 'info',
  // level: 'debug',
  colorize: true,
  timestamp: true,
});

const start = async () => {
 
  // initialize express server to listen
  app.listen(3000, () => {
    logger.info('Listening on port 3000!!!!!!!!');
  });
};

catchAsync(start());
