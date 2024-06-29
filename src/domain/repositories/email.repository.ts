export abstract class EmailRepository {
  abstract generateToken(email: string): Promise<string>;
  abstract validateToken(token: string): Promise<string>;
  abstract sendEmail(
    email: string,
    subject: string,
    body: string,
  ): Promise<void>;
}
