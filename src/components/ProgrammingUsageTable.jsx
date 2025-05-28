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

const programmingLanguages = ['javascript', 'java', 'python'];

export default function ProgrammingLanguageUsageTable({ candidates, buttonSize, isStackedButtons }) {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  return (
    <Box>
      <Box mb={6}>
        <Flex gap={2}>
          <HiSortDescending />
          <Text fontSize={{ base: 'md', md: 'lg' }}>
            Sort based on Programming Language Usage by GitHub Analysis
          </Text>
        </Flex>

        {isStackedButtons ? (
          <Stack mt={2}>
            {programmingLanguages.map((lang) => (
              <Button
                key={lang}
                size={buttonSize}
                isActive={selectedLanguage === lang}
                onClick={() => setSelectedLanguage(lang)}
                textTransform="uppercase"
                width="full"
              >
                {lang}
              </Button>
            ))}
          </Stack>
        ) : (
          <ButtonGroup mt={2} isAttached size={buttonSize}>
            {programmingLanguages.map((lang) => (
              <Button
                key={lang}
                isActive={selectedLanguage === lang}
                onClick={() => setSelectedLanguage(lang)}
                textTransform="uppercase"
              >
                {lang}
              </Button>
            ))}
          </ButtonGroup>
        )}
      </Box>

      <Table variant="simple" border="1px" borderColor="gray.200">
        <Thead bg="gray.50">
          <Tr>
            <Th>Name</Th>
            {programmingLanguages.map((lang) => (
              <Th
                key={lang}
                textTransform="capitalize"
                color={selectedLanguage === lang ? 'blue.600' : 'gray.800'}
              >
                {lang}
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {[...candidates]
            .sort((a, b) => {
              const aScore = a?.tsuamScore?.[selectedLanguage];
              const bScore = b?.tsuamScore?.[selectedLanguage];

              const aValid = typeof aScore === 'number' && !isNaN(aScore);
              const bValid = typeof bScore === 'number' && !isNaN(bScore);

              if (aValid && bValid) return bScore - aScore;
              if (aValid) return -1;
              if (bValid) return 1;
              return 0;
            })
            .map((candidate) => (
              <LinkBox
                as={Tr}
                key={candidate._id}
                _hover={{ bg: 'gray.100' }}
                cursor="pointer"
              >
                <Td fontWeight="medium">
                  <LinkOverlay as={RouterLink} to={`/candidates/${candidate._id}`} state={{ candidate }}>
                    {candidate.firstName} {candidate.lastName}
                  </LinkOverlay>
                </Td>

                {programmingLanguages.map((lang) => (
                  <Td key={lang}>
                    {typeof candidate?.tsuamScore?.[lang] === "number" &&
                      !isNaN(candidate.tsuamScore[lang])
                      ? candidate.tsuamScore[lang]
                      : "N/A"}
                  </Td>
                ))}
              </LinkBox>
            ))}
        </Tbody>
      </Table>

    </Box>
  );
}
