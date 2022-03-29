import {
  connectDatabase,
  deleteDocument,
  getDocument,
  updateDocument,
} from "../../../utils/db";

export default async function handler(req, res) {
  const { id } = req.query;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  switch (req.method) {
    case "GET":
      let currentEmployee;

      try {
        currentEmployee = await getDocument(client, "employees", id);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch" });
        return;
      }
      res.status(200).json({ currentEmployee });
      break;
    case "PATCH":
      const {
        firstName,
        lastName,
        department,
        position,
        address,
        sex,
        contact_number,
      } = req.body;
      let result;

      const updateEmployee = {
        firstName: firstName,
        lastName: lastName,
        department: department,
        position: position,
        address: address,
        sex: sex,
        contact_number: contact_number,
      };

      try {
        result = await updateDocument(client, "employees", id, updateEmployee);
      } catch (error) {
        res.status(500).json({ message: "Update failed" });
        return;
      }

      res.status(200).json({
        message: `Updated successfully`,
        data: updateEmployee,
      });
      break;

    case "DELETE":
      let document;

      try {
        document = await deleteDocument(client, "employees", id);
      } catch (error) {
        res.status(500).json({ message: "Delete failed" });
        return;
      }
      res.status(200).json({ message: "Sucessfully deleted" });
      break;

    default:
      res.status(500).end("Method is not allowed");
      break;
  }
}
