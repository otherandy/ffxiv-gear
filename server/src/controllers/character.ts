import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

const getCharacters = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const characters = await prisma.character.findMany();
    res.status(200).json(characters);
  } catch (err) {
    next(err);
  }
};

const getCharacter = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const character = await prisma.character.findUnique({
      where: { id: id },
    });
    res.status(200).json(character);
  } catch (err) {
    next(err);
  }
};

const createCharacter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const character = await prisma.character.create({
      data: req.body,
    });
    res.status(201).json(character);
  } catch (err) {
    next(err);
  }
};

const updateCharacter = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  delete req.body.id;
  try {
    const character = await prisma.character.update({
      where: { id: id },
      data: req.body,
    });
    res.status(200).json(character);
  } catch (err) {
    next(err);
  }
};

const deleteCharacter = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const character = await prisma.character.delete({
      where: { id: id },
    });
    res.status(200).json(character);
  } catch (err) {
    next(err);
  }
};

export {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
