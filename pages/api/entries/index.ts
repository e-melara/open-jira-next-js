import type { NextApiResponse, NextApiRequest } from 'next';

import { Entry, IEntry } from '../../../models';
import { connect, disconnect } from '../../../database';

type Data =
  | {
      message: String;
    }
  | IEntry[]
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);

    case 'POST':
      return postEntries(req, res);
    default:
      res.status(200).json({
        message: 'Example',
      });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await connect();
  const entries = await Entry.find().sort({
    createdAt: 'ascending',
  });
  await disconnect();
  return res.status(200).json(entries);
};

async function postEntries(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { description } = req.body;

  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });

  try {
    await connect();
    await newEntry.save();
    await disconnect();
    return res.status(201).json(newEntry);

  } catch (error) {
    res.status(500).json({
      message: "Algo salio mal!!"
    })
  }
}
