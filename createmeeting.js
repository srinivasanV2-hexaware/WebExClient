var request = require('request');
const xmlQuery = require('xml-query');
const XmlReader = require('xml-reader');
var Promise = require('promise');
var SendMeeting = function (subjectMeeting, meetingPlace, dateScheduling, emaillist, startdate, enddate,session) {
      var attendeess='';
                emaillist.forEach(function (emailids) {
                if(emailids){
                attendeess += `<attendee>
            <person>
              <email>${emailids}</email>
            </person>
          </attendee>`;
                }
            });
      console.log(attendeess);
    return new Promise(function (resolve, reject) {
        return CreateMeeting(subjectMeeting, meetingPlace,startdate).then(function (result) {
              console.log(result);
            var nowDate = startdate.split(' ');
          
                 
  let rawbody = `<serv:message xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <header>
    <securityContext>
      <webExID>NuanceWebex</webExID>
      <password>#23_Srini</password>
      <siteName>apidemoeu</siteName>
    </securityContext>
  </header>
  <body>
    <bodyContent
      xsi:type="java:com.webex.service.binding.meeting.SetMeeting">
      <meetingkey>${result.meeting_id}</meetingkey>
      <participants>
        <attendees>
         ${attendeess}
        </attendees>
      </participants>
      <attendeeOptions>
        <emailInvitations>true</emailInvitations>
      </attendeeOptions>
      <schedule>
        <openTime>300</openTime>
      </schedule>
    </bodyContent>
  </body>
</serv:message>`;
      console.log('---------------------------Raw Body ----------------------------');
      console.log(rawbody);
      console.log('-----------------------------------------------------------------');
            request.post({
                headers: { 'content-type': 'application/xml' },
                url: 'https://apidemoeu.webex.com/WBXService/XMLService',
                body: rawbody
            }, function (error, response, body) {
                const ast = XmlReader.parseSync(body);
                const result = xmlQuery(ast).find('serv:result').text();
                console.log('---------------------------Meeting Body ----------------------------');
                console.log(JSON.stringify(body));
                console.log('-----------------------------------------------------------------');
                resolve(result);
            });

        }).catch(function (errdata) {
             console.log('---------------------------Meeting Error ----------------------------');
             console.log(JSON.stringify(errdata))
              console.log('-----------------------------------------------------------------');
            reject(errdata)
        })
    })

}
var CreateMeeting = function (subjectMeeting, meetingPlace,startdate) {
    return new Promise(function (resolve, reject) {
        var r = {};
        let rawbody = `<?xml version="1.0" encoding="UTF-8"?>
<serv:message xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <header>
        <securityContext>
            <webExID>NuanceWebex</webExID>
            <password>#23_Srini</password>
            <siteName>apidemoeu</siteName>
        </securityContext>
    </header>
    <body>
        <bodyContent xsi:type="java:com.webex.service.binding.meeting.CreateMeeting">
            <metaData>
                <confName>${subjectMeeting + '-' + meetingPlace}</confName>
            </metaData>
            <schedule>
                <startDate>${startdate}</startDate>
            </schedule>
        </bodyContent>
    </body>
</serv:message>`;
        request.post({
            headers: { 'content-type': 'application/xml' },
            url: 'https://apidemoeu.webex.com/WBXService/XMLService',
            body: rawbody
        }, function (error, response, body) {
            try {
                 // console.log(response);
                const ast = XmlReader.parseSync(body);
                const meeting_id = xmlQuery(ast).find('meet:meetingkey').text();
                const server_host = xmlQuery(ast).find('serv:host').text();
                const server_attd = xmlQuery(ast).find('serv:attendee').text();
                r.meeting_id = meeting_id;
                r.server_host = server_host;
                r.server_attd = server_attd;
                console.log('----------------------------------Create Meeting resonse ---------------------------')
                console.log(body)   
                console.log('-------------------------------------------------------------------------------------');
                resolve(r);
                  
            }
            catch (e) {
                console.log('----------------------------------Create Meeting error ---------------------------')
                console.log(e)  
                console.log('----------------------------------------------------------------------------------');
                reject(e);
               
            }

        });
    });
}

module.exports.sendMeeting = SendMeeting;
