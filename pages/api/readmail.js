import { ImapFlow } from "imapflow";
const simpleParser = require("mailparser").simpleParser;

export default async function readMail(req, res) {
  const user = req.body.user;
  const password = req.body.password;
  const id = req.body.id;
  var mail = {};

  const imapFlow = new ImapFlow({
    host: "mail.calypsocloud.one",
    port: 993,
    auth: {
      user: user,
      pass: password,
    },
    logger: false,
  });

  await imapFlow.connect();
  let lock = await imapFlow.getMailboxLock("INBOX");
  try {
    let data = await imapFlow.fetchOne(
      id,
      { source: true, labels: true, flags: true },
      { uid: true }
    );
    mail = {
      uid: data.uid,
      decoded: await simpleParser(data.source),
    };
    lock.release();
  } catch (e) {
    console.log(e);
    await imapFlow.logout();
    return res.status(500).json({
      status: "error",
      message: e.message,
      mail: e.message,
    });
  }

  await imapFlow.logout();

  return res.status(200).json({
    status: "ok",
    message: "Mail checked",
    mail: mail.decoded.html,
  });
}
