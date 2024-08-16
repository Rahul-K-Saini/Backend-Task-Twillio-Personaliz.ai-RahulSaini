import express from 'express';
import twilio from 'twilio';
import "dotenv/config"

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); 

const PORT = process.env.PORT || 5000;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

if (!accountSid || !authToken || !twilioNumber) {
    console.error('Twilio credentials or number are not set in environment variables');
    process.exit(1);
}

const client = twilio(accountSid, authToken);

app.get('/make-call', (req, res) => {
    client.calls
        .create({
            url: `https://667d-2401-4900-87aa-9c59-ed80-facd-7282-bfb8.ngrok-free.app/gather`,
            to: process.env.TO_NUMBER,
            from: process.env.TWILIO_NUMBER
        })
        .then(call => {
            console.log(call.sid);
            res.send('Call initiated');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error initiating call');
        });
});

app.post('/gather', (req, res) => {
    const twiml = new twilio.twiml.VoiceResponse();

    twiml.play("/audio.mp3");

    twiml.gather({
        numDigits: 1,
        action: '/handle-gather',
        method: 'POST'
    });

    res.type('text/xml');
    res.send(twiml.toString());
});

app.post('/handle-gather', (req, res) => {
    const userInput = req.body.Digits;
    const twiml = new twilio.twiml.VoiceResponse();

    if (userInput === '1') {
        twiml.say('Thank you. We will send you the personalized interview link shortly.');
        sendInterviewLink(req.body.From, 'https://v.personaliz.ai/?id=9b697c1a&uid=fe141702f66c760d85ab&mode=test');
    } else {
        twiml.say('Invalid input. Goodbye.');
    }

    res.type('text/xml');
    res.send(twiml.toString());
});

function sendInterviewLink(phoneNumber, link) {
    return client.messages
        .create({
            body: `Here's your personalized interview link: ${link}`,
            from: process.env.TWILIO_NUMBER,
            to: process.env.TO_NUMBER
        })
        .then(message => console.log(message.sid))
        .catch(err => console.error('Error sending SMS:', err));
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));