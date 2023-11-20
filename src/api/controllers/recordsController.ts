import { Request, Response } from "express";
import { Record } from "../models/RecordModel";

// Using an array to simulate a database for records
let records: Record[] = [];

// Utility function to generate a new ID for a record
const getNewId = (): number => {
  return records.length > 0 ? Math.max(...records.map((r) => r.id)) + 1 : 1;
};

// Retrieve a single record by its ID
export const getRecordById = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const record = records.find((record) => record.id === id);

  if (!record) {
    res.status(404).send("Record not found");
  } else {
    res.json(record);
  }
};

// Retrieve all records
export const getAllRecords = (req: Request, res: Response) => {
  res.json(records);
};

// Create and add a new record
export const createRecord = (req: Request, res: Response) => {
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const newRecord: Record = {
    id: getNewId(),
    ...req.body,
    createdDate: formattedDate,
    updatedDate: formattedDate,
  };
  records.push(newRecord);
  res.status(201).json(newRecord);
};

// Update an existing record
export const updateRecord = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  let recordIndex = records.findIndex((record) => record.id === id);

  if (recordIndex === -1) {
    res.status(404).send("Record not found");
  } else {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    records[recordIndex] = {
      ...records[recordIndex],
      ...req.body,
      id: id,
      updatedDate: formattedDate,
    };
    res.json(records[recordIndex]);
  }
};

// Delete a record by ID
export const deleteRecord = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  let recordIndex = records.findIndex((record) => record.id === id);

  if (recordIndex === -1) {
    res.status(404).send("Record not found");
  } else {
    records.splice(recordIndex, 1);
    res.status(204).send();
  }
};

// Helper function to format date to YYYY-MM-DD
const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};
