import express from 'express';
import bcrypt from 'bcrypt';

import User from './models/user';
import tokens from './models/translation';
import ReportConfig from './models/report_config';
import { hashPassword } from './helpers/user';


export default () => {
  let router = express.Router();

  router.use((req, res, next) => {
    console.log('API Requested');
    next();
  });

  router.get('/', (req, res) => {
    res.json({
      message: 'success',
    });
  });

  router.route('/auth/login')
    .post(async (req, res) => {
      const { username, password } = req.body;
      try {
        User.findOne({ email: username }, async (err, user) => {
          if (user === undefined || user === null) {
            res.json({
              success: false,
              message: 'Invalid username or password',
            });
            return
          }

          bcrypt.compare(password, user.password).then(match => {
            if (match) {
              res.json({
                success: true,
                message: 'user successfully authenticated',
                user: {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  username: user.username,
                  email: user.email,
                  id: user._id,
                }
              });
            } else {
              res.json({
                success: false,
                message: 'invalid username or password',
              });
            }
          });
        });
      } catch (err) {
        res.json({
          success: false,
          message: err,
        });
      }
    });

  router.route('/user/register')
    .post(async function(req, res) {
      const { username, firstName, lastName, password, email } = req.body;

      User.find({ username: username }, async function(err, docs) {
        if (docs !== null && docs.length > 0) {
          res.json({message: 'user already exists'});
        } else {
          let pwHash = await hashPassword(password);

          let newUser = new User();
          newUser.firstName = firstName;
          newUser.lastName = lastName;
          newUser.password = pwHash;
          newUser.email = email;
          newUser.username = username;

          newUser.save(err => {
            if (err)
              res.send(err);

            res.json({message: 'user created'});
          });
        }
      });
    });

  router.route('/tokens')
    .get(function(req, res) {
      const { language, tokenList, clientValue, variantValue, draft } = req.query;
      let lang = language ? language : 'en';
      let clientRequested = clientValue ? clientValue : 'generic';
      let variantRequested = variantValue ? variantValue : 'generic';
      let isDraft = draft ? 8 : 0;

      tokens.aggregate([
        {
          $match: {
            token: {$in: tokenList.split(',')}
          }
        },
        {
          $group: {
            _id: {token: '$token'},
            token: {$last: '$token'},
            translations: {
              $push: {
                translations: '$translations',
                draft_translations: '$draft_translations',
                client: '$client',
                variant: '$variant',
                value: `$translations.${lang}`,
                draftValue: `$translations.${lang}`
              }
            }
          }
        },
        {
          $unwind: '$translations'
        },
        {
          $project: {
            token: 1,
            client: '$translations.client',
            variant: '$translations.variant',
            sortVal: {
              $add: [
                {
                  $cond: [
                    {$eq: [
                        '$translations.client', clientRequested
                      ]},
                    1,
                    0
                  ]
                },
                {
                  $cond: [
                    {$eq: [
                        '$translations.variant', variantRequested
                      ]},
                    2,
                    0
                  ]
                },
                {
                  $cond: [
                    {$eq: [
                        {$ifNull: ['$translations.value', 0]}, 0
                      ]},
                    0,
                    4,
                  ]
                },
                {
                  $cond: [
                    {$eq: [
                        {$ifNull: ['$translations.draftValue', 0]}, 0
                      ]},
                    0,
                    isDraft
                  ]
                },
              ]
            },
            translations: '$translations',
          }
        },
        {
          $sort: {sortVal: -1}
        },
        {
          $group: {
            _id: {token: '$token'},
            sortVal: {$first: '$sortVal'},
            token: {$last: '$token'},
            translation: {$first: '$translations.translations'},
            draft_translations: {$first: '$translations.draft_translations'},
            client: {$first: '$translations.client'},
            variant: {$first: '$translations.variant'},
          }
        },
        {
          $project: {
            _id: 1,
            sortVal: 1,
            token: 1,
            translation: {$cond: [
                {$gte: ['$sortVal', 8]},
                '$draft_translation',
                '$translation',
              ]},
            fallbackTranslation: {$cond: [
                {$gte: ['$sortVal', 8]},
                '$translation',
                '$draft_translation',
              ]},
            client: 1,
            variant: 1,
          }
        }
      ], function(err, result) {
        if (err)
          console.log(err);

        res.json(result);
      });
    });

  router.route('/report')
    .get(function(req, res) {
      ReportConfig.find({}, (err, reports) => {
        if (err) {
          res.json({
            success: false,
            message: err,
          });
        } else {
          res.json({
            success: true,
            message: 'report configs found',
            data: reports,
          });
        }
      });
    })
    .post(async function(req, res) {
      console.log('in report');
      const { body } = req;
      ReportConfig.findOne({ name: body.name }, async (err, report) => {
        if (report !== null) {
          res.json({
            success: false,
            message: 'A report template already exists with that name',
          });
        } else {
          console.log(body);
          let reportConfig = new ReportConfig();
          reportConfig.name = body.reportName;
          reportConfig.type = body.reportType;
          reportConfig.client = body.reportClient;
          reportConfig.variant = body.reportVariant;
          reportConfig.template = body.template;
          reportConfig.language = body.language;
          reportConfig.phenotypes = body.phenotypes;
          reportConfig.phenotypeSpecificTemplates = body.phenotypeSpecificTemplates;
          reportConfig.createdBy = body.createdBy;
          reportConfig.approved = false;
          reportConfig.approvedBy = null;

          reportConfig.save(err => {
            if (err)
              res.send(err);

            res.json({
              success: true,
              message: 'Report config created successfully',
              data: reportConfig,
            });
          });
        }
      });
    });

  return router;
};
