import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const getCharacters = async (req: Request, res: Response) => {
  const characters = await prisma.character.findMany();
  res.json(characters);
};

const getCharacter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const character = await prisma.character.findUnique({
    where: { id: id },
  });
  res.json(character);
};

const createCharacter = async (req: Request, res: Response) => {
  const character = await prisma.character.create({
    data: req.body,
  });
  res.json(character);
};

const updateCharacter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const character = await prisma.character.update({
    where: { id: id },
    data: req.body,
  });
  res.json(character);
};

const updateCharacters = async (req: Request, res: Response) => {
  const characters = await prisma.character.updateMany({
    data: req.body,
  });
  res.json(characters);
};

const deleteCharacter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const character = await prisma.character.delete({
    where: { id: id },
  });
  res.json(character);
};

export {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  updateCharacters,
  deleteCharacter,
};
