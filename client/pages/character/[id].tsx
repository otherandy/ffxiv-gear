import { useRouter } from 'next/router';
import { FC } from 'react';
import { Character } from '../../interfaces';

import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  Link,
  Tag,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

type Props = {
  characters: Character[];
};

const Character: FC<Props> = ({ characters }) => {
  const router = useRouter();
  const { id } = router.query;
  const index = characters.findIndex((c) => c.id === id);

  return (
    <Container>
      <Card align="center">
        <CardHeader>
          <Heading as="h1" size="4xl">
            {characters[index].name}
            <Tag>{characters[index].job}</Tag>
          </Heading>
        </CardHeader>
        <CardBody>
          <Link href={characters[index].gearset} isExternal>
            Gearset <ExternalLinkIcon mx="2px" />
          </Link>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Character;
