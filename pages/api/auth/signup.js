import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default async function signUpHandler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;

    if (
      !email ||
      !password ||
      !email.includes("@") ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      return res.status(422).json({ message: "Invalid input data" });
    }

    const client = await connectToDatabase();

    const db = client.db();

    const hashedPassword = hashPassword(password);

    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });

    res
      .status(200)
      .json({ message: "Successfully added user", result: result });
  }
}
