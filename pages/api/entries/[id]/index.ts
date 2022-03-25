import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

import { connect, disconnect } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'El id no es valido ' + id });
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res);
    case 'GET':
      return getEntries(req, res);
    default:
      return res.status(404).json({ message: 'Metodo no existe ' });
  }
}

async function updateEntry(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;
  try {
    await connect();
    const entryToUpdate = await Entry.findById(id);
    if (!entryToUpdate) {
      throw new Error(`No hay entrada con ese ID: ${id}`);
    }

    const {
      description = entryToUpdate.description,
      status = entryToUpdate.status,
    } = req.body;

    const updateEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );

    disconnect();

    return res.status(200).json(updateEntry!);
  } catch (err: unknown) {
    disconnect();
    if (err instanceof Error) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(404).json({ message: 'Hay un problema con el servidor' });
  }
}

async function getEntries(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;
  await connect();

  const entry = await Entry.findById(id);
  if (!entry) {
    throw new Error(`No hay entrada con ese ID: ${id}`);
  }
  disconnect();
  return res.status(200).json(entry!);
}
