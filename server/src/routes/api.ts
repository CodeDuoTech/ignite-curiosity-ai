import express, { Request, Response } from 'express';
import { Document, Schema } from 'mongoose'; // Import Document and Schema for model interfaces

const router = express.Router();

// Define interfaces for your Mongoose models (already done in previous step for context)
// IMPORTANT: These interfaces should ideally be imported from their respective model files
// e.g., import { IChild } from '../../models/Child';
interface IChild extends Document { /* ... */ }
interface ILesson extends Document { /* ... */ }
interface IMessage extends Document { /* ... */ }
interface IAIText extends Document { /* ... */ }


// Import your Mongoose models using ES Modules syntax
// The path '../models' is now correct because models is inside src/
import Child from '../models/Child'; // Corrected path
import Lesson from '../models/Lesson'; // Corrected path
import Message from '../models/Message'; // Corrected path
import AIText from '../models/AIText'; // Corrected path


// --- Child Routes ---
router.get('/children', async (req: Request, res: Response) => {
  try {
    const children = await Child.find() as IChild[];
    res.json(children);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Lesson Routes ---
router.get('/lessons', async (req: Request, res: Response) => {
  try {
    const lessons = await Lesson.find().populate('participants') as ILesson[];
    res.json(lessons);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/lessons/:id', async (req: Request, res: Response) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('participants') as ILesson;
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Message Routes ---
router.get('/messages/:lessonId', async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({ lessonId: req.params.lessonId }) as IMessage[];
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/messages', async (req: Request, res: Response) => {
  try {
    const msg = new Message(req.body);
    await msg.save();
    res.json(msg);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- AI Text Routes ---
router.get('/ai-texts', async (req: Request, res: Response) => {
  try {
    const { type, context } = req.query;
    let query: any = { isActive: true };

    if (type) query.type = type;
    if (context) query.context = context;

    const texts = await AIText.find(query).sort('order') as IAIText[];
    res.json(texts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/ai-texts/random/:type', async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const texts = await AIText.find({ type, isActive: true }) as IAIText[];

    if (texts.length === 0) {
      return res.status(404).json({ error: 'No texts found for this type' });
    }

    const randomText = texts[Math.floor(Math.random() * texts.length)];
    res.json(randomText);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/ai-texts', async (req: Request, res: Response) => {
  try {
    const aiText = new AIText(req.body);
    await aiText.save();
    res.json(aiText);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/ai-texts/:id', async (req: Request, res: Response) => {
  try {
    const aiText = await AIText.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ) as IAIText;
    if (!aiText) {
      return res.status(404).json({ error: 'AI Text not found' });
    }
    res.json(aiText);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/ai-texts/:id', async (req: Request, res: Response) => {
  try {
    const aiText = await AIText.findByIdAndDelete(req.params.id) as IAIText;
    if (!aiText) {
      return res.status(404).json({ error: 'AI Text not found' });
    }
    res.json({ message: 'AI Text deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
