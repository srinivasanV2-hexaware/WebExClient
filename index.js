var request = require('request');
const xmlQuery = require('xml-query');
const XmlReader = require('xml-reader');
function SendMeeting(){
  let rawbody=`<serv:message xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
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
      <meetingkey>621893047</meetingkey>
      <participants>
        <attendees>
          <attendee>
            <person>
              <email>38238.hexaware@gmail.com</email>
            </person>
          </attendee>
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
request.post({
  headers: { 'content-type': 'application/xml' },
  url: 'https://apidemoeu.webex.com/WBXService/XMLService',
  body: rawbody
}, function (error, response, body) {
  const ast = XmlReader.parseSync(body);
  const result=xmlQuery(ast).find('serv:result').text();
  console.log(result); 
  console.log(body); 

});
}
function CreateMeeting() {
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
                <confName>Sample Meeting</confName>
            </metaData>
            <schedule>
                <startDate/>
            </schedule>
        </bodyContent>
    </body>
</serv:message>`;
  request.post({
    headers: { 'content-type': 'application/xml' },
    url: 'https://apidemoeu.webex.com/WBXService/XMLService',
    body: rawbody
  }, function (error, response, body) {
    const ast = XmlReader.parseSync(body);
    const meeting_id=xmlQuery(ast).find('meet:meetingkey').text();
    const server_host=xmlQuery(ast).find('serv:host').text();
    const server_attd=xmlQuery(ast).find('serv:attendee').text();
    console.log(meeting_id); 
    console.log(server_host); 
    console.log(server_attd); 

  });
}
SendMeeting();
