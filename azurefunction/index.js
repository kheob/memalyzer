module.exports = function (context) {
    var http = require("https");
    var httpreal = require("http");
    var cheerio = require("cheerio");
    var request = require("requests");
    //var querystring = require("querystring");

    var SummaryTool = require('node-summary');


    context.log("test");
    var options = {
    "method": "POST",
    "hostname": "southcentralus.api.cognitive.microsoft.com",
    "port": null,
    "path": "/customvision/v1.0/Prediction/ba917485-9125-48ea-b908-9bfe5b194fb2/url?iterationId=b082ad9b-dc65-4189-befc-2c7333d2060f",
    "headers": {
        "prediction-key": "4ce549dd155a4f26bdf30ce49a07227d",
        "content-type": "application/json",
        "cache-control": "no-cache"
    }
    };
    /*
    var parseSearch = function($) {
        context.log($(".entry-list"));
    };
    */

    var descriptionGetter = function(data, callback) {
        var name = data.Tag;
        var description = "INITIALISED";
        var url = "/memes/" + encodeURIComponent(name.replace(/\s+|\'/g,'-').toLowerCase()) + "/";
        var userUrl = "http://knowyourmeme.com" + url;
        context.log("url: " + url);
        var testUrl = 'http://www.imdb.com/title/tt1229340/';
        /*request(testUrl, function(error, response, html){
            // First we'll check to make sure no errors occurred when making the request

            if(!error){
                // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

                //var $ = cheerio.load(html);

                // Finally, we'll define the variables we're going to capture

                context.log(response);
                //data.Description = description;
                callback(data);

            } else {
                context.log("ERROR!");
            }
        });*/
        // var returnData;

        httpreal.get({host: "knowyourmeme.com", port: 80, path: url, headers: {'user-agent': 'node-js'}}, function(res) {
            var html = '';
            description = res.statusCode;

            res.on('data', function(chunk) {html += chunk});
            res.on('end', function() {
                const $ = cheerio.load(html);
                //.children().slice(1, 6)
                var content = $('.bodycopy').text();
                context.log(content);
                var title = $('title').text();
                //var title = ""
                data.Url = userUrl;
                SummaryTool.summarize(title, content, function(err, summary) {
                    if(err) {
                        context.log("Something went wrong man!");
                        data.Description = content;
                        callback(data);
                    }

                    context.log(summary.replace(title, ""));

                    context.log("Original Length " + (title.length + content.length));
                    context.log("Summary Length " + summary.length);
                    context.log("Summary Ratio: " + (100 - (100 * (summary.length / (title.length + content.length)))));

                    data.Description = summary.replace(title, "");
                    callback(data);
                });
                //

            });

            context.log("STATUS for retreival of brian: ", res.statusCode);
        }).on('error', function(e) {
            description = e;
            data.Description = description;
            callback(data);
            context.log(e);
        });
    }

    var url = context.req.query.url;
    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            data = Buffer.concat(chunks);
            //context.log(JSON.parse(data.toString()));
            var data2 = JSON.parse(data.toString());
            //context.log("===============");
            context.log(data2.Predictions[0].Tag);
            //context.log(data);

            descriptionGetter(data2.Predictions[0], function(data) {
                context.res = {
                    status: 200,
                    body: data
                }
                context.log("Everything has been done more or less");

                context.done();
            });

        });
    });



    req.write(JSON.stringify({'url': url}));
    req.end();
};
