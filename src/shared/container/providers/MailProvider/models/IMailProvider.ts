export default interface IMailProvider {
  sendMail(to: string, mail: string): Promise<void>;
}
