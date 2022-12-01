import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

const prisma = new PrismaClient();

const updateGear = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { url } = req.body;
  const gearset = url.split('/').pop();
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const isUUID = regexExp.test(gearset);

  if (!isUUID) {
    return res.status(400).json({ message: 'Invalid link.' });
  }

  let etro = await axios.get(`${process.env.ETRO_URL}/gearsets/${gearset}`);
  let data = etro.data;

  const { name, jobAbbrev, patch } = data;
  const {
    weapon,
    head,
    body,
    hands,
    legs,
    feet,
    ears,
    neck,
    wrists,
    fingerL,
    fingerR,
  } = data;

  let update = {
    gearset: url,
    weapon: 'Need',
    hat: 'Need',
    chest: 'Need',
    gloves: 'Need',
    legs: 'Need',
    boots: 'Need',
    earrings: 'Need',
    necklace: 'Need',
    bracelet: 'Need',
    rings: "Don't need",
    tomeWeapon: 'Need',
    accessoryUpgrade: "Don't need",
    armorUpgrade: "Don't need",
    weaponUpgrade: "Don't need",
  };

  const w = await axios.get(`${process.env.ETRO_URL}/equipment/${weapon}`);
  const raid = (w.data.name as string).split(' ').shift();

  etro = await axios.get(`${process.env.ETRO_URL}/equipment/${head}`);
  data = etro.data;

  if (!data.name.includes(raid)) {
    update.hat = "Don't need";
  }
  if (data.name.includes('Augmented')) {
    update.armorUpgrade = 'Need';
  }

  etro = await axios.get(`${process.env.ETRO_URL}/equipment/${body}`);
  data = etro.data;

  if (!data.name.includes(raid)) {
    update.chest = "Don't need";
  }
  if (data.name.includes('Augmented')) {
    update.armorUpgrade = 'Need';
  }

  etro = await axios.get(`${process.env.ETRO_URL}/equipment/${hands}`);
  data = etro.data;

  if (!data.name.includes(raid)) {
    update.gloves = "Don't need";
  }
  if (data.name.includes('Augmented')) {
    update.armorUpgrade = 'Need';
  }

  etro = await axios.get(`${process.env.ETRO_URL}/equipment/${legs}`);
  data = etro.data;

  if (!data.name.includes(raid)) {
    update.legs = "Don't need";
  }
  if (data.name.includes('Augmented')) {
    update.armorUpgrade = 'Need';
  }

  etro = await axios.get(`${process.env.ETRO_URL}/equipment/${feet}`);
  data = etro.data;

  if (!data.name.includes(raid)) {
    update.boots = "Don't need";
  }
  if (data.name.includes('Augmented')) {
    update.armorUpgrade = 'Need';
  }

  etro = await axios.get(`${process.env.ETRO_URL}/equipment/${ears}`);
  data = etro.data;

  if (!data.name.includes(raid)) {
    update.earrings = "Don't need";
  }
  if (data.name.includes('Augmented')) {
    update.accessoryUpgrade = 'Need';
  }

  etro = await axios.get(`${process.env.ETRO_URL}/equipment/${neck}`);
  data = etro.data;

  if (!data.name.includes(raid)) {
    update.necklace = "Don't need";
  }
  if (data.name.includes('Augmented')) {
    update.accessoryUpgrade = 'Need';
  }

  etro = await axios.get(`${process.env.ETRO_URL}/equipment/${wrists}`);
  data = etro.data;

  if (!data.name.includes(raid)) {
    update.bracelet = "Don't need";
  }
  if (data.name.includes('Augmented')) {
    update.accessoryUpgrade = 'Need';
  }

  etro = await axios.get(`${process.env.ETRO_URL}/equipment/${fingerL}`);
  data = etro.data;

  if (data.name.includes(raid)) {
    update.rings = 'Need';
  }
  if (data.name.includes('Augmented')) {
    update.accessoryUpgrade = 'Need';
  }

  etro = await axios.get(`${process.env.ETRO_URL}/equipment/${fingerR}`);
  data = etro.data;

  if (data.name.includes(raid)) {
    update.rings = 'Need';
  }
  if (data.name.includes('Augmented')) {
    update.accessoryUpgrade = 'Need';
  }

  prisma.character
    .update({
      where: { id: id },
      data: update as any,
    })
    .then(() => {
      res.status(200).json({ name, jobAbbrev, patch });
    })
    .catch((err) => {
      next(err);
    });
};

export { updateGear };
