import { ImapFlow } from "imapflow";
const simpleParser = require("mailparser").simpleParser;

export default async function readMail(req, res) {
  const user = req.body.user;
  const password = req.body.password;
  const id = req.body.id;
  var mailZ = "";

  const imapFlow = new ImapFlow({
    host: "mail.calypsocloud.one",
    port: 993,
    auth: {
      user: user,
      pass: password,
    },
  });

  await imapFlow.connect();
  let lock = await imapFlow.getMailboxLock("INBOX");
  try {
    let mail = await imapFlow.fetchOne(id, { source: true });
    console.log(mail);
    let message = Buffer.from(mail.source, "base64");
    let decoded = await simpleParser(message);
    mailZ = decoded;
    console.log(mailZ);
    lock.release();
  } catch (e) {
    console.log(e);
    await imapFlow.logout();
    return res.status(500).json({ error: e.message });
  }
  await imapFlow.logout();

  return res.status(200).json({
    status: "ok",
    message: "Mail checked",
    mail: mailZ.html,
  });
}
