'use strict'

import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

let app = express();

app.use(helmet());
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));
app.use(cookieParser());
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());
app.use(helmet({contentSecurityPolicy: false,}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,UPDATE'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true); 
  next();
});

app.get('/ap/', function (req, res) {
  res.send('Web Api NTH-AP By ThemeSanasang. V.1')
});

app.use('/ap/', [
  require('./routes/user_routes'),
  require('./routes/department_routes'),
  require('./routes/department_sub_routes'),
  require('./routes/account_routes'),
  require('./routes/account_old_routes'),
  require('./routes/account_gf_routes'),
  require('./routes/account_main_routes'),
  require('./routes/payable_routes'),
  require('./routes/payable_type_routes'),
  require('./routes/payable_list_routes'),
  require('./routes/liabilities_type_routes'),
  require('./routes/liabilities_routes'),
  require('./routes/item_routes'),
  require('./routes/general_routes'),
  require('./routes/emp_report_routes'),
  require('./routes/account_payable_routes'),
  require('./routes/account_payable_history_routes'),
  require('./routes/account_payable_arrear_routes'),
  require('./routes/account_payable_arrear_history_routes'),
  require('./routes/report_routes'),
])

module.exports = app