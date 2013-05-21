var cronJob = require('cron').CronJob;

var job = new cronJob({
    cronTime: '* * * * * *',
    start: false,
    timeZone: "America/Los_Angeles"
});
job.start();