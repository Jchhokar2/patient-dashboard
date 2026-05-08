import { Router, Request, Response } from 'express';
import { Patient } from '../models/patient.model';

const router = Router();

// Get all patients with optional search, status filter, and pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const { search, status, page = '1', pageSize = '10' } = req.query;

    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) {
      query.status = status;
    }

    const pageNum = parseInt(page as string);
    const size = parseInt(pageSize as string);
    const skip = (pageNum - 1) * size;

    const total = await Patient.countDocuments(query);
    const patients = await Patient.find(query).skip(skip).limit(size);

    res.json({ data: patients, total, page: pageNum, pageSize: size });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// To get a single patient by ID:
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Here I created a new patient
router.post('/', async (req: Request, res: Response) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Invalid data' });
    }
  }
});

// Update the patient status!!
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;