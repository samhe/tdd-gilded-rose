'use strict';
import express from 'express';
import mongoose from 'mongoose';

// Use native promises
mongoose.Promise = global.Promise;

class Server {
  constructor() {
    this.app;
    this.db;
    this.server;
  }

  getInstance() {
    if(!this.app) {
      let self = this;
      this.app = express();
      this.db = this.connect().on('error', console.log)
        .once('open', function() {
          const port = process.env.PORT || 3000;
          self.server = self.app.listen(port, function() {
            console.log('Express app started on port ' + port);
          });
        });
    }
    return this;
  }
  close() {
    this.server ? this.server.close() : '';
  }
  connect() {
    let options = {
      server: {
        socketOptions: {
          keepAlive: 1
        }
      }
    };
    let dbURL = 'mongodb://localhost:27017/test';
    return mongoose.connect(dbURL, options).connection;
  }
}
let server;
export function getServer() {
  if(!server) {
    server = new Server();
  }
  return server;
}
