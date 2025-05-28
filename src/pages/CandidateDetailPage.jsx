import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Flex,
  Stack,
  Link,
  Icon,
  Badge,
} from '@chakra-ui/react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaEye,
} from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const CandidateDetailPage = () => {
  const { state } = useLocation();
  const candidate = state?.candidate;

  if (!candidate) return <p>No candidate data found.</p>;

  const ppmChartData = {
    labels: [
      'Agreeableness',
      'Conscientiousness',
      'Extraversion',
      'Neuroticism',
      'Openness'
    ],
    datasets: [
      {
        label: 'Personality Score',
        data: candidate ? [
          candidate.ppmScore.pAGR,
          candidate.ppmScore.pCON,
          candidate.ppmScore.pEXT,
          candidate.ppmScore.pNEU,
          candidate.ppmScore.pOPN
        ] : [],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const ppmChartOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score (0-100)'
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Personality Assessment Scores',
        font: {
          size: 16
        }
      },
    },
  };

  const tsuamChartData = {
    labels: candidate ? Object.keys(candidate.tsuamScore).map(lang =>
      lang.charAt(0).toUpperCase() + lang.slice(1)
    ) : [],
    datasets: [
      {
        data: candidate ? Object.values(candidate.tsuamScore) : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const tsuamChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Programming Language Proficiency',
        font: {
          size: 16
        }
      },
    },
  };

  const openCVInNewTab = () => {
    if (!candidate?.cv || typeof candidate.cv !== "string") {
      alert("Failed to retrieve cv data. Please try again");
    }

    const byteCharacters = atob(candidate.cv);
    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);

    const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });

    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, '_blank');
  };

  // if (loading) {
  //   return (
  //     <Container maxW="container.lg" py={8}>
  //       <Stack spacing={6}>
  //         <Skeleton height="60px" />
  //         <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
  //           <Stack spacing={4}>
  //             <Skeleton height="20px" />
  //             <Skeleton height="20px" />
  //             <Skeleton height="20px" />
  //           </Stack>
  //           <Stack spacing={4}>
  //             <Skeleton height="20px" />
  //             <Skeleton height="20px" />
  //             <Skeleton height="20px" />
  //           </Stack>
  //         </SimpleGrid>
  //         <Divider />
  //         <Skeleton height="300px" />
  //         <Skeleton height="300px" />
  //       </Stack>
  //     </Container>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Container maxW="container.lg" py={8}>
  //       <Flex direction="column" align="center" justify="center" minH="60vh">
  //         <Heading color="red.500">Error</Heading>
  //         <Text mt={4}>{error}</Text>
  //         <Button mt={6} colorScheme="blue" onClick={() => window.location.reload()}>
  //           Try Again
  //         </Button>
  //       </Flex>
  //     </Container>
  //   );
  // }

  return (
    <Container maxW="container.lg" py={8}>
      {candidate && (
        <Stack spacing={8}>
          {/* Header/Profile section */}
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "start", md: "center" }}
            pb={4}
          >
            <Box>
              <Heading size="xl" mb={2}>
                {candidate.firstName} {candidate.lastName}
              </Heading>
              <Flex wrap="wrap" gap={3}>
                <Button
                  leftIcon={<FaEye />}
                  colorScheme="blue"
                  onClick={openCVInNewTab}
                  size={{ base: "sm", md: "md" }}
                >
                  View CV
                </Button>
              </Flex>
            </Box>
          </Flex>

          {/* Contact Information */}
          <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
          >
            <Heading size="md" mb={4}>Contact Information</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
              <Flex align="center">
                <Icon as={FaEnvelope} boxSize={5} color="blue.500" mr={2} />
                <Link href={`mailto:${candidate.email}`} color="blue.600">
                  {candidate.email}
                </Link>
              </Flex>
              {candidate?.githubId && (
                <Flex align="center">
                  <Icon as={FaGithub} boxSize={5} color="blue.500" mr={2} />
                  <Link href={`https://github.com/${candidate.githubId}`} isExternal color="blue.600">
                    {candidate.githubId}
                  </Link>
                </Flex>
              )}
              {candidate?.linkedinId && (
                <Flex align="center">
                  <Icon as={FaLinkedin} boxSize={5} color="blue.500" mr={2} />
                  <Link href={`https://linkedin.com/in/${candidate.linkedinId}`} isExternal color="blue.600">
                    {candidate.linkedinId}
                  </Link>
                </Flex>
              )}
            </SimpleGrid>
          </Box>

          {/* Charts */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            {/* PPM Score Chart */}
            <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              h={{ base: "400px", md: "450px" }}
            >
              <Bar
                data={ppmChartData}
                options={ppmChartOptions}
                height={380}
              />
            </Box>

            {/* TSUAM Score Chart */}
            <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              h={{ base: "400px", md: "450px" }}
            >
              <Box h="90%">
                <Pie
                  data={tsuamChartData}
                  options={tsuamChartOptions}
                />
              </Box>
            </Box>
          </SimpleGrid>

          {/* Detailed Scores */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            {/* PPM Detailed Scores */}
            <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
            >
              <Heading size="md" mb={4}>Personality Assessment Scores</Heading>
              <Stack spacing={3}>
                {Object.entries(candidate.ppmScore).filter(([key]) => key !== "pCOMPOUND").map(([key, value]) => {
                  const label = key === 'pAGR' ? 'Agreeableness' :
                    key === 'pCON' ? 'Conscientiousness' :
                      key === 'pEXT' ? 'Extraversion' :
                        key === 'pNEU' ? 'Neuroticism' :
                          key === 'pOPN' ? 'Openness' : key;

                  const colorScheme = value >= 80 ? 'green' :
                    value >= 60 ? 'blue' :
                      value >= 40 ? 'yellow' : 'red';

                  return (
                    <>
                    <Flex key={key} justify="space-between" align="center">
                      <Text fontWeight="medium">{label}</Text>
                      <Badge colorScheme={colorScheme} fontSize="0.9em" py={1} px={2} borderRadius="md">
                        {value}/100
                      </Badge>
                    </Flex>
                    </>
                  );
                })}
                  <Flex justifyContent={"center"} mt={2}>
                    <Box bgColor={"green.400"} p={3} rounded={"lg"}>
                      <Text color={"white"} fontWeight={"bold"}>
                        Compound: {candidate.ppmScore.pCOMPOUND}
                      </Text>
                    </Box>
                  </Flex>
              </Stack>
            </Box>

            {/* TSUAM Detailed Scores */}
            <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
            >
              <Heading size="md" mb={4}>Programming Language Proficiency</Heading>
              <Stack spacing={3}>
                {Object.entries(candidate.tsuamScore).filter(([_, value]) => typeof value === 'number').map(([key, value]) => {
                  const label = key.charAt(0).toUpperCase() + key.slice(1);

                  const colorScheme = value >= 80 ? 'green' :
                    value >= 60 ? 'blue' :
                      value >= 40 ? 'yellow' : 'red';

                  const level = value >= 80 ? 'Expert' :
                    value >= 60 ? 'Advanced' :
                      value >= 40 ? 'Intermediate' : 'Beginner';

                  return (
                    <>
                      <Flex key={key} justify="space-between" align="center">
                        <Text fontWeight="medium">{label}</Text>
                        <Flex align="center" gap={2}>
                          <Badge colorScheme={colorScheme} fontSize="0.9em" py={1} px={2} borderRadius="md">
                            {value}/100
                          </Badge>
                          <Badge variant="outline" colorScheme={colorScheme}>
                            {level}
                          </Badge>
                        </Flex>
                      </Flex>
                    </>
                  );
                })}
              </Stack>
            </Box>
          </SimpleGrid>
        </Stack>
      )}
    </Container>
  );
};

export default CandidateDetailPage;