
import {RecaptchaEnterpriseServiceClient} from '@google-cloud/recaptcha-enterprise';

/**
* Create an assessment to analyze the risk of a UI action. Note that
* this example does set error boundaries and returns `null` for
* exceptions.
*
* projectID: Google Cloud project ID
* recaptchaKey: reCAPTCHA key obtained by registering a domain or an app to use the services of reCAPTCHA Enterprise.
* token: The token obtained from the client on passing the recaptchaKey.
* recaptchaAction: Action name corresponding to the token.
*/
async function createAssessment({ projectID, recaptchaKey, token, recaptchaAction }: any) {
// Create the reCAPTCHA client & set the project path. There are multiple
// ways to authenticate your client. For more information see:
// https://cloud.google.com/docs/authentication
// TODO: To avoid memory issues, move this client generation outside
// of this example, and cache it (recommended) or call client.close()
// before exiting this method.
const client = new RecaptchaEnterpriseServiceClient();
const projectPath = client.projectPath(projectID);

// Build the assessment request.
const request = ({
assessment: {
 event: {
   token: token,
   siteKey: recaptchaKey,
 },
},
parent: projectPath,
});
console.log(request);
// client.createAssessment() can return a Promise or take a Callback
const [ response ] = await client.createAssessment(request);
console.log("yesssssss");
if(response.tokenProperties===null||response.tokenProperties===undefined||response.riskAnalysis===null||response.riskAnalysis===undefined)
        return null;

// Check if the token is valid.
if (!response.tokenProperties.valid) {
console.log("The CreateAssessment call failed because the token was: " +
response.tokenProperties.invalidReason);

return null;
}

// Check if the expected action was executed.
// The `action` property is set by user client in the
// grecaptcha.enterprise.execute() method.
if (response.tokenProperties.action === recaptchaAction) {

// Get the risk score and the reason(s).
// For more information on interpreting the assessment,
// see: https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
console.log("The reCAPTCHA score is: " +
response.riskAnalysis.score);
    if(response.riskAnalysis.reasons===null||response.riskAnalysis.reasons===undefined) return null;
    if(response.riskAnalysis.score===null||response.riskAnalysis.score===undefined) return null;

response.riskAnalysis.reasons.forEach((reason) => {
console.log(reason);
});
return response.riskAnalysis.score;
} else {
console.log("The action attribute in your reCAPTCHA tag " +
"does not match the action you are expecting to score");
return null;
}
}

export async function POST(req: Request) {
    const body = await req.json();
    const {tokn} = body;
    console.log(tokn);
    const res = await createAssessment({ projectID : "stoked-edition-406115",recaptchaKey :  "6LcaqkApAAAAAGadmPPxtME3R4lLUGqjKI6v_yzP",
    token : String(tokn),recaptchaAction : "LOGIN",});
    return res;
        //  {
//         // Create the reCAPTCHA client & set the project path. There are multiple
//         // ways to authenticate your client. For more information see:
//         // https://cloud.google.com/docs/authentication
//         // TODO: To avoid memory issues, move this client generation outside
//         // of this example, and cache it (recommended) or call client.close()
//         // before exiting this method.
//         console.log("yes");
//         const client = new RecaptchaEnterpriseServiceClient();
//         const projectPath = client.projectPath(projectID);
//         // Build the assessment request.
//         const request = ({
//             assessment: {
//                 event: {
//                     token: token,
//                     siteKey: recaptchaKey,
//                 },
//             },
//             parent: projectPath,
//         });
//             // client.createAssessment() can return a Promise or take a Callback
//             const [ response ] = await client.createAssessment(request);
//             if(response.tokenProperties===null||response.tokenProperties===undefined||response.riskAnalysis===null||response.riskAnalysis===undefined){
//                 return new Response(JSON.stringify(response), {
//                     status: 400,
//                     headers: { "message" : "error" }, 
//                 });
//             }
        
//             // Check if the token is valid.
//             if (!response.tokenProperties.valid) {
//                 console.log("The CreateAssessment call failed because the token was: " + response.tokenProperties.invalidReason);
//                 return null;
//             }
        
//             // Check if the expected action was executed.
//             // The `action` property is set by user client in the
//             // grecaptcha.enterprise.execute() method.
//             if (response.tokenProperties.action === recaptchaAction) {
//                 // Get the risk score and the reason(s).
//                 // For more information on interpreting the assessment,
//                 // see: https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
//                 console.log("The reCAPTCHA score is: " + response.riskAnalysis.score);
//                 if(response.riskAnalysis.reasons===null||response.riskAnalysis.reasons===undefined){
//                     return new Response(JSON.stringify(response), {
//                         status: 400,
//                         headers: { "message" : "error" }, 
//                     });
//                 }
//                 // if(response.riskAnalysis.score===null||response.riskAnalysis.score===undefined) return null;
//                 response.riskAnalysis.reasons.forEach((reason) => {
//                     console.log(reason);
//                 });
//                 return new Response(JSON.stringify(response), {
//                     status: 200,
//                     headers: { "score" : String(response.riskAnalysis.score), "message" : "success"}, 
//                 });
//                 // return response.riskAnalysis.score;
//             } 
//             else {
//                console.log("The action attribute in your reCAPTCHA tag " + "does not match the action you are expecting to score");
//                return new Response(JSON.stringify(response), {
//                     status: 400,
//                     headers: { "message" : "error" }, 
//                });
//             }
//         }
        // await createAssessment();
}