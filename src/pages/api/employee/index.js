import moment from "moment";
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../utils/db";

async function handler(req, res) {
  const {
    firstName,
    lastName,
    department,
    position,
    address,
    sex,
    contact_number,
  } = req.body;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  switch (req.method) {
    case "GET":
      let employees;

      try {
        employees = await getAllDocuments(client, "employees");
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch" });
      }
      res.status(200).json({ employees });
      break;

    case "POST":
      const newEmployee = {
        firstName,
        lastName,
        department,
        position,
        address,
        sex,
        contact_number,
        date_created: moment().format(),
      };

      let result;

      try {
        result = await insertDocument(client, "employees", newEmployee);
      } catch (error) {
        res.status(500).json({ message: "Adding employee failed" });
        return;
      }

      res.status(201).json({ message: "Employee added.", data: newEmployee });
      break;

    default:
      break;
  }
}

export default handler;
