import { join } from 'path';
import { FlywayHistory } from 'midway-flyway-js/dist/entity';

import { MidwayConfig } from '@midwayjs/core';
import { UserEntity } from '../modules/authority/entity/user';
import { PipelineEntity } from '../modules/pipeline/entity/pipeline';
//import { logger } from '../utils/logger';
// load .env file in process.cwd
import _ from 'lodash';
import { load } from './loader';
const development = {
  // use for cookie sign key, should change to your own and keep security
  keys: 'certd666',
  koa: {
    port: 7001,
  },
  staticFile: {
    dirs: {
      default: {
        prefix: '/',
        dir: 'public',
        alias: {
          '/': '/index.html',
        },
      },
    },
  },
  cron: {},
  /**
   * 演示环境
   */
  preview: {
    enabled: false,
  },

  /**
   *  数据库
   */
  typeorm: {
    dataSource: {
      default: {
        /**
         * 单数据库实例
         */
        type: 'sqlite',
        database: join(__dirname, '../../data/db.sqlite'),
        synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true
        logging: true,

        // 配置实体模型 或者 entities: '/entity',
        entities: [
          '**/modules/*/entity/*.ts',
          '**/entity/*.js',
          '**/entity/*.d.ts',
          PipelineEntity,
          FlywayHistory,
          UserEntity,
        ],
      },
    },
  },
  /**
   * 自动升级数据库脚本
   */
  flyway: {
    scriptDir: join(__dirname, '../../db/migration'),
  },

  biz: {
    jwt: {
      secret: 'certd666',
      expire: 7 * 24 * 60, //单位秒
    },
    authOnly: {
      ignoreUrls: ['/', '/public', '/api/login', '/api/register'],
    },
  },
} as MidwayConfig;
_.merge(development, load('development'));
export default development;