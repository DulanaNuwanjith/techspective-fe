import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Heading,
  Container,
  Flex,
  useBreakpointValue,
  Spinner,
} from '@chakra-ui/react';
import { HiUserAdd } from 'react-icons/hi';
import { useQuery } from '@tanstack/react-query';
import { fetchAllCandidates } from '../api/candidateService';
import PersonalityTraitTable from '../components/PersonlityTraitTable';
import ProgrammingLanguageUsageTable from '../components/ProgrammingUsageTable';
import { useNavigate } from 'react-router';
import useTitle from "../hooks/useTitle";

export default function CandidatesList() {
  useTitle("TechSpective | Candidates");

  const { data: candidates, isLoading, isError } = useQuery({ queryKey: ['candidates'], queryFn: fetchAllCandidates });
  const navigate = useNavigate();

  const headingSize = useBreakpointValue({ base: 'xl', md: '2xl' });
  const isStackedButtons = useBreakpointValue({ base: true, md: false });
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' }) || 'sm';

  if (isError) {
    return (
      <Container maxW="container.xl" py={4} px={{ base: 2, md: 4 }}>
        <p className='font-semibold text-red-700'>
          Failed to retrieve candidates. Please try again later.
        </p>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={4} px={{ base: 2, md: 4 }}>
      <Flex
        justify="space-between"
        align="center"
        mb={16}
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 4, sm: 0 }}
      >
        <Heading size={headingSize}>Candidates</Heading>

        <Button
          leftIcon={<HiUserAdd size={16} />}
          colorScheme="blue"
          onClick={() => navigate("/candidates/add")}
          size={{ base: 'md', md: 'lg' }}
          width={{ base: 'full', sm: 'auto' }}
        >
          Add Candidate
        </Button>
      </Flex>

      <Tabs variant="enclosed" colorScheme="blue" isFitted>
        <TabList mb={4}>
          <Tab fontWeight="semibold" fontSize={{ base: 'sm', md: 'md' }}>Personality Prediction</Tab>
          <Tab fontWeight="semibold" fontSize={{ base: 'sm', md: 'md' }}>Programming Language Usage</Tab>
        </TabList>

        <TabPanels>
          {/* Personality Prediction Tab */}
          <TabPanel p={{ base: 2, md: 4 }}>
            {isLoading ? (
              <Flex height="50vh" justify="center" align="center">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <PersonalityTraitTable candidates={candidates} buttonSize={buttonSize} isStackedButtons={isStackedButtons} />
            )}
          </TabPanel>

          {/* Language Usage Tab */}
          <TabPanel p={{ base: 2, md: 4 }}>
            {isLoading ? (
              <Flex height="50vh" justify="center" align="center">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <ProgrammingLanguageUsageTable candidates={candidates} buttonSize={buttonSize} isStackedButtons={isStackedButtons} />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}