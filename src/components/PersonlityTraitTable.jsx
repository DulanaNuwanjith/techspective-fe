import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ButtonGroup,
  Stack,
  Flex,
  Text,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { HiSortDescending } from 'react-icons/hi';

const personalityTraits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];

const getSelectedPersonalityTraitAttribute = (trait) => {
  const map = {
    openness: "pOPN",
    conscientiousness: "pCON",
    extraversion: "pEXT",
    agreeableness: "pAGR",
    neuroticism: "pNEU",
  };
  return map[trait];
};

const getFormattedScore = (score) => score.toFixed(2).toString();

export default function PersonalityTraitTable({ candidates, buttonSize, isStackedButtons }) {
  const [selectedTrait, setSelectedTrait] = useState('openness');

  return (
    <Box>
      <Box mb={6}>
        <Flex gap={2}>
          <HiSortDescending />
          <Text fontSize={{ base: 'md', md: 'lg' }}>Sort by Personality Trait</Text>
        </Flex>
        {isStackedButtons ? (
          <Stack mt={2}>
            {personalityTraits.map((trait) => (
              <Button
                key={trait}
                size={buttonSize}
                isActive={selectedTrait === trait}
                onClick={() => setSelectedTrait(trait)}
                textTransform="capitalize"
                width="full"
              >
                {trait}
              </Button>
            ))}
          </Stack>
        ) : (
          <ButtonGroup mt={2} isAttached size={buttonSize}>
            {personalityTraits.map((trait) => (
              <Button
                key={trait}
                isActive={selectedTrait === trait}
                onClick={() => setSelectedTrait(trait)}
                textTransform="capitalize"
              >
                {trait}
              </Button>
            ))}
          </ButtonGroup>
        )}
      </Box>

      <Table variant="simple" border="1px" borderColor="gray.200">
        <Thead bg="gray.50">
          <Tr>
            <Th>Name</Th>
            {personalityTraits.map((trait) => (
              <Th key={trait} color={selectedTrait === trait ? 'blue.600' : 'gray.800'} textTransform="capitalize">
                {trait}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {[...candidates]
            .sort((a, b) =>
              b.ppmScore[getSelectedPersonalityTraitAttribute(selectedTrait)] -
              a.ppmScore[getSelectedPersonalityTraitAttribute(selectedTrait)]
            )
            .map((candidate) => (
              <LinkBox as={Tr} key={candidate._id} _hover={{ bg: 'gray.100' }} cursor="pointer">
                <Td fontWeight="medium">
                  <LinkOverlay as={RouterLink} to={`/candidates/${candidate._id}`} state={{ candidate }}>
                    {candidate.firstName} {candidate.lastName}
                  </LinkOverlay>
                </Td>
                {personalityTraits.map((trait) => (
                  <Td key={trait}>
                    {getFormattedScore(candidate.ppmScore[getSelectedPersonalityTraitAttribute(trait)])}
                  </Td>
                ))}
              </LinkBox>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
}
