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

  const etro = await axios.get(`${process.env.ETRO_URL}/gearsets/${gearset}`);
  const data = etro.data;

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

  const equipmentUrl = `${process.env.ETRO_URL}/equipment/`;
  const leftSide = [head, body, hands, legs, feet];
  const rightSide = [ears, neck, wrists, fingerL, fingerR];
  const requests = leftSide
    .concat(rightSide)
    .map((id) => axios.get(equipmentUrl + id));

  axios
    .all(requests)
    .then(
      axios.spread((...res) => {
        if (!res[0].data.name.includes(raid)) {
          update.hat = "Don't need";
        }
        if (res[0].data.name.includes('Augmented')) {
          update.armorUpgrade = 'Need';
        }

        if (!res[1].data.name.includes(raid)) {
          update.chest = "Don't need";
        }
        if (res[1].data.name.includes('Augmented')) {
          update.armorUpgrade = 'Need';
        }

        if (!res[2].data.name.includes(raid)) {
          update.gloves = "Don't need";
        }
        if (res[2].data.name.includes('Augmented')) {
          update.armorUpgrade = 'Need';
        }

        if (!res[3].data.name.includes(raid)) {
          update.legs = "Don't need";
        }
        if (res[3].data.name.includes('Augmented')) {
          update.armorUpgrade = 'Need';
        }

        if (!res[4].data.name.includes(raid)) {
          update.boots = "Don't need";
        }
        if (res[4].data.name.includes('Augmented')) {
          update.armorUpgrade = 'Need';
        }

        if (!res[5].data.name.includes(raid)) {
          update.earrings = "Don't need";
        }
        if (res[5].data.name.includes('Augmented')) {
          update.accessoryUpgrade = 'Need';
        }

        if (!res[6].data.name.includes(raid)) {
          update.necklace = "Don't need";
        }
        if (res[6].data.name.includes('Augmented')) {
          update.accessoryUpgrade = 'Need';
        }

        if (!res[7].data.name.includes(raid)) {
          update.bracelet = "Don't need";
        }
        if (res[7].data.name.includes('Augmented')) {
          update.accessoryUpgrade = 'Need';
        }

        if (res[8].data.name.includes(raid)) {
          update.rings = 'Need';
        }
        if (res[8].data.name.includes('Augmented')) {
          update.accessoryUpgrade = 'Need';
        }

        if (res[9].data.name.includes(raid)) {
          update.rings = 'Need';
        }
        if (res[9].data.name.includes('Augmented')) {
          update.accessoryUpgrade = 'Need';
        }
      })
    )
    .catch((err) => {
      console.log(err);
    });

  prisma.character
    .update({
      where: { id },
      data: update,
    })
    .then(() => {
      res.status(200).json({ name, jobAbbrev, patch });
    })
    .catch((err) => {
      next(err);
    });
};

export { updateGear };
