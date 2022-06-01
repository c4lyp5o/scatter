import { ImapFlow } from "imapflow";

export default async function checkMail(req, res) {
  const user = req.body.user;
  const password = req.body.password;
  const messages = [];

  const imapFlow = new ImapFlow({
    host: "mail.calypsocloud.one",
    port: 993,
    auth: {
      user: user + "@calypsocloud.one",
      pass: password,
    },
  });

  await imapFlow.connect();
  let lock = await imapFlow.getMailboxLock("INBOX");
  try {
    for await (let message of imapFlow.fetch("1:*", { envelope: true })) {
      messages.push({
        uid: message.uid,
        date: message.envelope.date.toString(),
        from: message.envelope.from[0].address,
        subject: message.envelope.subject,
      });
    }
    lock.release();
  } catch (e) {
    console.log(e);
    await imapFlow.logout();
    return res.status(500).json({ error: e.message });
  }
  await imapFlow.logout();

  return res.status(200).json({
    status: "ok",
    message: "Mailbox checked",
    user: user + "@calypsocloud.one",
    password: password,
    envelope: messages,
  });
}
