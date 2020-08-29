interface IMessage {
  to: string;
  body: string;
}

export default interface IMailProvider {
  sendMail(to: string, body: string): Promise<void>;
}
