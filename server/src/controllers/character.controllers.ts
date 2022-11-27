import { Request, Response } from 'express';
import Character from '../models/character';

function getCharacters(req: Request, res: Response) {
  Character.find()
    .then((characters) => {
      res.json(characters);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

function getCharacter(req: Request, res: Response) {
  const { id } = req.params;
  Character.findById(id)
    .then((character) => {
      res.json(character);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

function createCharacter(req: Request, res: Response) {
  new Character(req.body || {})
    .save()
    .then((character) => {
      res.json(character);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

function updateCharacter(req: Request, res: Response) {
  const { id } = req.params;
  Character.findByIdAndUpdate(id, req.body)
    .then((character) => {
      res.json(character);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

function updateCharacters(req: Request, res: Response) {
  Character.updateMany(req.body)
    .then((characters) => {
      res.json(characters);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

function deleteCharacter(req: Request, res: Response) {
  const { id } = req.params;
  Character.findByIdAndDelete(id)
    .then((character) => {
      res.json(character);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  updateCharacters,
  deleteCharacter,
};
