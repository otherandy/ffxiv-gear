import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const getCharacters = async (req: Request, res: Response) => {
  try {
    const characters = await prisma.character.findMany();
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCharacter = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const character = await prisma.character.findUnique({
      where: { id: id },
    });
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createCharacter = async (req: Request, res: Response) => {
  try {
    const character = await prisma.character.create({
      data: req.body,
    });
    res.status(201).json(character);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCharacter = async (req: Request, res: Response) => {
  const { id } = req.params;
  delete req.body.id;
  try {
    const character = await prisma.character.update({
      where: { id: id },
      data: req.body,
    });
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCharacter = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const character = await prisma.character.delete({
      where: { id: id },
    });
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
