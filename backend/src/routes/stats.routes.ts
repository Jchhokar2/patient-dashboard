import { Router, Request, Response } from 'express';
import { Patient } from '../models/patient.model';

const router = Router();

// Here I'm just counting patients by status to show on the dashboard
router.get('/', async (req: Request, res: Response) => {
  try {
    const total = await Patient.countDocuments();
    const active = await Patient.countDocuments({ status: 'active' });
    const pending = await Patient.countDocuments({ status: 'pending' });
    const inactive = await Patient.countDocuments({ status: 'inactive' });

    res.json({ total, active, pending, inactive });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch stats' });
  }
});

export default router;